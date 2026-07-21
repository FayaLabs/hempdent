-- ============================================================================
-- HempDent blog seed — converte HEMPDENT_POSTS (src/plugins/seeds.ts) em rows
-- reais de plg_blog_posts para o tenant HempDent.
--
--   tenant HempDent = 11111111-1111-4111-8111-000000000001
--   pool cluster-dentist-br-01 (projectRef mcbfebruhimlbvlvczsn)
--
-- Tabelas / view: @fayz-ai/plugin-blog migration 001_blog.sql
--   • plg_blog_categories  (unique: uq_plg_blog_categories_tenant_slug = tenant_id, slug)
--   • plg_blog_posts       (unique: uq_plg_blog_posts_tenant_slug      = tenant_id, slug)
--   • v_public_blog_posts  (anon: só status='published'; expõe category.name como `tag`)
--
-- Idempotente e seguro para re-rodar:
--   • guardado por slug via ON CONFLICT (tenant_id, slug) DO NOTHING
--   • cada INSERT é gateado por EXISTS(tenants) — se o tenant não existir, o seed
--     não faz nada (em vez de estourar a FK).
--
-- O site público (porta 5307) lê estes posts por v_public_blog_posts filtrando
-- por tenant_id (createSupabaseBlogProvider({ tenantId: HEMPDENT_TENANT_ID })).
-- Autor/bio espelham o defaultAuthor de src/plugins/website.tsx.
-- ============================================================================

-- §1 — categorias (1–2 coerentes; a view expõe category.name como `tag`)
INSERT INTO public.plg_blog_categories (id, tenant_id, name, slug, description)
SELECT
  '11111111-1111-4111-8111-0000000000c1'::uuid,
  '11111111-1111-4111-8111-000000000001'::uuid,
  'Cannabis & Odontologia',
  'cannabis-odontologia',
  'Como os canabinoides atuam em procedimentos e na saúde bucal.'
WHERE EXISTS (SELECT 1 FROM public.tenants WHERE id = '11111111-1111-4111-8111-000000000001')
ON CONFLICT (tenant_id, slug) DO NOTHING;

INSERT INTO public.plg_blog_categories (id, tenant_id, name, slug, description)
SELECT
  '11111111-1111-4111-8111-0000000000c2'::uuid,
  '11111111-1111-4111-8111-000000000001'::uuid,
  'Bem-estar & Saúde Bucal',
  'bem-estar-saude-bucal',
  'Qualidade de vida, sono e cuidados integrativos.'
WHERE EXISTS (SELECT 1 FROM public.tenants WHERE id = '11111111-1111-4111-8111-000000000001')
ON CONFLICT (tenant_id, slug) DO NOTHING;

-- §2 — posts (published). category_id resolvido por sub-select no slug da categoria.
INSERT INTO public.plg_blog_posts (
  tenant_id, category_id, slug, title, excerpt, body, cover_image,
  author_name, author_role, author_avatar_url, author_bio,
  status, read_time, published_at
)
SELECT
  '11111111-1111-4111-8111-000000000001'::uuid,
  (SELECT id FROM public.plg_blog_categories
     WHERE tenant_id = '11111111-1111-4111-8111-000000000001' AND slug = 'cannabis-odontologia'),
  'cbd-pos-operatorio-dor-extracoes',
  'CBD no pós-operatório: como os canabinoides reduzem a dor após extrações',
  'Entenda como o canabidiol age no sistema nervoso para controlar dores e acelerar a recuperação após procedimentos odontológicos.',
  $md$O período pós-operatório é uma das fases mais sensíveis de qualquer procedimento odontológico. A dor, o inchaço e a inflamação são respostas naturais do organismo — mas isso não significa que o paciente precise sofrer com elas.

Os canabinoides, em especial o canabidiol (CBD), atuam no sistema endocanabinoide, um conjunto de receptores presentes no sistema nervoso e no tecido gengival. Ao modular esses receptores, o CBD ajuda a reduzir a percepção da dor e a controlar a resposta inflamatória.

Na prática clínica, protocolos com canabinoides têm mostrado recuperação mais confortável após extrações, especialmente de terceiros molares. É sempre um tratamento individualizado, conduzido por um profissional habilitado.$md$,
  'https://images.unsplash.com/photo-1576671081837-49000212a370?w=800&q=80',
  'Thiago',
  'Cirurgião-Dentista · Odontologia Canábica',
  'https://ksaxihqupvvhdbfqbbwx.supabase.co/storage/v1/object/public/avatars/43ebd04a-a4ff-4738-840d-544ebf4831b6.png?1704878851020',
  'Especialista em odontologia canábica, une formação técnica de excelência com uma abordagem humanizada e integrativa.',
  'published',
  '5 min',
  '2025-01-15 12:00:00-03'::timestamptz
WHERE EXISTS (SELECT 1 FROM public.tenants WHERE id = '11111111-1111-4111-8111-000000000001')
ON CONFLICT (tenant_id, slug) DO NOTHING;

INSERT INTO public.plg_blog_posts (
  tenant_id, category_id, slug, title, excerpt, body, cover_image,
  author_name, author_role, author_avatar_url, author_bio,
  status, read_time, published_at
)
SELECT
  '11111111-1111-4111-8111-000000000001'::uuid,
  (SELECT id FROM public.plg_blog_categories
     WHERE tenant_id = '11111111-1111-4111-8111-000000000001' AND slug = 'cannabis-odontologia'),
  'cannabis-medicinal-doenca-periodontal',
  'Cannabis medicinal no tratamento da doença periodontal: o que a ciência diz',
  'Novos estudos revelam o potencial anti-inflamatório dos canabinoides no controle da periodontite e saúde gengival.',
  $md$A doença periodontal é uma inflamação crônica que afeta os tecidos de suporte dos dentes. Quando não tratada, pode levar à perda dentária e está associada a condições sistêmicas como diabetes e doenças cardiovasculares.

Pesquisas recentes investigam o papel anti-inflamatório dos canabinoides no controle da periodontite. O CBD, por sua ação sobre a resposta imune local, aparece como um coadjuvante promissor ao tratamento periodontal convencional.

Vale reforçar: a cannabis medicinal complementa — não substitui — a higiene bucal adequada e o acompanhamento profissional regular.$md$,
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80',
  'Thiago',
  'Cirurgião-Dentista · Odontologia Canábica',
  'https://ksaxihqupvvhdbfqbbwx.supabase.co/storage/v1/object/public/avatars/43ebd04a-a4ff-4738-840d-544ebf4831b6.png?1704878851020',
  'Especialista em odontologia canábica, une formação técnica de excelência com uma abordagem humanizada e integrativa.',
  'published',
  '7 min',
  '2024-12-10 12:00:00-03'::timestamptz
WHERE EXISTS (SELECT 1 FROM public.tenants WHERE id = '11111111-1111-4111-8111-000000000001')
ON CONFLICT (tenant_id, slug) DO NOTHING;

INSERT INTO public.plg_blog_posts (
  tenant_id, category_id, slug, title, excerpt, body, cover_image,
  author_name, author_role, author_avatar_url, author_bio,
  status, read_time, published_at
)
SELECT
  '11111111-1111-4111-8111-000000000001'::uuid,
  (SELECT id FROM public.plg_blog_categories
     WHERE tenant_id = '11111111-1111-4111-8111-000000000001' AND slug = 'bem-estar-saude-bucal'),
  'bruxismo-e-cannabis-tratamento-canabico',
  'Bruxismo e cannabis: como o tratamento canábico alivia o hábito de ranger os dentes',
  'O bruxismo afeta milhões de brasileiros. Veja como a abordagem canábica pode ser uma alternativa eficaz e humanizada.',
  $md$O bruxismo — o hábito involuntário de ranger ou apertar os dentes — atinge milhões de brasileiros e frequentemente está ligado à ansiedade e ao estresse. Suas consequências vão do desgaste dentário às dores de cabeça e na articulação da mandíbula.

A abordagem canábica atua em duas frentes: o efeito ansiolítico e relaxante muscular dos canabinoides ajuda a reduzir a tensão que dispara o bruxismo, principalmente o noturno.

Combinada a placas de proteção e ao manejo do estresse, a terapia canábica oferece uma alternativa humanizada para quem busca qualidade de sono e de vida.$md$,
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80',
  'Thiago',
  'Cirurgião-Dentista · Odontologia Canábica',
  'https://ksaxihqupvvhdbfqbbwx.supabase.co/storage/v1/object/public/avatars/43ebd04a-a4ff-4738-840d-544ebf4831b6.png?1704878851020',
  'Especialista em odontologia canábica, une formação técnica de excelência com uma abordagem humanizada e integrativa.',
  'published',
  '6 min',
  '2024-11-20 12:00:00-03'::timestamptz
WHERE EXISTS (SELECT 1 FROM public.tenants WHERE id = '11111111-1111-4111-8111-000000000001')
ON CONFLICT (tenant_id, slug) DO NOTHING;
