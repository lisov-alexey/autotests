import { BaseElement } from './base-element';

export class Block extends BaseElement{
  async waitUntilElementIsVisible(timeout = waitforTimeout): Promise<void> {
    await this.locator.waitForDisplayed({ timeout, timeoutMsg: `Block [${this.name}] is not visible` });
    await console.log(`Expected result: block [${this.name}] is visible`)
  }
}
