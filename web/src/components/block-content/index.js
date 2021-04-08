import BaseBlockContent from '@sanity/block-content-to-react'
import React from 'react'
import { format } from 'date-fns'
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'
import Figure from './figure'
import Slideshow from './slideshow'
import Quote from './quote'

import typography from '../typography.module.css'

const serializers = {
  marks: {
    internalLink: ({mark, children}) => {
      const {slug = {}, _type, publishedAt} = mark.reference
      const href = `/${_type}/${format(publishedAt, 'YYYY/MM')}/${slug.current}`
      return <a href={href}>{children}</a>
    },
    externalLink: ({ children, mark }) =>
      mark.blank ? (
        <a href={mark.href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ) : (
        <a href={mark.href}>{children}</a>
      )
  },
  types: {
    block (props) {
      switch (props.node.style) {
        case 'h1':
          return <h1 className={typography.responsiveTitle1}>{props.children}</h1>

        case 'h2':
          return <h2 className={typography.responsiveTitle2}>{props.children}</h2>

        case 'h3':
          return <h3 className={typography.responsiveTitle3}>{props.children}</h3>

        case 'h4':
          return <h4 className={typography.responsiveTitle4}>{props.children}</h4>

        case 'blockquote':
          return <blockquote className={typography.blockQuote}>{props.children}</blockquote>

        default:
          return <p className={typography.articleParagraph}>{props.children}</p>
      }
    },
    figure (props) {
      return <Figure {...props.node} />
    },
    slideshow (props) {
      return <Slideshow {...props.node} />
    },
    quote (props) {
      return <Quote {...props.node} />
    },
    youtube: ({node}) => {
      const { url } = node
      const id = getYouTubeId(url)
      return (<YouTube videoId={id} />)
    }
  }
}

const BlockContent = ({ blocks }) => <BaseBlockContent blocks={blocks} serializers={serializers} />

export default BlockContent
