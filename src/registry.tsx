import type { ComponentType } from 'react'

/**
 * App registry.
 *
 * Register your own components and pages here so the manifest can reference them
 * by id (e.g. "custom:home"). This keeps app.manifest.json plain JSON — no React
 * components or functions embedded in it.
 *
 * You only need this when wiring manifest-driven pages. For a normal app, just
 * write and import your components directly.
 */

export type RegistryComponent = ComponentType<Record<string, unknown>>

export interface AppRegistry {
  blocks: Record<string, unknown>
  components: Record<string, RegistryComponent>
  metrics: Record<string, unknown>
  pages: Record<string, RegistryComponent>
}

export const appRegistry: AppRegistry = {
  blocks: {},
  components: {},
  metrics: {},
  pages: {},
}

export function registerAppRegistry(): void {
  // Register custom:* code here when this app needs custom SDK extensions.
}

registerAppRegistry()
