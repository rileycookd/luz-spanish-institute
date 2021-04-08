import BaseBlockContent from '@sanity/block-content-to-react'
import React from 'react'

import * as typography from './typography.module.css'

const serializers = {
  types: {
    block (props) {
      switch (props.node.style) {
        case 'h6':
          return <h6 className={typography.title6}>{props.children}</h6>
        default:
          return <p className={typography.paragraphmain}>{props.children}</p>
      }
    }
  }
}

const BlockText = ({ blocks }) => <BaseBlockContent blocks={blocks} serializers={serializers} />

export default BlockText
