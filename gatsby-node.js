const fs = require('fs');
const path = require('path');

const slash = require('slash');

function replaceBrokenSpaces(string) {
  return string.replace(/\s/g, ' ');
}

const DEFAULT_LOCALE = 'de';
const SUPPORTED_LOCALES = ['en', 'de'];

function getUrlsForLocales(locale, url, translations) {
  const urls = {};
  urls[locale] = url;

  const remainingLocales = SUPPORTED_LOCALES.filter((item) => item !== locale);

  remainingLocales.forEach((remainingLocale) => {
    const matchedTranslation = translations.find(
      (translation) => translation.language.locale === remainingLocale,
    );
    if (matchedTranslation) {
      urls[remainingLocale] = matchedTranslation.uri;
    } else {
      urls[remainingLocale] = remainingLocale === DEFAULT_LOCALE ? '/' : `/${remainingLocale}`;
    }
  });
  return urls;
}

async function createPages({ graphql, actions }) {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allWpPage {
        nodes {
          id
          uri
          language {
            locale: slug
          }
          translations {
            language {
              locale: slug
            }
            uri
          }
          template {
            templateName
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw new Error(result.errors);
  }

  const pages = result.data.allWpPage.nodes;

  pages.forEach(
    ({
      id,
      uri,
      language: { locale },
      translations,
      template: { templateName },
    }) => {
      const templateNamePath = templateName.toLowerCase().replace(/\s/g, '-');
      const templatePath = path.resolve(
        `./src/templates/${templateNamePath}.jsx`,
      );

      const context = {
        id,
        locale,
        pageUrls: getUrlsForLocales(locale, uri, translations),
      };

      if (fs.existsSync(templatePath)) {
        createPage({
          path: uri,
          component: slash(templatePath),
          context,
        });
      } else {
        console.error(`Template "${templateName}" was not found`);
      }
    },
  );
}

async function createPosts({ graphql, actions }) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allWpPost {
        nodes {
          id
          content
          uri
          language {
            locale: slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw new Error(result.errors);
  }
  const posts = result.data.allWpPost.nodes;

  posts.forEach(({ id, content, uri, language: { locale } }) => {
    const templatePath = path.resolve('./src/templates/blog-post.jsx');

    const context = {
      id,
      locale,
    };

    if (content) {
      context.content = replaceBrokenSpaces(content);
    }

    if (fs.existsSync(templatePath)) {
      createPage({
        path: uri,
        component: slash(templatePath),
        context,
      });
    } else {
      console.error('Template Blog Post was not found');
    }
  });
}

async function createPartners({ graphql, actions }) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allWpPartner {
        nodes {
          id
          content
          uri
          language {
            locale: slug
          }
          translations {
            language {
              locale: slug
            }
            uri
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw new Error(result.errors);
  }
  const partners = result.data.allWpPartner.nodes;

  partners.forEach(
    ({ id, content, uri, language: { locale }, translations }) => {
      const templatePath = path.resolve('./src/templates/partner.jsx');

      const context = {
        id,
        locale,
        pageUrls: getUrlsForLocales(locale, uri, translations),
      };

      if (content) {
        context.content = replaceBrokenSpaces(content);
      }

      if (fs.existsSync(templatePath)) {
        createPage({
          path: uri,
          component: slash(templatePath),
          context,
        });
      } else {
        console.error('Template Partner was not found');
      }
    },
  );
}

exports.createPages = async (args) => {
  await createPages(args);
  await createPosts(args);
  await createPartners(args);
};
