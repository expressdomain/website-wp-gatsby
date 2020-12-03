/* eslint-disable react/prop-types */
import { graphql } from 'gatsby';
import React from 'react';

import Content from 'components/pages/partner/content';
import Hero from 'components/pages/partner/hero/';
import Contact from 'components/shared/contact';
import MainLayout from 'layouts/main';

export default ({
  data: {
    wpPartner: data,
  },
  pageContext: { locale, pageUrls, menus, globalFields },
}) => (
  <MainLayout
    seo={data.seo}
    pageUrls={pageUrls}
    menus={menus}
    globalFields={globalFields}
  >
    <Hero
      title={data.title}
      description={data.acf.description}
      locale={locale}
    />
    <Content content={data.content} {...data.acf} locale={locale} />
    <Contact locale={locale} />
  </MainLayout>
);

export const query = graphql`
  query($id: String!) {
    wpPartner(id: { eq: $id }) {
      ...wpPartnerSeo
      title
      content
      acf {
        logo {
          logoBackgroundColor
          logoImage {
            localFile {
              childImageSharp {
                fluid(maxHeight: 30) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
        }
        category {
          title
          url
        }
        description
        partnerInfo {
          items {
            value
            text
          }
          partnerLink {
            url
            title
          }
        }
        successStoryCard {
          successStory {
            ... on WpSuccessStory {    
              title
              acf {
                description
              }
              footerUrl: uri
            }
          }
          footerText
        }
      }
    }
  }
`;
