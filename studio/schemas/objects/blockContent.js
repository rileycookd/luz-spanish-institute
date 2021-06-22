import Unsplash from 'part:sanity-plugin-asset-source-unsplash/image-asset-source'
import Default from 'part:@sanity/form-builder/input/image/asset-source-default'


/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // corrensponds with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [{ title: 'Strong', value: 'strong' }, { title: 'Emphasis', value: 'em' }, { "title": "Strike", "value": "strike-through" }],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          { type: 'externalLink' },
          { type: 'internalLink' }
        ]
      }
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    {
      type: 'figure',
      options: {sources: [Unsplash, Default]}
    },
    {
      type: 'quote'
    },
    {
      type: 'exampleBlock'
    },
    {
      type: 'excerptBlock'
    },
    {
      title: "Quiz",
      type: 'reference',
      to: [{ type: "quiz" }],
    },
    // {
    //   type: 'youtube'
    // }
  ]
}
