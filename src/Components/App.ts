import { Component } from 'Component'
import { Dom } from 'Services/Dom'

export class App extends Component {

    protected css(): string {
        return /*css*/ `
            .container {
                background-color: #1e2738;
            }
        `
    }

    protected build(): HTMLElement {
        const container = Dom.div('container')

        const p = document.createElement('p')

        p.innerText = 'Hello'

        container.append(p)

        return container
    }
}