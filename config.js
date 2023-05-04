export const CFG_KEY = 'JAM_X_CFG';
export const SYM_PATH_KEY = 'symbiote_index';
export const DEFAULT_SYM_PATH = 'https://esm.sh/@symbiotejs/symbiote@2.0.0-alpha.2/';

/**
 * @param {String} key
 * @returns {String}
 */
export function getCfgVal(key) {
  let libPath = DEFAULT_SYM_PATH;
  if (typeof window !== 'undefined') {
    libPath = window[CFG_KEY]?.[key];
  } else {
    libPath = '@symbiotejs/symbiote';
  }
  return libPath || DEFAULT_SYM_PATH;
}

/**
 * @typedef {Object} SymConfig
 * @property {String} symbiote_index
 */

/** @type {SymConfig} */
export default {
  [SYM_PATH_KEY]: await getCfgVal(SYM_PATH_KEY),
}