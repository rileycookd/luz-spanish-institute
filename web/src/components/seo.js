import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

function SEO ({ description, lang, meta, image: metaImage, keywords = [], title, pathname }) {
  return (
    <StaticQuery
      query={graphql`
        query SEOQuery {
          site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
            title
            description
            keywords
            author
            siteUrl
          }
        }
      `}
      render={data => {
        if (!data.site) {
          return
        }
        const site = (data || {}).site;
        const metaDescription = description || data.site.description
        const image =
          metaImage && metaImage.src
            ? `${site.siteUrl}${metaImage.src}`
            : null
        const canonical = pathname ? `${site.siteUrl}${pathname}` : null

        return (
          <Helmet
            htmlAttributes={{
              lang
            }}
            title={title}
            titleTemplate={title === data.site.title ? '%s' : `%s | ${data.site.title}`}
            link={
              canonical
                ? [
                    {
                      rel: "canonical",
                      href: canonical,
                    },
                  ]
                : []
            }
            meta={[
              {
                name: 'description',
                content: metaDescription
              },
              {
                property: 'og:title',
                content: title
              },
              {
                property: 'og:description',
                content: metaDescription
              },
              {
                property: 'og:type',
                content: 'website'
              },
              {
                name: 'twitter:card',
                content: 'summary'
              },
              {
                name: 'twitter:creator',
                content: data.site.author
              },
              {
                name: 'twitter:title',
                content: title
              },
              {
                name: 'twitter:description',
                content: metaDescription
              },
            ]
              .concat(
                metaImage
                  ? [
                      {
                        property: "og:image",
                        content: image,
                      },
                      {
                        property: "og:image:width",
                        content: metaImage.width,
                      },
                      {
                        property: "og:image:height",
                        content: metaImage.height,
                      },
                      {
                        name: "twitter:card",
                        content: "summary_large_image",
                      },
                    ]
                  : [
                      {
                        name: "twitter:card",
                        content: "summary",
                      },
                    ]
              )
              .concat(
                keywords && keywords.length > 0
                  ? {
                    name: 'keywords',
                    content: keywords.join(', ')
                  }
                  : []
              )
              .concat(meta)}
          />
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: []
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }),
  pathname: PropTypes.string,
}

export default SEO
