export const WINDOW_CFG_KEY = '_JAM_X_CFG_';

/**
 * @param {String} key
 * @returns {String}
 */
function getCfgVal(key) {
  return window[WINDOW_CFG_KEY]?.[key];
}

/**
 * @typedef {Object} SymConfig
 * @property {String} symbiote_core
 */

/** @type {SymConfig} */
export default {
  symbiote_core: getCfgVal('symbiote_core') || 'https://esm.sh/@symbiotejs/symbiote/',
}