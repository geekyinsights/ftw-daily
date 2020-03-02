import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';

import css from './SectionHowItWorks.css';

import helsinkiImage from './images/bestthing_smaller.png';
import rovaniemiImage from './images/goldenhour_smaller.png';
import rukaImage from './images/beautifulday_smaller.png';

class ProductImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <img alt={alt} {...rest} />;
  }
}
const LazyImage = lazyLoadWithDimensions(ProductImage);

const productLink = (name, image) => {
  const nameText = <span className={css.locationName}>{name}</span>;
  return (
    <NamedLink name="SearchPage" className={css.location}>
      <div className={css.imageWrapper}>
        <div className={css.aspectWrapper}>
          <LazyImage src={image} alt={name} className={css.productImage} />
        </div>
      </div>
      <div className={css.linkText}>
        <FormattedMessage
          id="SectionLocations.listingsInLocation"
          values={{ name: nameText}}
        />
      </div>
    </NamedLink>
  );
};

const SectionHowItWorks = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionHowItWorks.titleLineOne" />
      </div>
      <div className={css.stitle}>

        <FormattedMessage id="SectionHowItWorks.titleLineTwo" />
      </div>
      <div className={css.locations}>
        <ul>
        <div className={css.steps}>
         <div className={css.step}>
          {productLink(
            'Golden Hour Bath Balm',
            helsinkiImage,
          )}
           <p className={css.subTitle}>
              <FormattedMessage id="SectionHowItWorks.part3Text" />
            </p>
          </div>
        </div>
        </ul>
        <ul>
        <div className={css.steps}>
         <div className={css.step}>
          {productLink(
            'Beautiful Day Bath Balm',
            rovaniemiImage,
          
          )}
           <p className={css.subTitle}>
              <FormattedMessage id="SectionHowItWorks.part2Text" />
            </p>
          </div>
        </div>
          </ul>
          <ul>
            <div className={css.steps}>
              <div className={css.step}>
                {productLink(
                  'Best Thing Bath Balm',
                  rukaImage
                
                )}
                 <p className={css.subTitle}>
                    <FormattedMessage id="SectionHowItWorks.part1Text" />
                  </p>
                </div>
            </div>
         </ul>
    </div>
    </div>
  );
};

SectionHowItWorks.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionHowItWorks.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHowItWorks;
