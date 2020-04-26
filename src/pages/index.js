import React from "react";
// import { Link } from "gatsby";
// import Header from "../components/header";
import Layout from "../components/layout"

export default ({ data }) => (
  /*   <div style={{ color: `purple` }}>
    <Link to="/contact/">Contact</Link>
    <Header headerText="Hello Gatsby!" />
    <p>What a world.</p>
    <img src="https://source.unsplash.com/random/400x200" alt="" />
  </div>
 */
  /*   <div style={{ margin: `3rem auto`, maxWidth: 600 }}>
    <h1>Hi! I'm building a fake Gatsby site as part of a tutorial!</h1>
    <p>
      What do I like to do? Lots of course but definitely enjoy building
      websites.
    </p>
  </div>
 */
  <Layout>
    <h1>{data.site.siteMetadata.title}</h1>
    <div>
      <img
        src="https://2.bp.blogspot.com/-BMP2l6Hwvp4/TiAxeGx4CTI/AAAAAAAAD_M/XlC_mY3SoEw/s1600/panda-group-eating-bamboo.jpg"
        alt="Group of pandas eating bamboo"
      />
    </div>
  </Layout>
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
