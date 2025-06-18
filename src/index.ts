import 'styles.css'
import { COMPONENTS } from 'config'

for (const [constructor, tag] of COMPONENTS) {
    customElements.define(tag, constructor)
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.append(document.createElement('app-root'))
})