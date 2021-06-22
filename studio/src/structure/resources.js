import S from '@sanity/desk-tool/structure-builder';
import { IoBriefcase, IoNewspaperOutline, IoPricetags } from 'react-icons/io5'
import { ImPencil2 } from 'react-icons/im'

const resources = S.listItem()
        .title('Resources')
        .icon(IoBriefcase)
        .child(
          S.list()
            .title('Resource panel')
            .items([
              S.listItem('article')
                .title('Articles')
                .icon(IoNewspaperOutline)
                .child(
                  S.documentTypeList('resource')
                    .title('All articles')
                ),
              S.listItem('quiz')
                .icon(ImPencil2)
                .title('Quizzes')
                .child(
                  S.documentTypeList('quiz')
                    .title('All quizzes')
                ),
              S.listItem('category')
                .icon(IoPricetags)
                .title('Categories')
                .child(
                  S.documentTypeList('category')
                    .title('All categories')
                )
            ])
        )

export default resources