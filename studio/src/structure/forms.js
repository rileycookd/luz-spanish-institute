import S from '@sanity/desk-tool/structure-builder'
import { BsChatDots as ContactIcon, BsInboxesFill as SubmissionsIcon } from "react-icons/bs"

export default S.listItem()
  .title('Form submissions')
  .icon(SubmissionsIcon)
  .child(
    S.list()
      .title('Form types')
      .items([
        S.listItem()
          .title('Contact form')
          .icon(ContactIcon)
          .schemaType('navigationMenu')
          .child(S.documentTypeList('contactFormSubmission').title('Contact form submissions')),
      ])
  )