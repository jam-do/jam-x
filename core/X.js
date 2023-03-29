import CFG from '../config.js';

/** @type {import('@symbiotejs/symbiote')} */
const SYM = (await import(CFG.symbiote_core));

export const X = SYM.BaseComponent;
export const Data = SYM.Data;
export const UID = SYM.UID;


