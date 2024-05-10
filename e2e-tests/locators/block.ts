import { BaseElement } from './base-element';
import {config} from "../../wdio.conf";

const waitForTimeout = config.waitforTimeout;

export class Block extends BaseElement{
  async waitUntilElementIsVisible(timeout = waitForTimeout): Promise<void> {
    await this.locator.waitForDisplayed({ timeout, timeoutMsg: `Block [${this.name}] is not visible` });
    await console.log(`Expected result: block [${this.name}] is visible`)
  }
}
