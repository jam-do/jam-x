const UNLABELED = 'UNLABELED';

export class Vertex {
  /**
   * 
   * @param {Partial<Vertex>} src 
   */
  constructor(src = {}) {
    /** @type {String} */
    this.uid = '';
    /** @type {String} */
    this.label = src.label || UNLABELED;
    /** @type {String[]} */
    this.edges = src.edges || [];
    /** @type {*} */
    this.value = src.value || Object.create(null);
    /** @type {Number} */
    this.timestamp = Date.now();
  }
}