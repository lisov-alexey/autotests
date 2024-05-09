import { BaseElement } from './base-element';

export class Input extends BaseElement {
  async fill(text: string): Promise<void> {
    await this.locator.waitForDisplayed({ timeoutMsg: `Input [${this.name}] is not visible` });
    await this.locator.clearValue();
    await this.locator.setValue(text);
    console.log(`Fill input [${this.name}] with text`);
  }
}
