import { Component } from 'Component'
import { Dom } from 'Services/Dom'

export class App extends Component {

    protected css(): string {
        return /*css*/ `
            
        `
    }

    protected build(): HTMLElement {
        const container = Dom.div()



        return container
    }
}