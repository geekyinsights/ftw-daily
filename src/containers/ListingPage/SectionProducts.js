import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { richText } from '../../util/richText';

import css from './ListingPage.css';

const MIN_LENGTH_FOR_LONG_WORDS_IN_DESCRIPTION = 20;


const SectionProducts = props => {
  //const { products } = props;


  
  return  (
    <div className={css.sectionProducts}>
      <h2 className={css.productsTitle}>
        <FormattedMessage id="ListingPage.productsTitle" />
      </h2>   
    </div>

  );
};


export default SectionProducts;
