import S from '@sanity/desk-tool/structure-builder'
import { BsChatDots as ContactIcon, BsInboxesFill as SubmissionsIcon } from "react-icons/bs"
import { FaChalkboardTeacher } from 'react-icons/fa' 
import { GiOrganigram } from 'react-icons/gi'

export default S.listItem()
  .title('Staff')
  .icon(GiOrganigram)
  .child(
    S.list()
      .title('Roles')
      .items([
        S.listItem()
          .title('Teachers')
          .icon(FaChalkboardTeacher)
          .child(
            S.documentTypeList('teacher')
              .title('All teachers')   
          ),
      ])
  )