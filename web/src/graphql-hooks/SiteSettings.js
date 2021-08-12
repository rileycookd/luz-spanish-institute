import { graphql, useStaticQuery } from "gatsby";

export const useSiteSettings = () => {
  const { sanitySiteSettings } = useStaticQuery(
    graphql`
      query StaticSiteSettings {
        sanitySiteSettings {
          ...SiteSettings
        }
      }
    `
  )
  return sanitySiteSettings
}