import { Link } from 'gatsby'
import React, { useState } from 'react'
import PostPreview from './post-preview'
import * as styles from './post-preview-grid.module.css'

function PostPreviewGrid (props) {

  return (
    <div className={styles.root}>
      {props.title && (
        <h2 className={styles.headline}>
          {props.browseMoreHref ? (
            <Link to={props.browseMoreHref}>{props.title}</Link>
          ) : (
            props.title
          )}
        </h2>
      )}
      <ul className={styles.grid}>
        {props.nodes && (
          props.nodes.map((node, i) => (
              <li className={styles.listItem} key={node.id}>
                <PostPreview {...node} />
              </li>
          ))
        )}
      </ul>    
    </div>
  )
}

PostPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
}

export default PostPreviewGrid
