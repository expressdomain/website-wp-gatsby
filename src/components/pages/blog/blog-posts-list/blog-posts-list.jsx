import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import classNames from 'classnames/bind';
import GatsbyImage from 'gatsby-image';

import Heading from 'components/shared/heading';
import Item from './item';

import shape from './images/shape.svg';

import styles from './blog-posts-list.module.scss';

const cx = classNames.bind(styles);

const BlogPostList = ({ items, illustrationText }) => {
  const {
    image: {
      childImageSharp: { fluid: image },
    },
  } = useStaticQuery(graphql`
    {
      image: file(relativePath: { eq: "pages/blog/blog-post-list/image.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }
  `);

  return (
    <div className={cx('wrapper')}>
      <div className="container">
        <div className={cx('items-wrapper')}>
          {items.map((item, index) => <Item {...item} key={index} />)}
        </div>

        <div className={cx('illustration')} aria-hidden>
          <span className={cx('rectangle', 'rectangle-1')} />
          <span className={cx('rectangle', 'rectangle-2')} />
          <span className={cx('rectangle', 'rectangle-3')} />
          <GatsbyImage className={cx('image')} fluid={image} />
          <Heading className={cx('illustration-text')} tag="span" size="lg" color="tertiary">
            {illustrationText}
          </Heading>
        </div>

        <img className={cx('shape')} src={shape} alt="" aria-hidden />
      </div>
    </div>
  );
};

BlogPostList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      buttonText: PropTypes.string.isRequired,
      buttonUrl: PropTypes.string.isRequired,
    }),
  ).isRequired,
  illustrationText: PropTypes.string.isRequired,
};

export default BlogPostList;
