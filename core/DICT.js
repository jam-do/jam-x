/** @enum {String} */
export const DICT = Object.freeze({
  //  Template data binding attribute:
  BIND_ATTR: 'bind',
  //  Local state binding attribute name:
  ATTR_BIND_PRFX: '@',
  // External prop prefix:
  EXT_CTX_PRFX: '*',
  // Named data context property splitter:
  NAMED_CTX_SPLTR: '/',
  // Data context name attribute:
  CTX_NAME_ATTR: 'ctx',
  // Data context owner attribute:
  CTX_OWNER_ATTR: 'data-owner',
  // Data context name in CSS custom property:
  CSS_CTX_PROP: '--ctx',
  // Element reference attribute:
  EL_REF_ATTR: 'ref',
  // Prefix for auto generated tag names:
  AUTO_TAG_PRFX: 'jam',
  // Template list source data attribute:
  REPEAT_ATTR: 'repeat',
  // List item tag name:
  REPEAT_ITEM_TAG_ATTR: 'repeat-item-tag',
  // Key to restore nested properties was set before component construction
  SET_LATER_KEY: '__toSetLater__',
  // Attribute to provide selector of custom template
  USE_TPL: 'use-template',
  // Root style attribute name:
  ROOT_STYLE_ATTR_NAME: 'jam-x-component',
});
