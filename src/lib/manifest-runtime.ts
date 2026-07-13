/**
 * Manifest runtime — optional.
 *
 * Renders pages declared in app.manifest.json (resolved through src/registry.tsx).
 * Most apps don't need this: write your own pages/components and the app renders
 * them directly. This only takes over a surface when the manifest declares a page
 * to render there (e.g. from an installed module).
 */
import React from 'react'
import { appRegistry } from '../registry'

interface ManifestPage {
  path?: string
  route?: string
  label?: string
  component?: string
}

interface ManifestSurface {
  pages?: ManifestPage[]
}

interface RuntimeManifest {
  name?: string
  surfaces?: Record<string, ManifestSurface>
}

/**
 * True when the manifest declares a page with a renderable component for the
 * given surface. Use this to decide whether to delegate rendering to renderApp.
 */
export function manifestHasRenderablePages(manifest: RuntimeManifest, surface: string): boolean {
  return (manifest.surfaces?.[surface]?.pages ?? []).some((page) => Boolean(page.component))
}

function normalizePath(path: string | undefined) {
  if (!path) return '/'
  return path.startsWith('/') ? path : `/${path}`
}

function resolveCurrentPath() {
  if (typeof window === 'undefined') return '/'
  const hashPath = window.location.hash?.startsWith('#/')
    ? window.location.hash.slice(1)
    : undefined
  if (hashPath) return normalizePath(hashPath)
  return normalizePath(window.location.pathname || '/')
}

function resolveCustomPage(manifest: RuntimeManifest, surface: string) {
  const pages = manifest.surfaces?.[surface]?.pages ?? []
  const componentPages = pages.filter((page) => page.component)
  const currentPath = resolveCurrentPath()
  const pagePath = (page: ManifestPage) => page.route ?? page.path
  return (
    componentPages.find((page) => normalizePath(pagePath(page)) === currentPath) ??
    componentPages.find((page) => normalizePath(pagePath(page)) === '/') ??
    componentPages[0]
  )
}

export function renderApp(manifest: RuntimeManifest, options?: { surface?: string }) {
  const surface = options?.surface ?? 'admin'
  const customPage = resolveCustomPage(manifest, surface)
  const componentId = customPage?.component
  const CustomPage = componentId ? appRegistry.pages[componentId] ?? appRegistry.components[componentId] : undefined

  if (CustomPage) {
    return React.createElement(CustomPage, {
      manifest,
      surface,
      page: customPage,
    })
  }

  // Neutral fallback — only reached when no page component is wired yet. Keep it
  // calm and free of internal/platform language; this can render to end users.
  if (customPage?.component && typeof console !== 'undefined') {
    console.warn(`[app] manifest page "${customPage.component}" is not registered in src/registry.tsx`)
  }

  return React.createElement(
    'main',
    { className: 'flex min-h-screen items-center justify-center bg-background p-6 text-foreground' },
    React.createElement(
      'section',
      { className: 'mx-auto max-w-md space-y-2 text-center' },
      React.createElement('h1', { className: 'text-2xl font-semibold' }, manifest.name ?? 'App'),
      React.createElement(
        'p',
        { className: 'text-sm text-muted-foreground' },
        'Setting things up…',
      ),
    ),
  )
}
