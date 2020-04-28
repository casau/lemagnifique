const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = async ({ 
  node,
  getNode,
  actions: { createNode, createNodeField},
  loadNodeContent,
  createNodeId,
  createContentDigest,
}) => {
  // const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }

  if (node.name === 'sonates') {
  // const { createNode } = actions
  try {
    const nodeContent = await loadNodeContent(node);
    const todos = JSON.parse(nodeContent);
    console.log(node);

    todos.forEach(sonate => {
      const childId = createNodeId(`${node.id}${sonate.id}`);
      const sonateNode = {
        sonateId: sonate.id,
        sourceInstanceName: node.name,
        id: childId,
        children: [],
        parent: node.id,
        internal: {
          type: 'Sonate',
          contentDigest: createContentDigest(sonate),
          description: 'A Sonate lalala...lala',
        },
      };
      createNode(sonateNode);
    });
  } catch (error) {
    console.error(error);
  }
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
}