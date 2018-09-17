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
  typeFont: 'Lato, Helvetica, sans-serif',
  accentFont: 'Covered By Your Grace, serif',
  maxWidth: '96rem', // 960px
  green: '#3AB795',
  darkGreen: '#164337',
  teal: '#7DCFB6',
  beige: '#EDEAD0',
  midBeige: '#EDEAD0',
  darkBeige: '#414039'
};
