export class Dom {
    constructor() {
        throw new Error('Dom is a static utility class and cannot be instantiated.')
    }

    public static stylesheet(href: string): HTMLLinkElement
    {
        const element = document.createElement('link')

        element.rel = 'stylesheet'
        element.href = href

        return element
    }

    public static style(css: string): HTMLStyleElement
    {
        const element = document.createElement('style')

        element.textContent = css

        return element
    }
}