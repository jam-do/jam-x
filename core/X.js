import { BaseComponent } from '../symbiote/core/BaseComponent.js';
import { applyData } from '../iso/applyData.js';

export { PubSub } from '../symbiote/core/PubSub.js';
export { UID } from '../symbiote/utils/UID.js'; 
export class X extends BaseComponent {

  /**
   * 
   * @param {String} path 
   * @returns {String}
   */
  getAbsolutePath(path) {
    let depth = 0;
    let absolutePath = path;
    if (!path.includes('//')) {
      while (path.includes('../')) {
        depth++;
        path = path.replace('../', '');
      }
      path = path.replace('./', '');
      let docPathArr = document.location.pathname.split('/');
      let pathBaseArr = docPathArr.filter((str) => {
        return !str.includes('.');
      });
      pathBaseArr = pathBaseArr.slice(0, pathBaseArr.length - depth);
      let pathBase = pathBaseArr.join('/');
      if (!pathBase.endsWith('/')) {
        pathBase += '/';
      }
      absolutePath = document.location.origin + pathBase + path;
    }
    return absolutePath;
  }

  /**
   * 
   * @param {String} src 
   * @returns {Promise<String>}
   */
  async getDwa(src) {
    return (await import(this.getAbsolutePath(src))).default;
  }

  async getData() {
    let data = null;
    const attr = 'data-src';
    if (this.hasAttribute(attr)) {
      let dataPath = this.getAttribute(attr);
      if (dataPath) {
        if (dataPath.includes('.json')) {
          data = (await (await window.fetch(dataPath))).json();
        } else if (dataPath.includes('.js')) {
          let ap = this.getAbsolutePath(dataPath);
          data = (await import(ap)).default;
        }
      }
    }
    return data;
  }

  /**
   * 
   * @param {String} html 
   */
  async applyOuterHTML(html) {
    let data = await this.getData();
    if (data) {
      html = applyData(html, data);
    }
    this.outerHTML = html;
  }

  /**
   * 
   * @param {String} src 
   * @returns 
   */
  async importTextAsset(src) {
    return await (await window.fetch(src)).text();
  }

  getTemplate() {
    let template = this.querySelector('template');
    if (!template) {
      let tplId = this.getAttribute('template-id');
      if (tplId) {
        // @ts-ignore
        template = this.getRootNode()?.querySelector(`template[id=${tplId}]`);
      }
    }
    return template;
  }

  getTemplateHTML() {
    return this.getTemplate()?.innerHTML || '';
  }

}
export default X;



