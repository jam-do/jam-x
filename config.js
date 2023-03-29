export const CFG_KEY = 'JAM_X_CFG';
export const DEFAULT_PATH = 'https://esm.sh/@symbiotejs/symbiote/';
export const SYM_PATH_KEY = 'symbiote_index';

/**
 * @param {String} key
 * @returns {Promise<String>}
 */
export async function getCfgVal(key) {
  let libPath = DEFAULT_PATH;
  if (typeof window !== 'undefined') {
    libPath = window[CFG_KEY]?.[key];
  } else {
    try {
      let process = await import('process');
      if (process) {
        libPath = process.env[CFG_KEY];
      }
    } catch (e) {
      console.error(e);
    }
  }
  return libPath || DEFAULT_PATH;
}

/**
 * @typedef {Object} SymConfig
 * @property {String} symbiote_index
 */

/** @type {SymConfig} */
export default {
  [SYM_PATH_KEY]: await getCfgVal(SYM_PATH_KEY),
}