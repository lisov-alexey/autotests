import { urls } from '../../../data/enotes/urls';
import {browser} from "@wdio/globals";
import CatalogPage from "../page-objects/catalog";
import AuthorizationPage from "../page-objects/authorization";
import BasketPage from "../page-objects/basket";
import {data} from "../../../data/enotes/products";
import {users} from "../../../data/enotes/users";
import {buttons} from "../../../data/enotes/buttons";

const idOneNonPromotionalProduct = [2];
const idOnePromotionalProduct = [1];
const idEightDifferentProducts = [2,3,4,5,6,7,8,9];
const idNineDifferentProducts = [1,2,3,4,5,6,7,8,9];
const oneProduct = 1;
const nineProducts = 9;
const button = buttons.buttonName;
const products = data.products;

describe('Checking the transition to basket', () => {
    beforeAll(async () => {
        await browser.url(urls.loginPageEnotes);
        await AuthorizationPage.login(users.testUser.login, users.testUser.password);
        await BasketPage.basketContainerButton.waitUntilElementIsVisible();
    });

    beforeEach(async () => {
        await BasketPage.emptyBasket(button.emptyBasket, 0, urls.loginPageEnotes);
    });

    it('Go to empty basket, case-1', async () => {
        await BasketPage.openBasketPopup();
        await BasketPage.goToBasket(button.goToBasket);
        await BasketPage.checkingOpenedUrl(urls.basketPageEnotes);
    });

    it('Go to basket with 1 non-promotional product, case-2', async () => {
        await CatalogPage.addProductsById(idOneNonPromotionalProduct, oneProduct, urls.addProductBasket);
        await BasketPage.basketCountItems(oneProduct).waitUntilElementIsVisible()
        await BasketPage.openBasketPopup();
        await BasketPage.checkFieldsValueInCard(products, idOneNonPromotionalProduct, 1);
        await BasketPage.goToBasket(button.goToBasket);
        await BasketPage.checkingOpenedUrl(urls.basketPageEnotes);
    });

    it('Go to basket with 1 promotional product, case-3', async () => {
        await CatalogPage.addProductsById(idOnePromotionalProduct, oneProduct, urls.addProductBasket);
        await BasketPage.basketCountItems(oneProduct).waitUntilElementIsVisible()
        await BasketPage.openBasketPopup();
        await BasketPage.checkFieldsValueInCard(products, idOnePromotionalProduct, 1);
        await BasketPage.goToBasket(button.goToBasket);
        await BasketPage.checkingOpenedUrl(urls.basketPageEnotes);
    });

    it('Go to basket with 9 different products, case-4', async () => {
        await CatalogPage.addProductsById(idOnePromotionalProduct, oneProduct, urls.addProductBasket);
        await CatalogPage.addProductsById(idEightDifferentProducts, oneProduct, urls.addProductBasket);
        await BasketPage.basketCountItems(nineProducts).waitUntilElementIsVisible()
        await BasketPage.openBasketPopup();
        await BasketPage.checkFieldsValueInCard(products, idNineDifferentProducts, oneProduct);
        await BasketPage.goToBasket(button.goToBasket);
        await BasketPage.checkingOpenedUrl(urls.basketPageEnotes);
    });

    it('Go to basket with 9 promotional products of the same name, case-5', async () => {
        await CatalogPage.addProductsById(idOnePromotionalProduct, nineProducts, urls.addProductBasket);
        await BasketPage.basketCountItems(nineProducts).waitUntilElementIsVisible()
        await BasketPage.openBasketPopup();
        await BasketPage.checkFieldsValueInCard(products, idOnePromotionalProduct, nineProducts);
        await BasketPage.goToBasket(button.goToBasket);
        await BasketPage.checkingOpenedUrl(urls.basketPageEnotes);
    });
})
