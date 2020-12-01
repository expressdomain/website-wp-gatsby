/* eslint-disable react/prop-types */
import { graphql } from 'gatsby';
import React from 'react';

import Content from 'components/pages/jobs/content';
import Hero from 'components/pages/jobs/hero';
import MainLayout from 'layouts/main';

export default ({
  data: {
    wpPage: data,
    positions,
  },
  pageContext: { locale, pageUrls, menus, globalFields },
}) => (
  <MainLayout
    seo={data.seo}
    pageUrls={pageUrls}
    menus={menus}
    globalFields={globalFields}
  >
    <Hero title={data.title} locale={locale} image={data.acf.jobsHeroImage} />
    <Content content={data.content} title={data.acf.openPositionsTitle} positions={positions} />
  </MainLayout>
);

export const query = graphql`
  query($id: String!, $locale: String!) {
    wpPage(id: { eq: $id }) {
      title
      content
      acf {
        jobsHeroImage {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1290) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
        }
        openPositionsTitle
      }
      ...wpPageSeo
    }
    positions: allWpJob(
      filter: { language: { slug: { eq: $locale } } },
      sort: {order: ASC, fields: title}) {
      items: nodes {
        url: uri
        title
      }
    }
  }
`;