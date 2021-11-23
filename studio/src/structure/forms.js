import S from '@sanity/desk-tool/structure-builder'
import { BsChatDots as ContactIcon, BsInboxesFill as SubmissionsIcon } from "react-icons/bs"
import { FaChalkboardTeacher } from 'react-icons/fa' 
import { MdMoneyOff } from 'react-icons/md'
import { GiCheckMark } from 'react-icons/gi'

export default S.listItem()
  .title('Inbox')
  .icon(SubmissionsIcon)
  .child(
    S.list()
      .title('Inboxes')
      .items([
        S.listItem()
          .title('Registrations')
          .icon(FaChalkboardTeacher)
          .child(
            S.documentTypeList('addRegistrationForm')
              .title('Registration inbox')   
          ),
        S.listItem()
          .title('Messages')
          .icon(ContactIcon)
          .child(
            S.documentTypeList('contactForm')
              .title('Contact form inbox')   
          )
      ])
  )