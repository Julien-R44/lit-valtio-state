/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */

import { assert, describe, test, vi } from 'vitest'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { defineState, useState } from '../src/index.js'
import { createEl } from '../tests-helpers/index.js'

describe('Basic', () => {
  test('Should display correctly the state value', async () => {
    const state = defineState({ test: 42 })

    @customElement('test-element')
    // @ts-ignore
    class TestElement extends LitElement {
      private state = useState(this, state)

      render() {
        return html`<div>Hello ${this.state.test}</div>`
      }
    }

    const element = await createEl('test-element')
    assert.equal(element.shadowRoot?.textContent, 'Hello 42')
  })

  test('Should re-render after state change', async () => {
    const state = defineState({ test: 42 })

    @customElement('test-element')
    // @ts-ignore
    class TestElement extends LitElement {
      private state = useState(this, state)

      render() {
        return html`<div>Hello ${this.state.test}</div>`
      }
    }

    const element = await createEl('test-element')
    const spy = vi.spyOn(element, 'requestUpdate')

    state.test = 4300
    await new Promise((resolve) => setTimeout(resolve, 0))
    assert.equal(element.shadowRoot?.textContent, 'Hello 4300')
    // @ts-ignore
    assert.deepEqual(spy.callCount, 1)
  })

  test('Should not request update after destroying the element', async () => {
    const state = defineState({ test: 42 })

    @customElement('test-element')
    // @ts-ignore
    class TestElement extends LitElement {
      private state = useState(this, state)

      render() {
        return html`<div>Hello ${this.state.test}</div>`
      }
    }

    const element = await createEl('test-element')
    const spy = vi.spyOn(element, 'requestUpdate')

    element.remove()
    state.test = 4300
    await new Promise((resolve) => setTimeout(resolve, 0))
    // @ts-ignore
    assert.deepEqual(spy.callCount, 0)
  })
})
