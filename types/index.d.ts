declare module "core/PubSub" {
    export class PubSub {
        static globalStore: Map<any, any>;
        static warn(actionName: string, prop: string): void;
        static registerCtx(schema: {
            [x: string]: any;
        }, uid?: any): PubSub;
        static deleteCtx(uid: any): void;
        static getCtx(uid: any, notify?: boolean): PubSub;
        constructor(schema: {
            [x: string]: any;
        });
        store: {
            [x: string]: any;
        };
        private _storeIsProxy;
        callbackMap: any;
        read(prop: string): any;
        has(prop: string): boolean;
        add(prop: string, val: unknown, rewrite?: boolean): void;
        pub<T>(prop: string, val: T): void;
        multiPub(updObj: {
            [x: string]: any;
        }): void;
        notify(prop: string): void;
        sub(prop: string, callback: Function, init?: boolean): {
            remove: () => void;
            callback: Function;
        };
    }
}
declare module "app/Router" {
    export class Router {
        private static _print;
        static setDefaultTitle(title: string): void;
        static setRoutingMap(map: {
            [x: string]: {};
        }): void;
        static set routingEventName(arg: string);
        static get routingEventName(): string;
        static readAddressBar(): {
            route: string;
            options: {};
        };
        static notify(): void;
        static reflect(route: string, options?: {
            [x: string]: any;
        }): void;
        static applyRoute(route: string, options?: {
            [x: string]: any;
        }): void;
        static setSeparator(char: string): void;
        static get separator(): string;
        static createRouterPubSub(ctxName: string, routingMap: {
            [x: string]: {};
        }): PubSub;
        static initPopstateListener(): void;
        static removePopstateListener(): void;
    }
    export namespace Router {
        const defaultTitle: string;
        const defaultRoute: string;
        const errorRoute: string;
        const __routingEventName: string;
        const _separator: string;
        function __onPopstate(): void;
        const appMap: any;
    }
    import { PubSub } from "core/PubSub";
}
declare module "app/IDB" {
    export const READY_EVENT_NAME: "idb-store-ready";
    export class IDB {
        static get readyEventName(): string;
        static open(dbName?: string, storeName?: string): DbInstance;
        private static _reg;
        static clear(dbName: string): void;
    }
    class DbInstance {
        constructor(dbName: string, storeName: string);
        private _notifyWhenReady;
        private get _updEventName();
        private _getUpdateEvent;
        private _notifySubscribers;
        name: string;
        storeName: string;
        version: number;
        request: IDBOpenDBRequest;
        db: any;
        objStore: any;
        private _subscriptionsMap;
        private _updateHandler;
        private _localUpdateHandler;
        read(key: string | null): Promise<any>;
        write(key: string, value: any, silent?: boolean): Promise<any>;
        delete(key: string, silent?: boolean): Promise<any>;
        getAll(): Promise<any>;
        subscribe(key: string, callback: (val: any) => void): {
            remove: () => void;
        };
        stop(): void;
    }
    export {};
}
declare module "utils/UID" {
    export class UID {
        static generate(pattern?: string): string;
    }
}
declare module "app/graph" {
    export class Vertex {
        constructor(src?: Partial<Vertex>);
        uid: string;
        label: string;
        edges: string[];
        value: any;
        timestamp: number;
    }
    export class Cluster {
        store: {
            [x: string]: Vertex;
        };
        private __timeoutsMap;
        private __cbMap;
        private __labelSet;
        addVtx(vtx: Vertex, id?: string): string;
        addValue(data: any, label?: string, id?: string): string;
        getVtx(id: string): Vertex;
        getVtxList(idArr: string[]): Vertex[];
        getValue(id: string): any;
        getValueList(idArr: string[]): any[];
        update(id: string, newData: any, dispatcher?: any): void;
        setProperty(id: string, propertyName: string, propertyValue: any, dispatcher?: any): void;
        deleteVtx(id: string): void;
        cloneVtx(id: string, hardId?: string): string;
        link(id: string, conId: string): void;
        linkDuplex(id: string, conId: string): void;
        unlink(vtxId: string, linkId: string): void;
        get keys(): string[];
        search(query: string, fieldName?: string): string[];
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
        filter(checkFn: (vtx: Vertex) => boolean, inputList?: string[]): any[];
        getStoreDataJson(): string;
        clearStore(): void;
        initStoreData(json: string): void;
    }
}
declare module "app/index" {
    export { Router } from "./Router.js";
    export { IDB } from "./IDB.js";
    export { Vertex, Cluster } from "./graph.js";
}
declare module "core/DICT" {
    export type DICT = string;
    export const DICT: Readonly<{
        BIND_ATTR: string;
        ATTR_BIND_PRFX: string;
        EXT_CTX_PRFX: string;
        NAMED_CTX_SPLTR: string;
        CTX_NAME_ATTR: string;
        CTX_OWNER_ATTR: string;
        CSS_CTX_PROP: string;
        EL_REF_ATTR: string;
        AUTO_TAG_PRFX: string;
        REPEAT_ATTR: string;
        REPEAT_ITEM_TAG_ATTR: string;
        SET_LATER_KEY: string;
        USE_TPL: string;
        ROOT_STYLE_ATTR_NAME: string;
    }>;
}
declare module "utils/setNestedProp" {
    export function setNestedProp(parent: any, path: string, value: any): boolean;
}
declare module "utils/kebabToCamel" {
    export function kebabToCamel(string: string): string;
}
declare module "core/repeatProcessor" {
    export function repeatProcessor<T extends import("core/X").X<any>>(fr: DocumentFragment, fnCtx: T): void;
}
declare module "core/tpl-processors" {
    var _default: (<T extends import("core/X").X<any>>(fr: DocumentFragment, fnCtx: T) => void)[];
    export default _default;
}
declare module "core/X" {
    export class X<S> extends HTMLElement {
        static template: string;
        private static __parseProp;
        static reg(tagName?: string, isAlias?: boolean): void;
        static get is(): string;
        static bindAttributes(desc: {
            [x: string]: string;
        }): void;
        static set shadowStyles(arg: string);
        static set rootStyles(arg: string);
        constructor();
        get X(): typeof X;
        initCallback(): void;
        private __initCallback;
        private __initialized;
        render(template?: string | DocumentFragment, shadow?: boolean): void;
        addTemplateProcessor<T extends X<any>>(processorFn: (fr: DocumentFragment | T, fnCtx: T) => void): void;
        init$: S;
        cssInit$: {
            [x: string]: any;
        };
        tplProcessors: Set<(fr: DocumentFragment | X<any>, fnCtx: unknown) => void>;
        ref: {
            [x: string]: any;
        };
        allSubs: Set<any>;
        pauseRender: boolean;
        renderShadow: boolean;
        readyToDestroy: boolean;
        processInnerHtml: boolean;
        allowCustomTemplate: boolean;
        ctxOwner: boolean;
        get autoCtxName(): string;
        private __autoCtxName;
        get cssCtxName(): string;
        get ctxName(): string;
        private __cachedCtxName;
        get localCtx(): PubSub;
        private __localCtx;
        get nodeCtx(): PubSub;
        sub<T_1 extends keyof S>(prop: T_1, handler: (value: S[T_1]) => void, init?: boolean): void;
        notify(prop: string): void;
        has(prop: string): boolean;
        add<T_2 extends keyof S>(prop: string, val: S[T_2], rewrite?: boolean): void;
        add$(obj: Partial<S>, rewrite?: boolean): void;
        get $(): S;
        private __stateProxy;
        set$(kvObj: Partial<S>, forcePrimitives?: boolean): void;
        private get __ctxOwner();
        private __initDataCtx;
        private __dataCtxInitialized;
        connectedCallback(): void;
        initChildren: ChildNode[];
        connectedOnce: boolean;
        destroyCallback(): void;
        disconnectedCallback(): void;
        private __disconnectTimeout;
        attributeChangedCallback(name: any, oldVal: any, newVal: any): void;
        getCssData(propName: string, silentCheck?: boolean): any;
        private __cssDataCache;
        private __computedStyle;
        private __extractCssName;
        updateCssData: () => void;
        private __initStyleAttrObserver;
        bindCssData(propName: string, initValue?: any): void;
        private __boundCssProps;
        dropCssDataCache(): void;
        defineAccessor(propName: string, handler?: Function, isAsync?: boolean): void;
    }
    import { PubSub } from "core/PubSub";
}
declare module "core/index" {
    export { X } from "./X.js";
    export { PubSub } from "./PubSub.js";
}
declare module "ext/jam-dwa" {
    export class JamDwa extends X<any> {
        constructor();
    }
    import { X } from "core/X";
}
declare module "ext/index" {
    export { JamDwa } from "./jam-dwa.js";
}
declare module "utils/dom-helpers" {
    export function applyStyles<T extends HTMLElement | SVGElement>(el: T, styleMap: StyleMap): void;
    export function applyAttributes<T extends HTMLElement | SVGElement>(el: T, attrMap: AttrMap): void;
    export function create(desc?: ElementDescriptor): any;
    export type StyleMap = {
        [x: string]: string | number | boolean;
    };
    export type AttrMap = {
        [x: string]: string | number | boolean;
    };
    export type PropMap = {
        [x: string]: any;
    };
    export type ElementDescriptor = {
        tag?: string;
        attributes?: AttrMap;
        styles?: StyleMap;
        properties?: PropMap;
        processors?: Function[];
        children?: ElementDescriptor[];
    };
}
declare module "utils/index" {
    export { UID } from "./UID.js";
    export { setNestedProp } from "./setNestedProp.js";
    export { kebabToCamel } from "./kebabToCamel.js";
    export { applyStyles, applyAttributes, create } from "./dom-helpers.js";
}
declare module "index" {
    export * from "app";
    export * from "core";
    export * from "ext";
    export * from "utils";
}
