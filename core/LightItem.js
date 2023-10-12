import { UID } from '../symbiote/utils/UID.js';

const bindAttrName = 'bind-id';

export class LightItem extends HTMLElement {

  static bindMap = {};

  static set template(/** @type {*[]} */ tplArr) {
    this.__tpl = document.createElement('template');

    /**
     * 
     * @param {*[]} descArr
     * @param {HTMLElement} cont 
     */
    let parse = (descArr, cont) => {
      descArr.forEach((desc) => {
        let tag = desc.tag || 'div';
        let resultEl = document.createElement(tag);
        let uid = UID.generate();
        let hasReactiveProp = false;
        let hasReactiveAttribute = false;

        /**
         * 
         * @param {String} stateProp
         * @param {String} elProp
         * @param {'props' | 'attributes'} type 
         */
        let addDesc = (stateProp, elProp, type) => {
          if (!this.bindMap[stateProp]) {
            this.bindMap[stateProp] = {};
          }
          if (!this.bindMap[stateProp][uid]) {
            this.bindMap[stateProp][uid] = {};
          }
          if (!this.bindMap[stateProp][uid][type]) {
            this.bindMap[stateProp][uid][type] = [];
          }
          this.bindMap[stateProp][uid][type].push(elProp);
        };
        if (desc.props) {
          for (let prop in desc.props) {
            let field = desc.props[prop];
            let isReactive = this['state'].hasOwnProperty(field);
            hasReactiveProp = hasReactiveProp || isReactive;
            if (isReactive) {
              addDesc(field, prop, 'props');
            }
            resultEl[prop] = isReactive ? this['state'][field] : field;
          }
        }
        if (desc.attributes) {
          for (let attr in desc.attributes) {
            let field = desc.attributes[attr];
            let isReactive = this['state'].hasOwnProperty(field);
            hasReactiveAttribute = hasReactiveAttribute || isReactive;
            if (isReactive) {
              addDesc(field, attr, 'attributes');
            }
            let attrVal = isReactive ? this['state'][field] : field;
            resultEl.setAttribute(attr, attrVal);
          }
        }

        if (hasReactiveProp || hasReactiveAttribute) {
          resultEl.setAttribute(bindAttrName, uid);
        }

        if (desc.children) {
          parse(desc.children, resultEl);
        }
        cont.appendChild(resultEl);
      });
    };
    // @ts-ignore
    parse(tplArr, this.__tpl.content);
  }

  constructor() {
    super();
    for (let prop in this.constructor['state']) {
      let localProp = '#' + prop;
      Object.defineProperty(this, prop, {
        set: (val) => {
          this[localProp] = val;
          let bindDesc = this.constructor['bindMap'][prop];
          for (let uid in bindDesc) {
            let el = this.querySelector(`[${bindAttrName}="${uid}"]`);
            if (el) {
              if (bindDesc[uid].props) {
                bindDesc[uid].props.forEach((property) => {
                  el[property] = val;
                });
              }
              if (bindDesc[uid].attributes) {
                bindDesc[uid].attributes.forEach((attr) => {
                  el.setAttribute(attr, val);
                });
              }
            }
          }
          this['on_' + prop]?.(val);
        },
        get: () => {
          return this[localProp];
        },
      });
    }
    let fr = this.constructor['__tpl'].content.cloneNode(true);
    this.appendChild(fr);
    for (let prop in this.constructor['state']) {
      if (typeof this.constructor['state'][prop] === 'function') {
        this[prop] = this.constructor['state'][prop].bind(this);
      }
    }
  }

}