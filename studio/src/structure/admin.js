import S from '@sanity/desk-tool/structure-builder'
import { MdBusiness } from 'react-icons/md'
import { VscSettings } from 'react-icons/vsc'
import { IoLanguage } from 'react-icons/io5'

export default S.listItem()
    .title('Admin')
    .icon(VscSettings)
    .child(
      S.list()
        .title('Admin panel')
        .items([
          S.listItem()
            .title('Company Info')
            .icon(MdBusiness)
            .child(
              S.editor()
                .id('companyInfo')
                .schemaType('companyInfo')
                .documentId('companyInfo')
            ),
            S.listItem()
            .title('Languages')
            .icon(IoLanguage)
            .child(
              S.list()
                .title('Language menu')
                .items([
                  S.documentTypeListItem('language')
                    .title('Languages taught'),
                  S.documentTypeListItem('level')
                    .title('Levels'),    
                ])
              ),
          ])
    )