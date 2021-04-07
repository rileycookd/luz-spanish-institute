export default {
  widgets: [
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '606daec4957fb909beca5889',
                  title: 'Sanity Studio',
                  name: 'luz-spanish-institute-studio',
                  apiId: '71ec82c3-030d-4fa7-b479-0afaab79f1ef'
                },
                {
                  buildHookId: '606daec4c480bf17fa05e182',
                  title: 'Blog Website',
                  name: 'luz-spanish-institute-web',
                  apiId: 'ced11201-60da-4dbe-baa4-1763ee3545cc'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/rileycookd/luz-spanish-institute',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://luz-spanish-institute-web.netlify.app', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent blog posts', order: '_createdAt desc', types: ['post']},
      layout: {width: 'medium'}
    }
  ]
}
