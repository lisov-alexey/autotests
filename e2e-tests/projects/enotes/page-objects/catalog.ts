import {addProductToBasket} from "../../../helpers/api-helper";
import {browser} from "@wdio/globals";

class CatalogPage {
    async addProductsById(id: number[], count: number, url: string): Promise<void> {
        for (let i = 0; i < id.length; i++){
            await addProductToBasket(id[i], count, url);
        }
        await browser.refresh();
    }
}

export default new CatalogPage();
