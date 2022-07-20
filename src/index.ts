import { proxy, subscribe } from 'valtio/vanilla'
import type { ReactiveController, ReactiveControllerHost } from 'lit'

/**
 * Simple state management system based on Lit Controllers
 * and Valtio ( proxy based store )
 *
 * Usage ( in Lit Element Class context ) :
 *
 * ```ts
 * sc = new StateController(this, defineState({ count: 10, text: 'hello' }))
 * ```
 */
class StateController<State extends Record<string, any>> implements ReactiveController {
  private host: ReactiveControllerHost
  public state: State

  constructor(host: ReactiveControllerHost, state: State) {
    this.host = host
    this.state = state

    subscribe(state, () => this.host.requestUpdate())
  }

  hostConnected() {
    this.host.requestUpdate()
  }
}

/**
 * Syntaxic sugar for only returning the state of the StateController
 */
function useState<State extends Record<string, any>>(host: ReactiveControllerHost, state: State) {
  return new StateController(host, state).state
}

export { proxy as defineState, StateController, useState }
