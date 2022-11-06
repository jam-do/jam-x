import { DICT } from './DICT.js';

/**
 * @template {import('./X.js').X} T
 * @param {DocumentFragment} fr
 * @param {T} fnCtx
 */
export function repeatProcessor(fr, fnCtx) {
  [...fr.querySelectorAll(`[${DICT.REPEAT_ATTR}]`)].forEach((el) => {
    let itemTag = el.getAttribute(DICT.REPEAT_ITEM_TAG_ATTR);
    let itemClass;
    if (itemTag) {
      itemClass = window.customElements.get(itemTag);
    }
    if (!itemClass) {
      // @ts-ignore - TS doesn't resolve X via getter =(
      itemClass = class extends fnCtx.X {
        constructor() {
          super();
          if (!itemTag) {
            this.style.display = 'contents';
          }
        }
      };
      let itemTpl = el.innerHTML;
      itemClass.template = itemTpl;
      itemClass.reg(itemTag);
    }
    while (el.firstChild) {
      el.firstChild.remove();
    }
    let repeatDataKey = el.getAttribute(DICT.REPEAT_ATTR);
    fnCtx.sub(repeatDataKey, (data) => {
      if (!data) {
        while (el.firstChild) {
          el.firstChild.remove();
        }
        return;
      }
      let currentList = [...el.children];
      let fragment;
      let fillItems = (/** @type {any[]} */ items) => {
        items.forEach((item, idx) => {
          if (currentList[idx]) {
            // @ts-ignore
            if (currentList[idx].set$) {
              // wait until repeated element's state will be initialized
              setTimeout(() => {
                // @ts-ignore
                currentList[idx].set$(item);
              });
            } else {
              for (let k in item) {
                currentList[idx][k] = item[k];
              }
            }
          } else {
            if (!fragment) {
              fragment = new DocumentFragment();
            }
            let repeatItem = new itemClass();
            Object.assign(repeatItem.init$, item);
            fragment.appendChild(repeatItem);
          }
        });
        fragment && el.appendChild(fragment);
        let oversize = currentList.slice(items.length, currentList.length);
        for (let exItm of oversize) {
          exItm.remove();
        }
      };
      if (data.constructor === Array) {
        fillItems(data);
      } else if (data.constructor === Object) {
        let items = [];
        for (let itemKey in data) {
          let init = data[itemKey];
          Object.defineProperty(init, '_KEY_', {
            value: itemKey,
            enumerable: true,
          });
          items.push(init);
        }
        fillItems(items);
      } else {
        console.warn('jam-x repeat data type error:');
        console.log(data);
      }
    });
    el.removeAttribute(DICT.REPEAT_ATTR);
    el.removeAttribute(DICT.REPEAT_ITEM_TAG_ATTR);
  });
}
