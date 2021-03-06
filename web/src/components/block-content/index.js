import BaseBlockContent from '@sanity/block-content-to-react'
import React from 'react'
import { format } from 'date-fns'
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'
import Figure from './figure'
import ExampleBlock from './example-block'
import ExcerptBlock from './excerpt-block'
import Quote from './quote'
import QuizInline from './quiz-inline'

import { v4 as uuidv4 } from 'uuid';

import * as typography from '../typography.module.css'
import * as styles from './index.module.css'

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
          return <h1 className={typography.title2}>{props.children}</h1>

        case 'h2':
          return <h2 id={`title${props.node.children[0]._key}`} className={typography.title3}>{props.children}</h2>

        case 'h3':
          return <h3 className={typography.title4}>{props.children}</h3>

        case 'h4':
          return <h4 className={typography.title5}>{props.children}</h4>

        case 'blockquote':
          return <blockquote className={typography.blockQuote}>{props.children}</blockquote>

        default:
          return <p className={typography.articleParagraph}>{props.children}</p>
      }
    },
    figure (props) {
      return <Figure {...props.node} />
    },
    exampleBlock (props) {
      return <ExampleBlock {...props.node} />
    },
    excerptBlock (props) {
      return <ExcerptBlock {...props.node} />
    },
    quiz (props) {
      const blockKey = uuidv4();
      return <QuizInline blockKey={blockKey} {...props.node} />
    },
    quote (props) {
      return <Quote {...props.node} />
    },
    youtube: ({node}) => {
      const { url } = node
      const id = getYouTubeId(url)
      return (
        <div className={styles.youtubeContainer}>
          <YouTube opts={{
            height: '100%',
            width: '100%'
          }} videoId={id} />
        </div>
      )
    }
  }
}

const BlockContent = ({ blocks }) => <BaseBlockContent blocks={blocks} serializers={serializers} />

export default BlockContent
