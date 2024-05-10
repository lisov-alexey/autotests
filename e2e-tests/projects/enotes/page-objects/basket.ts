import { Block } from '../../../locators/block';
import {Button} from "../../../locators/button";
import {browser} from "@wdio/globals";

class BasketPage{
    get basketContainerButton(): Button {
        return new Button($(`#basketContainer`), 'Basket container');
    }

    get basketPopup(): Block {
        return new Block($(`[class="dropdown-menu dropdown-menu-right show"]`), 'Basket popup');
    }

    basketCountItems(count: number): Block {
        return new Block($(`//*[contains(@class,"basket-count-items")]/self::*[contains(text(),"${count}")]`), `Basket includes ${count} items`);
    }

    buttonByName(name: string): Button {
        return new Button($(`//*[contains(@class, "btn")]/self::*[contains(text(), '${name}')]`), `Button with name ${name}`);
    }

    basketProductPropertiesItems(tag: string, property: string): Block {
        return new Block($(`//*[contains(@class,"basket-item-${tag}")]/self::*[contains(text(),"${property}")]`), `Basket product properties ${tag} includes property ${property}`);
    }

    basketPriceBlock(price: string): Block {
        return new Block($(`//*[contains(@class, "basket_price")]/self::*[contains(text(), '${price}')]`), `Basket price includes ${price}`);
    }

    async emptyBasket(buttonName: string, countItem: number, url: string): Promise<void> {
        await browser.url(url);
        await this.basketContainerButton.waitUntilElementIsVisible();
        if (!await this.basketCountItems(countItem).getLocator.isDisplayed()) {
            await this.basketContainerButton.click();
            await this.buttonByName(buttonName).waitUntilElementIsVisible();
            await this.buttonByName(buttonName).click();
            await this.basketCountItems(countItem).waitUntilElementIsVisible()
        }
    }

    async checkFieldsValueInCard(products: object, id: number[], count: number): Promise<void> {
        const totalPrice = [];
        for (let i = 0; i < id.length; i++){
            let productId = `product${id[i]}`;
            await this.basketProductPropertiesItems('title', products[productId].product_name).waitUntilElementIsVisible();
            await this.basketProductPropertiesItems('price', products[productId].product_price * count).waitUntilElementIsVisible();
            await totalPrice.push(products[productId].product_price * count)
        }
        const sumOfProducts = totalPrice.reduce((acc, number) => acc + number, 0);
        await this.basketPriceBlock(sumOfProducts).waitUntilElementIsVisible();

    }

    async openBasketPopup(): Promise<void> {
        await this.basketContainerButton.click();
        await this.basketPopup.waitUntilElementIsVisible();
    }

    async goToBasket(buttonName: string): Promise<void> {
        await this.buttonByName(buttonName).waitUntilElementIsVisible();
        await this.buttonByName(buttonName).click();
    }

    async checkingOpenedUrl(url: string): Promise<void> {
        const currentUrl = await browser.getUrl();
        if (currentUrl === url) {
            console.log(`Opened url ${currentUrl}`);
        } else {
            throw new Error(`Do not opened url ${currentUrl}`);
        }
    }
}

export default new BasketPage();
