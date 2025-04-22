import { Dom } from "./Dom";
import { escapeHTML, escapeHTMLInObject } from "./escape-html";
import { isJSON } from "./is-json";
import { isURLEncoded } from "./is-url-encoded";

type Props = Record<string, string | object>

export class Component extends HTMLElement {
    props: Props = {}
    
    rootElementTagName: string | null = null
    
    shadow: ShadowRoot

    constructor() {
        super()

        this.shadow = this.attachShadow({ mode: 'open' })

        const coreStyles = Dom.stylesheet('/core.css')
        this.shadow.appendChild(coreStyles)

        Object.keys(this.dataset).forEach(key => {
            let value: string = this.dataset[key] ?? ''

            if (isURLEncoded(value)) {
                value = decodeURIComponent(value)
            }

            if (isJSON(value)) {
                value = escapeHTMLInObject(JSON.parse(value))
            } else if (typeof value === 'string' && key !== 'src') {
                value = escapeHTML(value)
            }

            this.props[key] = value
        });
    }

    propEncode(data: object): string {
        return encodeURIComponent(JSON.stringify(data));
    }

    styles(css: string = ''): string {
        return '';
    }

    template(): string {
        throw new Error(`${this.constructor.name} missing template`);
    }

    events(): void {
        // To be overridden
    }

    rootQuery<K extends keyof HTMLElementTagNameMap>(query: K): HTMLElementTagNameMap[K] | null {
        return document.querySelector(query);
    }

    query<K extends keyof HTMLElementTagNameMap>(query: K): HTMLElementTagNameMap[K] | null {
        return this.shadow.querySelector(query);
    }

    whenClicked(query: string, handler: (event: Event) => void): void {
        this.attachEvents('click', query, handler);
    }

    keyup(query: string, handler: (event: Event) => void): void {
        this.attachEvents('keyup', query, handler);
    }

    keyUpEnter(query: string, handler: (event: Event) => void): void {
        this.attachEvents('keyup:Enter', query, handler);
    }

    attachEvents(
        eventKey: string,
        query: string,
        handler: (event: Event) => void
    ): void {
        this.shadow.querySelectorAll(query).forEach(element => {
            if (eventKey.includes(':')) {
                const [baseEvent, specificKey] = eventKey.split(':');

                element.addEventListener(baseEvent, (e: Event) => {
                    if (
                        e instanceof KeyboardEvent &&
                        e.key === specificKey
                    ) {
                        handler(e);
                    }
                });
            } else {
                element.addEventListener(eventKey, handler);
            }
        });
    }

    scrollToBottom(element: HTMLElement): void {
        requestAnimationFrame(() => {
            element.scrollTo({
                top: element.scrollHeight,
                behavior: 'smooth'
            });
        });
    }

    async before(): Promise<void> {
        // To be optionally overridden
    }

    emit<T>(eventKey: string, detail?: T): void {
        this.dispatchEvent(
            new CustomEvent<T>(eventKey, {
                bubbles: true,
                cancelable: true,
                detail
            })
        );
    }

    connectedCallback(): void {
        this.before().then(() => {
            const style = Dom.style(this.styles());
            this.shadow.appendChild(style);

            const fragment = this.createFragment();
            this.rootElementTagName = fragment.firstElementChild?.tagName.toLowerCase() ?? null;

            this.shadow.appendChild(fragment);
            this.events();
        });
    }

    renderTemplate(template: string, context?: any): string {
        return template.replace(/{{\s*([^}]+)\s*}}/g, (_match, logic) => {
            const run = new Function(logic.trim());
            return run.bind(this)();
        });
    }

    createFragment(): DocumentFragment {
        return document.createRange().createContextualFragment(
            this.renderTemplate(this.template())
        );
    }

    refresh(): void {
        const newFragment = this.createFragment();
        const oldRoot = this.rootElementTagName
            ? this.shadow.querySelector(this.rootElementTagName)
            : null;

        if (oldRoot) {
            this.shadow.replaceChild(newFragment, oldRoot);
        }
    }

    appendTemplate(element: Element, template: string): void {
        element.insertAdjacentHTML('beforeend', template);
    }

    static load(): void {
        customElements.define(
            this.getCustomElementName(),
            this
        );
    }

    static getCustomElementName(): string {
        return this.name
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .toLowerCase();
    }
}
