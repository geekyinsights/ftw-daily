import React from 'react';
import { string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { NamedLink } from '../../components';

import css from './SectionVideo.css';

const SectionVideo = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.heroContent}>
        <h2 className={classNames(css.heroSubTitle || css.container)}>
          <FormattedMessage id="SectionVideo.subTitle" />
        </h2>     
      </div>
    </div>
  );
};

SectionVideo.defaultProps = { rootClassName: null, className: null };

SectionVideo.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionVideo;
