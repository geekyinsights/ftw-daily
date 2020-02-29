import React from 'react';
import { string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { NamedLink } from '../../components';

import css from './SectionScreenshot.css';

const SectionScreenshot = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.heroContent}>
        <h1 className={css.heroMainTitle}>
          <FormattedMessage id="SectionScreenshot.title" />
        </h1>
        <h2 className={css.heroSubTitle}>
          <FormattedMessage id="SectionScreenshot.subTitle" />
        </h2>
        <h2 className={css.heroSubTitle}>
          <FormattedMessage id="SectionScreenshot.subTitle" />
        </h2>
        <h2 className={css.heroSubTitle}>
          <FormattedMessage id="SectionScreenshot.subTitle" />
        </h2>
        <h2 className={css.heroSubTitle}>
          <FormattedMessage id="SectionScreenshot.subTitle" />
        </h2>
        
        
        
        
       
      </div>
    </div>
  );
};

SectionScreenshot.defaultProps = { rootClassName: null, className: null };

SectionScreenshot.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionScreenshot;
