import type { LitElement } from 'lit'

/**
 * Create the element with the given attributes
 */
export async function createEl<T extends LitElement>(
  tagName: string,
  attributes?: Record<string, any>,
  options: { append: boolean; waitForUpdate: boolean } = { append: true, waitForUpdate: true }
) {
  const el = document.createElement(tagName)
  for (const key in attributes) {
    el.setAttribute(key, attributes[key])
  }

  if (options.append) {
    document.body.appendChild(el)
  }

  /**
   * Wait for the element to be rendered
   */
  if (options.waitForUpdate) {
    await (el as LitElement).updateComplete
  }

  return el as T
}
