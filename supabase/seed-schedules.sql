-- ============================================================================
-- HempDent schedules seed — working_hours para a Agenda + site público /agendar
-- (tenant HempDent 11111111-1111-4111-8111-000000000001, pool cluster-dentist-br-01)
--
-- Idempotente, seguro para re-rodar. Popula public.schedules kind='working_hours'
-- para o Dr. Hiago (staff 11111111-1111-4111-8111-000000000101), espelhando o
-- workingHours ESTÁTICO do site (src/plugins/website.tsx →
--   workingHours: { daysOfWeek: [1,2,3,4,5,6], start: '13:00', end: '19:00' }
--   // "Dr. Hiago atende segunda a sábado, à tarde.").
--
-- NOTA sobre horários: a tarefa citou "09:00–19:00", porém o site anuncia
-- 13:00–19:00 (turno da tarde). A instrução manda "ajustar ao que o site
-- anuncia", então seedamos 13:00–19:00 — assim o grid do /agendar (que vem da
-- RPC get_available_slots lendo ESTA tabela) coincide com a janela do widget.
-- Se a janela do site mudar, ajuste v_start/v_end aqui para manter a paridade.
--
-- get_available_slots (plugin-agenda, migration 001_public_booking) lê esta
-- tabela filtrando por assignee_id. O site chama a RPC com
-- p_assignee_id = HEMPDENT_STAFF_ID, então o profissional precisa existir em
-- public.people E ter working_hours — senão o /agendar mostra 0 horários.
-- day_of_week segue EXTRACT(dow): 0=domingo … 6=sábado.
-- ============================================================================

DO $$
DECLARE
  v_tenant   uuid := '11111111-1111-4111-8111-000000000001';
  v_staff    uuid := '11111111-1111-4111-8111-000000000101';  -- Dr. Hiago (professional.id do site)
  v_dow      smallint;
  v_start    time := '13:00';
  v_end      time := '19:00';
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.tenants WHERE id = v_tenant) THEN
    RAISE NOTICE 'Tenant HempDent (%) não encontrado — abortando seed de schedules.', v_tenant;
    RETURN;
  END IF;

  -- Profissional público do site (Dr. Hiago). O booking /agendar aponta para
  -- este id fixo; garantimos que exista para satisfazer a FK de
  -- schedules.assignee_id e para a RPC pública retornar horários.
  IF NOT EXISTS (SELECT 1 FROM public.people WHERE id = v_staff) THEN
    INSERT INTO public.people (id, tenant_id, kind, name, is_active)
    VALUES (v_staff, v_tenant, 'staff', 'Dr. Hiago Benevenutti', true);
  END IF;

  -- working_hours (seg–sáb 13:00–19:00). 0=domingo permanece fechado.
  FOR v_dow IN 1..6 LOOP
    INSERT INTO public.schedules
      (tenant_id, kind, assignee_id, location_id, day_of_week, specific_date, starts_at, ends_at, is_active)
    SELECT v_tenant, 'working_hours', v_staff, NULL, v_dow, NULL, v_start, v_end, true
    WHERE NOT EXISTS (
      SELECT 1 FROM public.schedules s
      WHERE s.tenant_id = v_tenant
        AND s.kind = 'working_hours'
        AND s.assignee_id = v_staff
        AND s.day_of_week = v_dow
        AND s.specific_date IS NULL
    );
  END LOOP;
END $$;
