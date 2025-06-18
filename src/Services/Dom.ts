export class Dom {
    public static div(...classList: string[]): HTMLDivElement {
        const element = document.createElement('div')

        element.classList.add(...classList)

        return element
    }
}