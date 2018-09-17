/*----------  Vendor Imports  ----------*/
import { css } from 'styled-components';

/**
 * generateMediaMixin - Constructo media queries based
 * @param  {object} sizes [Key value pair of label to pixel size]
 * @return {object}       [Mixin functions]
 */
export function generateMediaMixin(sizes) {
  return Object.keys(sizes).reduce((acc, label) => {
    const mediaString = `(min-width:${sizes[label] / 16}em)`;
    acc[label] = (...args) => css`
      @media ${mediaString} {
        ${css(...args)}
      }
    `;
    acc[label].toString = () => mediaString;
    acc[label].breakPoint = sizes[label];
    return acc;
  }, {});
}

/**
 * moolahlahTheme - a styled component theme object
 * @type {Object}
 */
export const moolahlahTheme = {
  ...generateMediaMixin({
    small: 550,
    medium: 780,
    large: 980,
  }),
  typeFont: 'Catamaran, Helvetica, sans-serif',
  accentFont: 'Covered By Your Grace, serif',
  maxWidth: '96rem', // 960px
  sand: '#d1cfb7',
  teal: '#1d9282',
  blue: '#bbe1de',
  red: '#fd653d',
  grey: '#665f57'
};
