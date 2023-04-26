import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { useState } from '../../src/index'
import { appState } from './store'

@customElement('my-lit-component')
export class MyLitComponent extends LitElement {
  private state = useState(this, appState)

  render() {
    return html`
      <div>
        <h1>${this.state.name}</h1>
        <p>${this.state.count}</p>
        <button @click=${() => this.state.count++}>Increment</button>
      </div>
    `
  }
}
