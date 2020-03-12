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
             'address=Finland&bounds=70.0922932%2C31.5870999%2C59.693623%2C20.456500199999937',
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