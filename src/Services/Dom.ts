export class Dom {
    public static div(...classList: string[]): HTMLDivElement {
        const element = document.createElement('div')

        element.classList.add(...classList)

        return element
    }

    public static h1(text: string, ...classList: string[]): HTMLHeadingElement {
        const element = document.createElement('h1')

        element.innerText = text

        element.classList.add(...classList)

        return element
    }
}