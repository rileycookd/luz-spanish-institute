import S from '@sanity/desk-tool/structure-builder'
import { MdBusiness } from 'react-icons/md'
import { GoMegaphone } from 'react-icons/go'

export default S.listItem()
    .title('Marketing')
    .icon(GoMegaphone)
    .child(
      S.list()
        .title('Marketing panel')
        .items([
          S.documentTypeListItem('testimonial')
            .title('Testimonials'), 
          S.documentTypeListItem('faq')
            .title('FAQs'),
            ])
    )