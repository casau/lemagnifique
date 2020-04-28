import React, { useState, useEffect } from "react";
import { Link, graphql } from "gatsby";
import { css } from "@emotion/core";
import { rhythm } from "../utils/typography";
import Layout from "../components/layout";

export default ({ data }) => {
  const [ci, setCI] = useState(0);
  useEffect(() => {
    // fetch data from api
    fetch(`https://my-json-server.typicode.com/casau/serve_json/db`)
      .then((response) => response.json()) // parse JSON from request
      .then((resultData) => {
        setCI(resultData.profile.name);
      }); // set data for the ci
  }, []);

  return (
    <Layout>
      <div>
        <div>
          <h1
            css={css`
              display: inline-block;
              border-bottom: 1px solid;
            `}
          >
            Amazing Pandas Eating Things
          </h1>
          <img
            src="https://2.bp.blogspot.com/-BMP2l6Hwvp4/TiAxeGx4CTI/AAAAAAAAD_M/XlC_mY3SoEw/s1600/panda-group-eating-bamboo.jpg"
            alt="Group of pandas eating bamboo"
          />
          <p>Runtime Data: CI {ci}</p>
          <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <div key={node.id}>
              <Link
                to={node.fields.slug}
                css={css`
                  text-decoration: none;
                  color: inherit;
                `}
              >
                <h3
                  css={css`
                    margin-bottom: ${rhythm(1 / 4)};
                  `}
                >
                  {node.frontmatter.title}{" "}
                  <span
                    css={css`
                      color: #bbb;
                    `}
                  >
                    — {node.frontmatter.date}
                  </span>
                </h3>
                <p>{node.excerpt}</p>
              </Link>
            </div>
          ))}
        </div>
        <div class="flex flex-wrap -mb-4">
          <div class="w-1/2 mb-4 bg-gray-400 h-12"></div>
          <div class="w-1/2 mb-4 bg-gray-500 h-12"></div>
          <div class="w-1/3 mb-4 bg-gray-400 h-12"></div>
          <div class="w-1/3 mb-4 bg-gray-500 h-12"></div>
          <div class="w-1/3 mb-4 bg-gray-400 h-12"></div>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;
