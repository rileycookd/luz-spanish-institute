import React, { useRef, useState, useLayoutEffect } from 'react'
import * as styles from './header.module.css'
import CTALinkList from './cta-link-list'
import { buildImageObj, cn } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";

function Header ({ navigation, title, subtitle, image }) {

  // Added height for absolute positioned content element
  const [addedHeight, setAddedHeight] = useState(0)
  const ref = useRef(null)

  useLayoutEffect(()=>{
    if (ref.current) {
        setAddedHeight(ref.current.clientHeight * .5)
    }
  }, [ref.current, ref.current ? ref.current.clientHeight:0])
  
  let el = null;
  if(navigation) {
    el = <CTALinkList links={navigation} innerRef={ref} />;
  } 

  // else if(tabs) {
  //   tabs.length > 0 
  //   ? el = <TabList tabs={tabs} />
  //   : el = null
  // }

  return (
    <div className={styles.root}>
      <header className={styles.header} style={{height: `calc(100% + ${addedHeight}px`}}>
        <div className={styles.titles}>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && (
            <p className={styles.subtitle}>{subtitle}</p>
          )}
        </div>
        {image && (
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src={imageUrlFor(buildImageObj(image))
                .width(800)
                .height(Math.floor((3 / 4) * 800))
                .auto("format")
                .url()}
              alt={image.alt}
            />
            <div className={styles.overlay}></div>
          </div>
        )}
      </header>
      {el}  
    </div>
  )
}

export default Header