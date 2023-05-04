import CFG from '../config.js';
import { SYM_PATH_KEY } from '../config.js';

/** @type {import('@symbiotejs/symbiote/core')} */
const SYM = (await import(CFG[SYM_PATH_KEY]));

export const X = SYM.BaseComponent;
export const Data = SYM.Data;
export const UID = SYM.UID;


