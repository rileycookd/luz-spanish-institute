const { format } = require('date-fns')

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */



// Create Landing Pages (from Sanity studio Page Builder )
async function createLandingPages(pathPrefix = "/", graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityRoute(filter: { slug: { current: { ne: null } }, page: { id: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const routeEdges = (result.data.allSanityRoute || {}).edges || [];
  routeEdges.forEach((edge) => {
    const { id, slug = {} } = edge.node;
    const path = [pathPrefix, slug.current, "/"].join("");
    reporter.info(`Creating landing page: ${path}`);
    createPage({
      path,
      component: require.resolve("./src/templates/page.js"),
      context: { id },
    });
  });
}

async function createClassTypePages (pathPrefix = "/", graphql, actions, reporter) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allSanityClassType(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)


  if (result.errors) throw result.errors

  const classTypeEdges = (result.data.allSanityClassType || {}).edges || []

  classTypeEdges.forEach((edge) => {
    const { id, slug = {}} = edge.node
    const path = [pathPrefix, "classes/", slug.current, "/"].join("");

    reporter.info(`Creating class type page: ${path}`)

    createPage({
      path,
      component: require.resolve('./src/templates/class.js'),
      context: { id }
    })
  })
}

async function createResourcePages (pathPrefix = "/", graphql, actions, reporter) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allSanityResource(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)


  if (result.errors) throw result.errors

  const resourceEdges = (result.data.allSanityResource || {}).edges || []

  resourceEdges.forEach((edge) => {
    const { id, slug = {}} = edge.node
    const path = [pathPrefix, "resources/", slug.current, "/"].join("");

    reporter.info(`Creating resource page: ${path}`)

    createPage({
      path,
      component: require.resolve('./src/templates/resource.js'),
      context: { id }
    })
  })
}


exports.createPages = async ({ graphql, actions, reporter }) => {
  await createLandingPages("/", graphql, actions, reporter);
  await createClassTypePages("/", graphql, actions, reporter);
  await createResourcePages("/", graphql, actions, reporter);
};
