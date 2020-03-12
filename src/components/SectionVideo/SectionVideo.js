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
        <h2 className={css.heroSubTitle}>
          <FormattedMessage id="SectionVideo.subTitle" />
        </h2>

        <NamedLink
         
         name="SearchPage"
         to={{
           search:
             '?address=USA&bounds=28.87664400000001%2C-91.34532850000005%2C34.45425059999999%2C-96.94061499999998',
         }}
         className={css.heroButton}
       >
         <FormattedMessage id="SectionVideo.browseButton" />
       </NamedLink>       
        
        
       
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
