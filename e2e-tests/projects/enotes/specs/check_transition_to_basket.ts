import { urls } from '../../../data/enotes/urls';
import {browser} from "@wdio/globals";
import CatalogPage from "../page-objects/catalog";
import AuthorizationPage from "../page-objects/authorization";
import BasketPage from "../page-objects/basket";
import {data} from "../../../data/enotes/products";
import {users} from "../../../data/enotes/users";
import {buttons} from "../../../data/enotes/buttons";

const oneNonPromotionalProducts = [2];
const onePromotionalProducts = [1];
const eightDifferentProducts = [2,3,4,5,6,7,8,9];
const nineDifferentProducts = [1,2,3,4,5,6,7,8,9];
const button = buttons.buttonName;
const products = data.products;

describe('Checking the transition to basket', () => {
    beforeAll(async () => {
        await browser.url(urls.loginPageEnotes);
        await AuthorizationPage.login(users.testUser.login, users.testUser.password);
        await BasketPage.basketContainerButton.waitUntilElementIsVisible();
    });

    beforeEach(async () => {
        await BasketPage.emptyBasket(button.emptyBasket, 0);
    });

    it('Go to empty basket, case-1', async () => {
        await BasketPage.openBasketPopup();
        await BasketPage.goToBasket(button.goToBasket);
        await BasketPage.checkingOpenedUrl(urls.basketPageEnotes);
    });

    it('Go to basket with 1 non-promotional product, case-2', async () => {
        await CatalogPage.addProductsById(oneNonPromotionalProducts, 1, urls.addProductBasket);
        await BasketPage.basketCountItems(1).waitUntilElementIsVisible()
        await BasketPage.openBasketPopup();
        await BasketPage.checkFieldsValueInCard(products, oneNonPromotionalProducts, 1);
        await BasketPage.goToBasket(button.goToBasket);
        await BasketPage.checkingOpenedUrl(urls.basketPageEnotes);
    });

    it('Go to basket with 1 promotional product, case-3', async () => {
        await CatalogPage.addProductsById(onePromotionalProducts, 1, urls.addProductBasket);
        await BasketPage.basketCountItems(1).waitUntilElementIsVisible()
        await BasketPage.openBasketPopup();
        await BasketPage.checkFieldsValueInCard(products, onePromotionalProducts, 1);
        await BasketPage.goToBasket(button.goToBasket);
        await BasketPage.checkingOpenedUrl(urls.basketPageEnotes);
    });

    it('Go to basket with 9 different products, case-4', async () => {
        await CatalogPage.addProductsById(onePromotionalProducts, 1, urls.addProductBasket);
        await CatalogPage.addProductsById(eightDifferentProducts, 1, urls.addProductBasket);
        await BasketPage.basketCountItems(9).waitUntilElementIsVisible()
        await BasketPage.openBasketPopup();
        await BasketPage.checkFieldsValueInCard(products, nineDifferentProducts, 1);
        await BasketPage.goToBasket(button.goToBasket);
        await BasketPage.checkingOpenedUrl(urls.basketPageEnotes);
    });

    it('Go to basket with 9 promotional products of the same name, case-5', async () => {
        await CatalogPage.addProductsById(onePromotionalProducts, 9, urls.addProductBasket);
        await BasketPage.basketCountItems(9).waitUntilElementIsVisible()
        await BasketPage.openBasketPopup();
        await BasketPage.checkFieldsValueInCard(products, onePromotionalProducts, 9);
        await BasketPage.goToBasket(button.goToBasket);
        await BasketPage.checkingOpenedUrl(urls.basketPageEnotes);
    });
})
