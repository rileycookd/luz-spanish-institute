import S from '@sanity/desk-tool/structure-builder'
import { MdBusiness, MdSettings } from 'react-icons/md'
import { IoHome } from 'react-icons/io5'
import pageBuilder from './src/structure/page-builder'
import forms from './src/structure/forms'

const hiddenTypes = ['companyInfo', 'testimonial', 'classType', 'navigationMenu', 'route', 'page', 'siteSettings', 'contactForm', 'media.tag', 'registrationForm', 'category']

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        )
        .icon(MdSettings),
      S.listItem()
        .title('Company Info')
        .child(
          S.editor()
            .id('companyInfo')
            .schemaType('companyInfo')
            .documentId('companyInfo')
        )
        .icon(MdBusiness),
      S.documentListItem()
        .title('Homepage')
        .schemaType('page')
        .icon(IoHome)
        .child(
          S.document()
            .schemaType('page')
            .documentId('homepage')
            // .views([S.view.form(), PreviewIFrame()])
      ),
      pageBuilder,
      S.documentTypeListItem('classType')
        .title('Class types'),   
      S.documentTypeListItem('testimonial')
        .title('Testimonials'),   
      ...S.documentTypeListItems().filter(listItem => !hiddenTypes.includes(listItem.getId())),
      forms
    ])
