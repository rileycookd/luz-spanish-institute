import React from 'react'
import * as styles from './class-overview.module.css'
import * as tabStyles from './tab-component.module.css'
import { IoTimeOutline as DurationIcon } from 'react-icons/io5'
import { AiOutlineDollar as MoneyIcon } from 'react-icons/ai'
import { BsPeople as StudentsIcon } from 'react-icons/bs'
import CTALink from './CTALink'
import { buildImageObj, cn, getClassSizeString, getClassStartingPrice } from "../lib/helpers"
import { imageUrlFor } from "../lib/image-url"
import BlockText from './block-text'
import Testimonial from './testimonial'
import Pricing from './pricing'
import FAQ from './faq'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

// import { TabList, Tab, Tabs, TabPanel } from './tab-component'


function ClassOverview ({ 
  image, 
  title, 
  _rawDescription, 
  min, 
  max, 
  maxDiscount,
  sizeDiscount,
  pricing, 
  testimonial,
  packages,
  faq,
  ...props }) {

  const durationArray = pricing.map(p => {
    return p.duration
  }).sort((a, b) => {
    return a - b
  })

  const durationRange = durationArray.length > 1
  ? `${durationArray[0] / 60}-${durationArray[durationArray.length - 1] / 60} hour${durationArray[durationArray.length - 1] === 1 ? '' : 's'}`
  : `${durationArray[0] / 60} hour${durationArray[0] === 60 ? '' : 's'}`

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <h2 className={styles.headerTitle}>{title}</h2>
          <div className={styles.headerMeta}>
            <div className={styles.headerMetaItem}>
              <StudentsIcon />
              <p className={styles.headerMetaItemInfo}>{getClassSizeString(min,max)}</p>
            </div>
            <div className={styles.headerMetaItem}>
              <DurationIcon />
              <p className={styles.headerMetaItemInfo}>{durationRange}</p>
            </div>
            <div className={styles.headerMetaItem}>
              <MoneyIcon />
              <p className={styles.headerMetaItemInfo}>{`$${getClassStartingPrice(pricing)}+`}</p>
            </div>
          </div>
        </div>
        <CTALink title="Enroll now" kind="small button" route="/register" />
      </div>
      <img
        className={styles.mainImage}
        src={imageUrlFor(buildImageObj(image))
          .width(1000)
          .height(Math.floor((9 / 16) * 1000))
          .auto("format")
          .url()}
        alt={image.alt}
      />
    <Tabs className={tabStyles.root}
      selectedTabClassName={tabStyles.active}>
      <TabList className={cn(tabStyles.tabList, tabStyles.dark)}>
        <Tab 
          className={cn(tabStyles.tab, tabStyles.dark)}
        >Overview</Tab>
        <Tab className={cn(tabStyles.tab, tabStyles.dark)}>Pricing</Tab>
        {testimonial && (
          <Tab className={cn(tabStyles.tab, tabStyles.dark)}>Reviews</Tab>
        )}
        {faq && (
          <Tab className={cn(tabStyles.tab, tabStyles.dark)}>FAQ</Tab>
        )}
      </TabList>

      <TabPanel>
        <div className={styles.tabDescription}>
          <BlockText  blocks={_rawDescription} />
        </div>
      </TabPanel>

      <TabPanel>
        <Pricing 
          classType={title} 
          base={pricing} 
          packages={packages} 
          min={min}
          max={max}
          maxDiscount={maxDiscount}
          sizeDiscount={sizeDiscount}
        />
      </TabPanel>

      {testimonial && (
        <TabPanel>
          <div style={{maxWidth: '600px'}}>
            <Testimonial {...testimonial} />
          </div>
        </TabPanel>
      )}
      {faq && (
        <TabPanel>
          <FAQ questions={faq._rawQuestions} />
        </TabPanel>
      )}
    </Tabs>
    </div>
  )
}

export default ClassOverview