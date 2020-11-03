import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import PartnerInfo from 'components/shared/partner-info';
import SuccessStoryCard from 'components/shared/success-story-card';

import styles from './content.module.scss';

const cx = classNames.bind(styles);

const Content = ({ content, acf: { partnerInfo, successStoryCard } }) => (
  <div className={cx('wrapper')}>
    <div className="container">
      <div className={cx('content')} dangerouslySetInnerHTML={{ __html: content }} />
      <div className={cx('info-wrapper')}>
        <PartnerInfo {...partnerInfo} />
        <SuccessStoryCard {...successStoryCard} />
      </div>
    </div>

  </div>
);

Content.propTypes = {
  content: PropTypes.string.isRequired,
  acf: PropTypes.shape({
    partnerInfo: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
        }),
      ).isRequired,
      partnerLink: PropTypes.shape({
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    successStoryCard: PropTypes.shape({
      category: PropTypes.string.isRequired,
      successStory: PropTypes.shape({
        title: PropTypes.string.isRequired,
        acf: PropTypes.shape({
          description: PropTypes.string.isRequired,
        }),
        uri: PropTypes.string.isRequired,
      }).isRequired,
      footerText: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Content;
