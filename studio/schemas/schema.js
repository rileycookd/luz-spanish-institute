// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// document schemas
import navMenu from './documents/navMenu'
import language from './documents/language'
import page from './documents/page'
import siteSettings from './documents/siteSettings'
import route from './documents/route'
import classType from './documents/classType'
import companyInfo from './documents/companyInfo'
import contactForm from './documents/contactForm'
import registrationForm from'./documents/registrationForm'
import faq from './documents/faq'
import testimonial from './documents/testimonial'
import teacher from './documents/teacher'
import student from './documents/student'
import company from './documents/company'
import level from './documents/level'



import * as blocks from './blocks'

// Object types
import { instagram, videoEmbed } from './objects/embeds'
import cta from './objects/cta'
import availability from './objects/availability'
import mainImage from './objects/mainImage'
import blockContent from './objects/blockContent'
import blockText from './objects/blockText'
import classDiscount from './objects/classDiscount'
import classPricing from './objects/classPricing'
import ctaGroup from './objects/ctaGroup'
import ctaLabel from './objects/ctaLabel'
import description from './objects/description'
import externalLink from './objects/externalLink'
import internalLink from './objects/internalLink'
import figure from './objects/figure'
import link from './objects/link'
import openGraph from './objects/openGraph'
import questionAnswer from './objects/questionAnswer'
import quote from './objects/quote'
import latex from './latex'
import timeRange from './objects/timeRange'
import languageLevelGroup from './objects/languageLevelGroup'
import classDayTime from './objects/classDayTime'

const allBlocks = Object.values(blocks).map((block) => {
  return { ...block, fields: block.fields }
})

export default createSchema({
  name: 'blog',
  types: schemaTypes // Built-in types
    // Our custom types
    .concat([
      latex,
      internalLink,
      externalLink,
      openGraph,
      route,
      link,
      cta,
      siteSettings,
      navMenu,
      page,
      language,
      mainImage,
      instagram,
      videoEmbed,
      classType,
      companyInfo,
      classDayTime,
      contactForm,
      registrationForm,
      teacher,
      level,
      faq,
      testimonial,
      languageLevelGroup,
      blockContent,
      figure,
      classDiscount,
      company,
      student,
      classPricing,
      ctaGroup,
      availability,
      ctaLabel,
      description,
      questionAnswer,
      quote,
      timeRange,
      blockText
    ])
    .concat(allBlocks),
})
