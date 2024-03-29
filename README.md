<p align="center">
  <img src="https://user-images.githubusercontent.com/8337858/188330463-526c1448-9405-423c-b3c6-af7927723ca9.png">
</p>

🏪 A simple state management library for [Lit](https://lit.dev), built on top of [valtio](https://valtio.pmnd.rs/).

## Installation
  
```sh
pnpm add @julr/lit-valtio-state
```

## Usage

First you have to define a state, eg. in `stores/app.ts` : 

```ts
import { defineState } from '@julr/lit-valtio-state'

export const appState = defineState({
  count: 0,
  name: 'John Doe'
})
```

Then you can simply use it in your components as follows : 
```ts
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { useState } from '@julr/lit-valtio-state'
import { appState } from '@/stores/app'

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
```

## How it works ? 

This is made possible by [Javascript proxies](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Proxy) and [Lit controllers](https://lit.dev/docs/composition/controllers/)

Basically, the state is a proxy, and the `useState` will create a Lit controller that will subscribe to the state changes. When a change is made, we will ask the host of the controller (so your Lit component), to make a new rendering.

## License

[MIT](./LICENSE.md) License © 2022 [Julien Ripouteau](https://github.com/Julien-R44)
