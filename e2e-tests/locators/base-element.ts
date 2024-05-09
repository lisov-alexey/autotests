import { ChainablePromiseElement } from 'webdriverio';

export class BaseElement {
  readonly locator: ChainablePromiseElement<WebdriverIO.Element>;
  readonly name: string;

  constructor(locator: ChainablePromiseElement<WebdriverIO.Element>, name?: string) {
    this.locator = locator;
    this.name = `${name}`;
  }

  get getLocator(): ChainablePromiseElement<WebdriverIO.Element> {
    return this.locator;
  }
}
