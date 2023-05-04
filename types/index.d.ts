declare module "app/graph/Vertex" {
    export class Vertex {
        constructor(src?: Partial<Vertex>);
        uid: string;
        label: string;
        edges: string[];
        value: any;
        timestamp: number;
    }
}
declare module "config" {
    export function getCfgVal(key: string): string;
    export const CFG_KEY: "JAM_X_CFG";
    export const DEFAULT_PATH: "https://esm.sh/@symbiotejs/symbiote@2.0.0-alpha.2/";
    export const SYM_PATH_KEY: "symbiote_index";
    const _default: SymConfig;
    export default _default;
    export type SymConfig = {
        symbiote_index: string;
    };
}
declare module "core/X" {
    export const X: typeof import("@symbiotejs/symbiote/core").BaseComponent;
    export const Data: typeof import("@symbiotejs/symbiote/core").Data;
    export const UID: typeof import("@symbiotejs/symbiote/core").UID;
}
declare module "app/graph/Cluster" {
    export class Cluster {
        uid: string;
        store: {
            [x: string]: Vertex;
        };
        private __timeoutsMap;
        private __cbMap;
        private __labelSet;
        __dataMap: {
            [x: string]: typeof import("@symbiotejs/symbiote/core").Data;
        };
        addVtx(vtx: Vertex, id?: string): string;
        addValue(data: any, label: string, id?: string): string;
        getVtx(id: string): Vertex;
        getVtxList(idArr: string[]): Vertex[];
        getValue(id: string): any;
        getValueList(idArr: string[]): any[];
        getData(id: string): typeof import("@symbiotejs/symbiote/core").Data;
        clearData(id: string): void;
        update(id: string, newData: any, dispatcher?: any): void;
        setProperty(id: string, propertyName: string, propertyValue: any, dispatcher?: any): void;
        deleteVtx(id: string): void;
        cloneVtx(id: string, hardId?: string): string;
        link(id: string, conId: string): void;
        linkDuplex(id: string, conId: string): void;
        unlink(vtxId: string, linkId: string): void;
        get keys(): string[];
        search(query: string, label?: string, fieldName?: string): string[];
        getEdgesByLabel(id: string): any;
        getLabeledVtxList(label: string): string[];
        removeByLabel(label: string): void;
        subscribeOnLabel(label: string, callback: (list: string[]) => void, init?: boolean): {
            remove: () => void;
        };
        debounce(callback: Function, args: any[]): void;
        getLabels(): string[];
        hasLabel(label: string): boolean;
        notify(label: string): void;
        filter(checkFn: (vtx: Vertex) => boolean, inputList?: string[]): string[];
        getStoreDataJson(): string;
        clearStore(): void;
        initStoreData(json: string): void;
    }
    import { Vertex } from "app/graph/Vertex";
}
declare module "app/index" {
    export { Vertex } from "./graph/Vertex.js";
    export { Cluster } from "./graph/Cluster.js";
}
declare module "core/index" {
    export { X, Data, UID } from "./X.js";
}
declare module "lowcode/x-dwa" {
    const XDWA_base: typeof import("@symbiotejs/symbiote/core").BaseComponent;
    export class XDWA extends XDWA_base {
        constructor();
    }
    export default XDWA;
}
declare module "lowcode/x-build" {
    const XBuild_base: typeof import("@symbiotejs/symbiote/core").BaseComponent;
    export class XBuild extends XBuild_base {
        constructor();
    }
    export default XBuild;
}
declare module "lowcode/x-component" {
    const XComponent_base: typeof import("@symbiotejs/symbiote/core").BaseComponent;
    export class XComponent extends XComponent_base {
        constructor();
        comClass: {
            new (...params: any[]): {
                connectedCallback(): void;
                renderShadow: boolean;
                accessKey: string;
                readonly accessKeyLabel: string;
                autocapitalize: string;
                dir: string;
                draggable: boolean;
                hidden: boolean;
                inert: boolean;
                innerText: string;
                lang: string;
                readonly offsetHeight: number;
                readonly offsetLeft: number;
                readonly offsetParent: Element;
                readonly offsetTop: number;
                readonly offsetWidth: number;
                outerText: string;
                spellcheck: boolean;
                title: string;
                translate: boolean;
                attachInternals(): ElementInternals;
                click(): void;
                addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
                addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
                removeEventListener<K_1 extends keyof HTMLElementEventMap>(type: K_1, listener: (this: HTMLElement, ev: HTMLElementEventMap[K_1]) => any, options?: boolean | EventListenerOptions): void;
                removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
                readonly attributes: NamedNodeMap;
                readonly classList: DOMTokenList;
                className: string;
                readonly clientHeight: number;
                readonly clientLeft: number;
                readonly clientTop: number;
                readonly clientWidth: number;
                id: string;
                readonly localName: string;
                readonly namespaceURI: string;
                onfullscreenchange: (this: Element, ev: Event) => any;
                onfullscreenerror: (this: Element, ev: Event) => any;
                outerHTML: string;
                readonly ownerDocument: Document;
                readonly part: DOMTokenList;
                readonly prefix: string;
                readonly scrollHeight: number;
                scrollLeft: number;
                scrollTop: number;
                readonly scrollWidth: number;
                readonly shadowRoot: ShadowRoot;
                slot: string;
                readonly tagName: string;
                attachShadow(init: ShadowRootInit): ShadowRoot;
                checkVisibility(options?: CheckVisibilityOptions): boolean;
                closest<K_2 extends keyof HTMLElementTagNameMap>(selector: K_2): HTMLElementTagNameMap[K_2];
                closest<K_3 extends keyof SVGElementTagNameMap>(selector: K_3): SVGElementTagNameMap[K_3];
                closest<K_4 extends keyof MathMLElementTagNameMap>(selector: K_4): MathMLElementTagNameMap[K_4];
                closest<E extends Element = Element>(selectors: string): E;
                getAttribute(qualifiedName: string): string;
                getAttributeNS(namespace: string, localName: string): string;
                getAttributeNames(): string[];
                getAttributeNode(qualifiedName: string): Attr;
                getAttributeNodeNS(namespace: string, localName: string): Attr;
                getBoundingClientRect(): DOMRect;
                getClientRects(): DOMRectList;
                getElementsByClassName(classNames: string): HTMLCollectionOf<Element>;
                getElementsByTagName<K_5 extends keyof HTMLElementTagNameMap>(qualifiedName: K_5): HTMLCollectionOf<HTMLElementTagNameMap[K_5]>;
                getElementsByTagName<K_6 extends keyof SVGElementTagNameMap>(qualifiedName: K_6): HTMLCollectionOf<SVGElementTagNameMap[K_6]>;
                getElementsByTagName<K_7 extends keyof MathMLElementTagNameMap>(qualifiedName: K_7): HTMLCollectionOf<MathMLElementTagNameMap[K_7]>;
                getElementsByTagName<K_8 extends keyof HTMLElementDeprecatedTagNameMap>(qualifiedName: K_8): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K_8]>;
                getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
                getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): HTMLCollectionOf<HTMLElement>;
                getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
                getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1998/Math/MathML", localName: string): HTMLCollectionOf<MathMLElement>;
                getElementsByTagNameNS(namespace: string, localName: string): HTMLCollectionOf<Element>;
                hasAttribute(qualifiedName: string): boolean;
                hasAttributeNS(namespace: string, localName: string): boolean;
                hasAttributes(): boolean;
                hasPointerCapture(pointerId: number): boolean;
                insertAdjacentElement(where: InsertPosition, element: Element): Element;
                insertAdjacentHTML(position: InsertPosition, text: string): void;
                insertAdjacentText(where: InsertPosition, data: string): void;
                matches(selectors: string): boolean;
                releasePointerCapture(pointerId: number): void;
                removeAttribute(qualifiedName: string): void;
                removeAttributeNS(namespace: string, localName: string): void;
                removeAttributeNode(attr: Attr): Attr;
                requestFullscreen(options?: FullscreenOptions): Promise<void>;
                requestPointerLock(): void;
                scroll(options?: ScrollToOptions): void;
                scroll(x: number, y: number): void;
                scrollBy(options?: ScrollToOptions): void;
                scrollBy(x: number, y: number): void;
                scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
                scrollTo(options?: ScrollToOptions): void;
                scrollTo(x: number, y: number): void;
                setAttribute(qualifiedName: string, value: string): void;
                setAttributeNS(namespace: string, qualifiedName: string, value: string): void;
                setAttributeNode(attr: Attr): Attr;
                setAttributeNodeNS(attr: Attr): Attr;
                setPointerCapture(pointerId: number): void;
                toggleAttribute(qualifiedName: string, force?: boolean): boolean;
                webkitMatchesSelector(selectors: string): boolean;
                readonly baseURI: string;
                readonly childNodes: NodeListOf<ChildNode>;
                readonly firstChild: ChildNode;
                readonly isConnected: boolean;
                readonly lastChild: ChildNode;
                readonly nextSibling: ChildNode;
                readonly nodeName: string;
                readonly nodeType: number;
                nodeValue: string;
                readonly parentElement: HTMLElement;
                readonly parentNode: ParentNode;
                readonly previousSibling: ChildNode;
                textContent: string;
                appendChild<T extends Node>(node: T): T;
                cloneNode(deep?: boolean): Node;
                compareDocumentPosition(other: Node): number;
                contains(other: Node): boolean;
                getRootNode(options?: GetRootNodeOptions): Node;
                hasChildNodes(): boolean;
                insertBefore<T_1 extends Node>(node: T_1, child: Node): T_1;
                isDefaultNamespace(namespace: string): boolean;
                isEqualNode(otherNode: Node): boolean;
                isSameNode(otherNode: Node): boolean;
                lookupNamespaceURI(prefix: string): string;
                lookupPrefix(namespace: string): string;
                normalize(): void;
                removeChild<T_2 extends Node>(child: T_2): T_2;
                replaceChild<T_3 extends Node>(node: Node, child: T_3): T_3;
                readonly ELEMENT_NODE: 1;
                readonly ATTRIBUTE_NODE: 2;
                readonly TEXT_NODE: 3;
                readonly CDATA_SECTION_NODE: 4;
                readonly ENTITY_REFERENCE_NODE: 5;
                readonly ENTITY_NODE: 6;
                readonly PROCESSING_INSTRUCTION_NODE: 7;
                readonly COMMENT_NODE: 8;
                readonly DOCUMENT_NODE: 9;
                readonly DOCUMENT_TYPE_NODE: 10;
                readonly DOCUMENT_FRAGMENT_NODE: 11;
                readonly NOTATION_NODE: 12;
                readonly DOCUMENT_POSITION_DISCONNECTED: 1;
                readonly DOCUMENT_POSITION_PRECEDING: 2;
                readonly DOCUMENT_POSITION_FOLLOWING: 4;
                readonly DOCUMENT_POSITION_CONTAINS: 8;
                readonly DOCUMENT_POSITION_CONTAINED_BY: 16;
                readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32;
                dispatchEvent(event: Event): boolean;
                dispatchEvent(event: Event): boolean;
                ariaAtomic: string;
                ariaAutoComplete: string;
                ariaBusy: string;
                ariaChecked: string;
                ariaColCount: string;
                ariaColIndex: string;
                ariaColSpan: string;
                ariaCurrent: string;
                ariaDisabled: string;
                ariaExpanded: string;
                ariaHasPopup: string;
                ariaHidden: string;
                ariaInvalid: string;
                ariaKeyShortcuts: string;
                ariaLabel: string;
                ariaLevel: string;
                ariaLive: string;
                ariaModal: string;
                ariaMultiLine: string;
                ariaMultiSelectable: string;
                ariaOrientation: string;
                ariaPlaceholder: string;
                ariaPosInSet: string;
                ariaPressed: string;
                ariaReadOnly: string;
                ariaRequired: string;
                ariaRoleDescription: string;
                ariaRowCount: string;
                ariaRowIndex: string;
                ariaRowSpan: string;
                ariaSelected: string;
                ariaSetSize: string;
                ariaSort: string;
                ariaValueMax: string;
                ariaValueMin: string;
                ariaValueNow: string;
                ariaValueText: string;
                role: string;
                animate(keyframes: Keyframe[] | PropertyIndexedKeyframes, options?: number | KeyframeAnimationOptions): Animation;
                getAnimations(options?: GetAnimationsOptions): Animation[];
                after(...nodes: (string | Node)[]): void;
                before(...nodes: (string | Node)[]): void;
                remove(): void;
                replaceWith(...nodes: (string | Node)[]): void;
                innerHTML: string;
                readonly nextElementSibling: Element;
                readonly previousElementSibling: Element;
                readonly childElementCount: number;
                readonly children: HTMLCollection;
                readonly firstElementChild: Element;
                readonly lastElementChild: Element;
                append(...nodes: (string | Node)[]): void;
                prepend(...nodes: (string | Node)[]): void;
                querySelector<K_9 extends keyof HTMLElementTagNameMap>(selectors: K_9): HTMLElementTagNameMap[K_9];
                querySelector<K_10 extends keyof SVGElementTagNameMap>(selectors: K_10): SVGElementTagNameMap[K_10];
                querySelector<K_11 extends keyof MathMLElementTagNameMap>(selectors: K_11): MathMLElementTagNameMap[K_11];
                querySelector<K_12 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_12): HTMLElementDeprecatedTagNameMap[K_12];
                querySelector<E_1 extends Element = Element>(selectors: string): E_1;
                querySelectorAll<K_13 extends keyof HTMLElementTagNameMap>(selectors: K_13): NodeListOf<HTMLElementTagNameMap[K_13]>;
                querySelectorAll<K_14 extends keyof SVGElementTagNameMap>(selectors: K_14): NodeListOf<SVGElementTagNameMap[K_14]>;
                querySelectorAll<K_15 extends keyof MathMLElementTagNameMap>(selectors: K_15): NodeListOf<MathMLElementTagNameMap[K_15]>;
                querySelectorAll<K_16 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_16): NodeListOf<HTMLElementDeprecatedTagNameMap[K_16]>;
                querySelectorAll<E_2 extends Element = Element>(selectors: string): NodeListOf<E_2>;
                replaceChildren(...nodes: (string | Node)[]): void;
                readonly assignedSlot: HTMLSlotElement;
                readonly style: CSSStyleDeclaration;
                contentEditable: string;
                enterKeyHint: string;
                inputMode: string;
                readonly isContentEditable: boolean;
                onabort: (this: GlobalEventHandlers, ev: UIEvent) => any;
                onanimationcancel: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
                onanimationend: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
                onanimationiteration: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
                onanimationstart: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
                onauxclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
                onbeforeinput: (this: GlobalEventHandlers, ev: InputEvent) => any;
                onblur: (this: GlobalEventHandlers, ev: FocusEvent) => any;
                oncancel: (this: GlobalEventHandlers, ev: Event) => any;
                oncanplay: (this: GlobalEventHandlers, ev: Event) => any;
                oncanplaythrough: (this: GlobalEventHandlers, ev: Event) => any;
                onchange: (this: GlobalEventHandlers, ev: Event) => any;
                onclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
                onclose: (this: GlobalEventHandlers, ev: Event) => any;
                oncontextmenu: (this: GlobalEventHandlers, ev: MouseEvent) => any;
                oncopy: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
                oncuechange: (this: GlobalEventHandlers, ev: Event) => any;
                oncut: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
                ondblclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
                ondrag: (this: GlobalEventHandlers, ev: DragEvent) => any;
                ondragend: (this: GlobalEventHandlers, ev: DragEvent) => any;
                ondragenter: (this: GlobalEventHandlers, ev: DragEvent) => any;
                ondragleave: (this: GlobalEventHandlers, ev: DragEvent) => any;
                ondragover: (this: GlobalEventHandlers, ev: DragEvent) => any;
                ondragstart: (this: GlobalEventHandlers, ev: DragEvent) => any;
                ondrop: (this: GlobalEventHandlers, ev: DragEvent) => any;
                ondurationchange: (this: GlobalEventHandlers, ev: Event) => any;
                onemptied: (this: GlobalEventHandlers, ev: Event) => any;
                onended: (this: GlobalEventHandlers, ev: Event) => any;
                onerror: OnErrorEventHandlerNonNull;
                onfocus: (this: GlobalEventHandlers, ev: FocusEvent) => any;
                onformdata: (this: GlobalEventHandlers, ev: FormDataEvent) => any;
                ongotpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
                oninput: (this: GlobalEventHandlers, ev: Event) => any;
                oninvalid: (this: GlobalEventHandlers, ev: Event) => any;
                onkeydown: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
                onkeypress: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
                onkeyup: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
                onload: (this: GlobalEventHandlers, ev: Event) => any;
                onloadeddata: (this: GlobalEventHandlers, ev: Event) => any;
                onloadedmetadata: (this: GlobalEventHandlers, ev: Event) => any;
                onloadstart: (this: GlobalEventHandlers, ev: Event) => any;
                onlostpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
                onmousedown: (this: GlobalEventHandlers, ev: MouseEvent) => any;
                onmouseenter: (this: GlobalEventHandlers, ev: MouseEvent) => any;
                onmouseleave: (this: GlobalEventHandlers, ev: MouseEvent) => any;
                onmousemove: (this: GlobalEventHandlers, ev: MouseEvent) => any;
                onmouseout: (this: GlobalEventHandlers, ev: MouseEvent) => any;
                onmouseover: (this: GlobalEventHandlers, ev: MouseEvent) => any;
                onmouseup: (this: GlobalEventHandlers, ev: MouseEvent) => any;
                onpaste: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
                onpause: (this: GlobalEventHandlers, ev: Event) => any;
                onplay: (this: GlobalEventHandlers, ev: Event) => any;
                onplaying: (this: GlobalEventHandlers, ev: Event) => any;
                onpointercancel: (this: GlobalEventHandlers, ev: PointerEvent) => any;
                onpointerdown: (this: GlobalEventHandlers, ev: PointerEvent) => any;
                onpointerenter: (this: GlobalEventHandlers, ev: PointerEvent) => any;
                onpointerleave: (this: GlobalEventHandlers, ev: PointerEvent) => any;
                onpointermove: (this: GlobalEventHandlers, ev: PointerEvent) => any;
                onpointerout: (this: GlobalEventHandlers, ev: PointerEvent) => any;
                onpointerover: (this: GlobalEventHandlers, ev: PointerEvent) => any;
                onpointerup: (this: GlobalEventHandlers, ev: PointerEvent) => any;
                onprogress: (this: GlobalEventHandlers, ev: ProgressEvent<EventTarget>) => any;
                onratechange: (this: GlobalEventHandlers, ev: Event) => any;
                onreset: (this: GlobalEventHandlers, ev: Event) => any;
                onresize: (this: GlobalEventHandlers, ev: UIEvent) => any;
                onscroll: (this: GlobalEventHandlers, ev: Event) => any;
                onsecuritypolicyviolation: (this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any;
                onseeked: (this: GlobalEventHandlers, ev: Event) => any;
                onseeking: (this: GlobalEventHandlers, ev: Event) => any;
                onselect: (this: GlobalEventHandlers, ev: Event) => any;
                onselectionchange: (this: GlobalEventHandlers, ev: Event) => any;
                onselectstart: (this: GlobalEventHandlers, ev: Event) => any;
                onslotchange: (this: GlobalEventHandlers, ev: Event) => any;
                onstalled: (this: GlobalEventHandlers, ev: Event) => any;
                onsubmit: (this: GlobalEventHandlers, ev: SubmitEvent) => any;
                onsuspend: (this: GlobalEventHandlers, ev: Event) => any;
                ontimeupdate: (this: GlobalEventHandlers, ev: Event) => any;
                ontoggle: (this: GlobalEventHandlers, ev: Event) => any;
                ontouchcancel?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
                ontouchend?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
                ontouchmove?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
                ontouchstart?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
                ontransitioncancel: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
                ontransitionend: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
                ontransitionrun: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
                ontransitionstart: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
                onvolumechange: (this: GlobalEventHandlers, ev: Event) => any;
                onwaiting: (this: GlobalEventHandlers, ev: Event) => any;
                onwebkitanimationend: (this: GlobalEventHandlers, ev: Event) => any;
                onwebkitanimationiteration: (this: GlobalEventHandlers, ev: Event) => any;
                onwebkitanimationstart: (this: GlobalEventHandlers, ev: Event) => any;
                onwebkittransitionend: (this: GlobalEventHandlers, ev: Event) => any;
                onwheel: (this: GlobalEventHandlers, ev: WheelEvent) => any;
                autofocus: boolean;
                readonly dataset: DOMStringMap;
                nonce?: string;
                tabIndex: number;
                blur(): void;
                focus(options?: FocusOptions): void;
            };
        };
    }
    export default XComponent;
}
declare module "lowcode/x-style" {
    const XStyle_base: typeof import("@symbiotejs/symbiote/core").BaseComponent;
    export class XStyle extends XStyle_base {
        constructor();
    }
    export default XStyle;
}
declare module "lowcode/x-data" {
    const XData_base: typeof import("@symbiotejs/symbiote/core").BaseComponent;
    export class XData extends XData_base {
        constructor();
    }
    export default XData;
}
declare module "lowcode/x-handler" {
    const XHandler_base: typeof import("@symbiotejs/symbiote/core").BaseComponent;
    export class XHandler extends XHandler_base {
        constructor();
    }
    export default XHandler;
}
declare module "lowcode/index" {
    export * from "lowcode/x-dwa";
    export * from "lowcode/x-build";
    export * from "lowcode/x-component";
    export * from "lowcode/x-style";
    export * from "lowcode/x-data";
    export * from "lowcode/x-handler";
}
declare module "ui/x-data-ui" {
    const XDataUi_base: typeof import("@symbiotejs/symbiote/core").BaseComponent;
    export class XDataUi extends XDataUi_base {
        constructor();
    }
    export {};
}
declare module "ui/index" {
    export { XDataUi } from "./x-data-ui.js";
}
declare module "index" {
    export * from "app";
    export * from "core";
    export * from "lowcode";
    export * from "ui";
}
