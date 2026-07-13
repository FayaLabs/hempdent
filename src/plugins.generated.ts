// AI-BUILDER contract file: plugin/scaffold/provider wiring lives here.
//
// This app mounts three curated Fayz plugins on its WEBSITE surface (blog,
// reputation/reviews, agenda/booking) while keeping its bespoke layout. The
// concrete wiring — seeded plugin instances, the app-root context provider, and
// the public route mounting — lives in ./plugins/website. Re-exported here so the
// generated contract stays the single discovery point.
export {
  websitePlugins,
  WebsitePluginProvider,
  getWebsitePluginRoutes,
  SiteChrome,
} from './plugins/website'
