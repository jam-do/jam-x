import X from '../core/X.js';

export class XComponent extends X {
  initCallback() {
    let tagName = this.getAttribute('tag');
    if (!tagName) {
      return;
    }
    if (window.customElements.get(tagName)) {
      return;
    }
    let baseTag = this.getAttribute('extends');
    let base = window.customElements.get(baseTag);
    let useShadow = this.hasAttribute('use-shadow') 
      && this.getAttribute('use-shadow') !== 'false';
    this.comClass = class extends (base || X) {
      connectedCallback() {
        this.renderShadow = useShadow;
        // @ts-ignore
        super.connectedCallback();
      }
    }
    let tplId = this.getAttribute('template-id');
    /** @type { Partial<HTMLElement> } */
    let root = this.getRootNode();
    /** @type { HTMLTemplateElement } */
    let tpl = root?.querySelector(`#${tplId}`) || document.querySelector(`#${tplId}`);
    if (tpl) {
      let styles = [...tpl.content.querySelectorAll('style')];
      let cssTxt = '';
      styles.forEach((styleEl) => {
        cssTxt += styleEl.textContent.trim();
        styleEl.remove();
      });
      if (cssTxt && useShadow) {
        // @ts-ignore
        this.comClass.shadowStyles = cssTxt;
      } else if (cssTxt) {
        // @ts-ignore
        this.comClass.rootStyles = cssTxt;
      }
      // @ts-ignore
      this.comClass.template = tpl.innerHTML;
    }
    // @ts-ignore
    this.comClass.reg(tagName);
    this.remove();
  }
}

XComponent.reg('x-component');

export default XComponent;