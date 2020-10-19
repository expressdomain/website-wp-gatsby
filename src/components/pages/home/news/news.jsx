import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import BlogPostsCarousel from 'components/shared/blog-posts-carousel';

import shape from './images/shape.svg';
import styles from './news.module.scss';

const cx = classNames.bind(styles);

const News = ({ title, items }) => {
  const shapeElement = <img className={cx('shape')} src={shape} alt="" aria-hidden />;
  return <BlogPostsCarousel className={cx('wrapper')} title={title} items={items} shape={shapeElement} />;
};

News.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    post: PropTypes.shape({
      uri: PropTypes.string.isRequired,
      categories: PropTypes.shape({
        nodes: PropTypes.arrayOf(PropTypes.shape({
          name: PropTypes.string.isRequired,
        })),
      }).isRequired,
      title: PropTypes.string.isRequired,
      acf: PropTypes.shape({
        text: PropTypes.string.isRequired,
        footerText: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  })).isRequired,
};

export default News;
