import { BaseElement } from './base-element';
import {config} from "../../wdio.conf";

const waitForTimeout = config.waitforTimeout;

export class Button extends BaseElement {
  async click(timeout = waitForTimeout): Promise<void> {
    await this.locator.waitForClickable({ timeout: timeout, timeoutMsg: `Button [${this.name}] is not clickable` });
    await this.locator.click();
    console.log(`Click button: [${this.name}]`);
  }

  async waitUntilElementIsVisible(timeout = waitForTimeout): Promise<void> {
    await this.locator.waitForDisplayed({ timeout: timeout, timeoutMsg: `Button [${this.name}] is not visible` });
    console.log(`Expected result: button [${this.name}] is visible`);
  }

  async waitUntilElementIsInVisible(timeout = waitForTimeout): Promise<void> {
    await this.locator.waitForDisplayed({ timeout: timeout, timeoutMsg: `Button [${this.name}] is still visible`, reverse: true });
    console.log(`Expected result: button [${this.name}] is invisible`);
  }
}
