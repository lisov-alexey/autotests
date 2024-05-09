import axios from 'axios';
import {browser} from "@wdio/globals";

export const addProductToBasket = async (productId: number, count: number, url: string) => {
  const csrfToken = await getCsrfToken();
  const globalCookie = await getCookiePairs();
  try {
    await axios({
      method: 'post',
      url: url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': `${globalCookie}`,
        'X-CSRF-Token': `${csrfToken}`,
      },
      data: `product=${productId}&count=${count}`
    });
  } catch (error) {
    console.error('Product not added', error);
  }
};

export const getCookiePairs = async (): Promise<string> => {
  let cookiePairs: string;

  const globalCookie = await browser.getCookies();

  cookiePairs = '';
  globalCookie.forEach((oneCookie): void => {
    cookiePairs = cookiePairs.concat(oneCookie.name, '=', oneCookie.value, ';');
  });

  return cookiePairs;
};

export const getCsrfToken = async (): Promise<string> => {
  const pageSourcex = await browser.getPageSource();
  const regexToken = /<meta\s+name="csrf-token"\s+content="([^"]+)"\s*\/?>/i;
  const tokenMatchResult = pageSourcex.match(regexToken);

  return tokenMatchResult[1];
};



