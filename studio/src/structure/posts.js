import S from '@sanity/desk-tool/structure-builder';
import {
  IoNewspaper as EssayIcon,
  IoCamera as PhotographyIcon,
  IoMegaphone as PostsIcon,
  IoVideocam as DocumentaryIcon,
  IoFileTrayFull as AllIcon,
  IoPeople as PersonIcon,
  IoBookmarks as CategoryIcon,
  IoStar as FeaturedIcon,

} from "react-icons/io5"
import { GiQuillInk as FictionIcon } from 'react-icons/gi'

export const icons = {
  EssayIcon,
  PhotographyIcon,
  PostsIcon,
  DocumentaryIcon
}
        
const posts = S.listItem()

  .title('Posts')
  .icon(PostsIcon)
  .child(
    S.list()
      .title('Post Menu')
      .items([

        // Lists ALL DOCUMENTS from all post types
        S.listItem()
        .title('All posts').icon(AllIcon)
        .child(
          S.documentList()
            .id('all-post-types')
            .filter('_type == "post"')
        ),
        
        // Filtered Lists
        S.listItem()
          .title('Posts by category')
          .child(
            // List out all categories
            S.documentTypeList('category')
              .title('Posts by category')
              .child(catId =>
                // List out project documents where the _id for the selected
                // category appea r as a _ref in the project’s categories array
                S.documentList()
                  .title('Posts')
                  .filter(
                    '(_type == "essay" || _type == "photography" || _type == "documentary" || _type == "fiction" ) && $catId in categories[]._ref'
                  )
                  .params({ catId })
              )
        ),

        // Filter Documents (author, category, etc.)
        S.divider(),
        S.listItem()
          .title('Categories')
          .schemaType('category')
          .child(S.documentTypeList('category').title('Categories'))
          .icon(CategoryIcon),
      ])
  )
        
export default posts;