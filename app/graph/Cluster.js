import { Data, UID } from '../../core/X.js';
import { Vertex } from './Vertex.js';

function log(msg) {
  console.warn('jam-graph: ' + msg);
}

export class Cluster {

  uid = UID.generate();

  /** @type {Object<string, Vertex>} */
  store = Object.create(null);

  /** 
   * @private 
   * @type {Map<Function, *>}
   */
  __timeoutsMap = new Map();

  /** 
   * @private
   * @type {Object<string,Set<Function>>}
   */
  __cbMap = Object.create(null);


  /**
   * @private
   * @type {Set<string>}
   */
  __labelSet = new Set();

  /** @type {Object<string, Data>} */
  __dataMap = Object.create(null);

  /**
   *
   * @param {Vertex} vtx
   * @param {String} [id]
   * @returns {String}
   */
  addVtx(vtx, id) {
    let uid;
    if (!id) {
      uid = UID.generate();
      while (this.store[uid]) {
        uid = UID.generate();
      }
    } else {
      if (this.store[id]) {
        log(`${id} - already exist`);
        return id;
      } else {
        uid = id;
      }
    }
    vtx.uid = uid;

    this.store[uid] = vtx;
    this.__labelSet.add(vtx.label);
    this.notify(vtx.label);
    return uid;
  }

  /** 
   * @param {*} data 
   * @param {String} label
   * @param {String} [id]
   */
  addValue(data, label, id) {
    let vtx = new Vertex({
      value: data,
      label,
    });
    let vtxId = this.addVtx(vtx, id);
    this.notify(vtx.label);
    return vtxId;
  }

  /**
   *
   * @param {String} id
   * @returns {Vertex}
   */
  getVtx(id) {
    return this.store[id];
  }

  /**
   *
   * @param {String[]} idArr
   * @returns {Vertex[]}
   */
  getVtxList(idArr) {
    return idArr.map((id) => {
      return this.getVtx(id);
    });
  }

  /**
   *
   * @param {String} id
   */
  getValue(id) {
    return this.getVtx(id)?.value || null;
  }

  /**
   *
   * @param {String[]} idArr
   */
  getValueList(idArr) {
    return this.getVtxList(idArr).map((vtx) => {
      return vtx.value;
    });
  }

  /**
   * 
   * @param {String} id 
   * @returns {Data}
   */
  getData(id) {
    let val = this.getValue(id);
    if (!this.__dataMap[id]) {
      // @ts-ignore
      this.__dataMap[id] = Data.registerCtx(val, id);
    }
    return this.__dataMap[id];
  }

  /**
   * 
   * @param {String} id 
   */
  clearData(id) {
    if (this.__dataMap?.[id]) {
      Data.deleteCtx(id);
      delete this.__dataMap[id];
    }
  }

  /**
   *
   * @param {String} id
   * @param {*} newData
   * @param {*} dispatcher
   */
  update(id, newData, dispatcher = null) {
    let vtx = this.getVtx(id);
    if (!vtx) {
      log('unable to update vertex: ' + id);
      return;
    }
    vtx.timestamp = Date.now();
    let primitives = [
      String,
      Number,
      Symbol,
    ];
    if (primitives.includes(vtx.value.constructor)) {
      vtx.value = newData;
    } else {
      Object.assign(vtx.value, newData);
    }
    vtx.edges.forEach((uid) => {
      let linked = this.getVtx(uid);
      if (linked.value !== dispatcher) {
        linked.value?.update(newData);
      }
    });
  }

  /**
   *
   * @param {String} id
   * @param {String} propertyName
   * @param {*} propertyValue
   * @param {*} dispatcher
   */
  setProperty(id, propertyName, propertyValue, dispatcher = null) {
    let vtx = this.getVtx(id);
    if (!vtx) {
      log('unable to set property. Vertex is not found: ' + id);
      return;
    }
    vtx.timestamp = Date.now();
    vtx.value[propertyName] = propertyValue;
    vtx.edges.forEach((uid) => {
      let link = this.getVtx(uid);
      if (link.value !== dispatcher) {
        let callbackName = propertyName + 'Changed';
        link.value[callbackName] && link.value[callbackName](propertyValue);
      }
    });
  }

  /**
   *
   * @param {String} id
   */
  deleteVtx(id) {
    let vtx = this.getVtx(id);
    vtx.edges.forEach((conId) => {
      let conVtx = this.getVtx(conId);
      // If connected vertex was removed before:
      if (!conVtx) {
        return;
      }
      this.unlink(conVtx.uid, id);
    });
    this.clearData(id);
    delete this.store[id];
    this.notify(vtx.label);
  }

  /**
   *
   * @param {String} id
   * @param {String} [hardId]
   */
  cloneVtx(id, hardId = '') {
    let vtx = this.getVtx(id);
    if (!vtx) {
      log('unable to clone vertex: ' + id);
      return;
    }
    vtx.timestamp = Date.now();
    let newId = this.addVtx(vtx, hardId);
    this.notify(vtx.label);
    return newId;
  }

  /**
   *
   * @param {String} id
   * @param {String} conId
   */
  link(id, conId) {
    if (id === conId) {
      log('cannot link vertex to itself: ' + id);
      return;
    }
    let vtx = this.getVtx(id);
    let conVtx = this.getVtx(conId);
    if (vtx && conVtx) {
      let concatArr = [...vtx.edges, conId];
      let uniqsSet = new Set(concatArr);
      vtx.edges = [...uniqsSet];
      conVtx.value.update && conVtx.value.update(vtx.value);
      this.notify(vtx.label);
      this.notify(conVtx.label);
    } else {
      log(`could not link ${id} & ${conId}`);
    }
  }

  /**
   *
   * @param {String} id
   * @param {String} conId
   */
  linkDuplex(id, conId) {
    if (id === conId) {
      log('cannot link vertex to itself: ' + id);
      return;
    }
    let vtx = this.getVtx(id);
    let conVtx = this.getVtx(conId);
    if (vtx && conVtx) {
      let concatArr = [...vtx.edges, conId];
      let uniqsSet = new Set(concatArr);
      vtx.edges = [...uniqsSet];
      let conConcatArr = [...conVtx.edges, id];
      let conUniqSet = new Set(conConcatArr);
      conVtx.edges = [...conUniqSet];
      conVtx.value.update && conVtx.value.update(vtx.value);
      vtx.value.update && vtx.value.update(conVtx.value);
      this.notify(vtx.label);
      this.notify(conVtx.label);
    } else {
      log(`could not link ${id} & ${conId}`);
    }
  }

  /**
   *
   * @param {String} vtxId
   * @param {String} linkId
   */
  unlink(vtxId, linkId) {
    let vtx = this.getVtx(vtxId);
    if (vtx) {
      let set = new Set(vtx.edges);
      set.delete(linkId);
      vtx.edges = [...set];
    }
  }

  /**
   * @returns {String[]}
   */
  get keys() {
    return Object.keys(this.store);
  }

  /**
   *
   * @param {String} query
   * @param {String} [label]
   * @param {String} [fieldName]
   * @returns {String[]}
   */
  search(query, label = '', fieldName = '') {
    let result = [];
    (label ? this.getLabeledVtxList(label) : this.keys).forEach((id) => {
      let str = '';
      let vtxVal = this.getVtx(id).value;
      if (fieldName && vtxVal.hasOwnProperty(fieldName)) {
        str = JSON.stringify(vtxVal[fieldName]);
      } else if (!fieldName) {
        str = JSON.stringify(vtxVal);
      }
      if (str.includes(query)) {
        result.push(id);
      }
    });
    return result;
  }

  /**
   *
   * @param {String} id
   * @returns {Object}
   */
  getEdgesByLabel(id) {
    let vtx = this.getVtx(id);
    let result = Object.create(null);
    vtx.edges.forEach((uid) => {
      let linkedVtx = this.getVtx(uid);
      if (result[linkedVtx.label]) {
        result[linkedVtx.label].push(uid);
      } else {
        result[linkedVtx.label] = [uid];
      }
    });
    return result;
  }

  /**
   *
   * @param {String} label
   * @returns {String[]}
   */
  getLabeledVtxList(label) {
    let result = [];
    this.keys.forEach((id) => {
      if (this.getVtx(id).label === label) {
        result.push(id);
      }
    });
    return result;
  }

  /**
   *
   * @param {String} label
   */
  removeByLabel(label) {
    let labelArr = this.getLabeledVtxList(label);
    labelArr.forEach((id) => {
      let edges = this.getVtx(id).edges;
      edges.forEach((linkId) => {
        this.unlink(linkId, id);
      });
      delete this.store[id];
    });
  }

  /**
   * 
   * @param {String} label 
   * @param {(list:String[]) => void} callback
   * @param {Boolean} [init]
   * @returns 
   */
  subscribeOnLabel(label, callback, init = true) {
    if (!this.__cbMap[label]) {
      this.__cbMap[label] = new Set();
    }
    this.__cbMap[label].add(callback);
    if (init) {
      this.hasLabel(label) && this.notify(label);
    }
    return {
      remove: () => {
        this.__cbMap[label].delete(callback);
        if (!this.__cbMap[label].size) {
          delete this.__cbMap[label];
        }
      },
    };
  }

  /**
   * 
   * @param {Function} callback 
   * @param  {...*} args 
   */
  debounce(callback, args) {
    let timeout = this.__timeoutsMap.get(callback);
    if (timeout) {
      clearTimeout(timeout);
    }
    this.__timeoutsMap.set(callback, setTimeout(() => {
      callback(...args);
    }));
  }

  /**
   * 
   * @returns {String[]}
   */
  getLabels() {
    return [...this.__labelSet];
  }

  /**
   * 
   * @param {String} label 
   * @returns {Boolean}
   */
  hasLabel(label) {
    return this.__labelSet.has(label);
  }

  /**
   * 
   * @param {String} label 
   */
  notify(label) {
    this.__cbMap[label]?.forEach((cb) => {
      this.debounce(cb, [this.getLabeledVtxList(label)]);
    });
  }

  /**
   * 
   * @param {(vtx:Vertex) => Boolean} checkFn 
   * @param {String[]} [inputList] 
   * @returns {String[]}
   */
  filter(checkFn, inputList) {
    /** @type {String[]} */
    let result = [];
    (inputList || this.keys).forEach((id) => {
      let vtx = this.getVtx(id);
      if (checkFn(vtx)) {
        result.push(id);
      }
    });
    return result;
  }

  getStoreDataJson() {
    return JSON.stringify(this.store);
  }

  clearStore() {
    this.store = Object.create(null);
  }

  /**
   * 
   * @param {String} json 
   */
  initStoreData(json) {
    let storeData = JSON.parse(json);
    this.clearStore();
    for (let id in storeData) {
      this.addVtx(new Vertex(storeData[id]), id);
    }
  }

}