export const BASE_URL = "https://norma.nomoreparties.space/api";
export const GET_INGREDIENTS_ENDPOINT = '/ingredients';
export const GET_ORDER_NUMBER_ENDPOINT = '/orders';
export const AUTH_ENDPOINT = "/auth/login";
export const REGISTRATION_ENDPOINT = '/auth/register';
export const LOGOUT_ENDPOINT = "/auth/logout";
export const GET_TOKEN_ENDPOINT = "/auth/token";
export const FORGOT_PASSWORD_ENDPOINT = "/password-reset";
export const RESET_PASSWORD_ENDPOINT = "/password-reset/reset";
export const GET_USER_INFO_ENDPOINT = "/auth/user";
export const BUN = 'bun';
export const MAIN = 'main';
export const SAUCE = 'sauce';
export const INGREDIENT = 'INGREDIENT';
export const INGREDIENT_ITEM = 'INGREDIENT_ITEM';
export const ERROR_TEXT = "Что-то пошло не так, попробуйте ещё раз";
export const WS_BASE_URL = 'wss://norma.nomoreparties.space/orders';
export const BUN_FOR_TEST = {
    "_id":"60666c42cc7b410027a1a9b1",
    "name":"Краторная булка N-200i",
    "type":"bun",
    "proteins":80,
    "fat":24,
    "carbohydrates":53,
    "calories":420,
    "price":1255,
    "image":"https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v":0
};
export const FILLING_FOR_TEST = {
    "_id":"60666c42cc7b410027a1a9b5",
    "name":"Говяжий метеорит (отбивная)",
    "type":"main",
    "proteins":800,
    "fat":800,
    "carbohydrates":300,
    "calories":2674,
    "price":3000,
    "image":"https://code.s3.yandex.net/react/code/meat-04.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
    "__v":0
};
export const SAUCE_FOR_TEST = {
    "_id":"60666c42cc7b410027a1a9b8",
    "name":"Соус фирменный Space Sauce",
    "type":"sauce",
    "proteins":50,
    "fat":22,
    "carbohydrates":11,
    "calories":14,
    "price":80,
    "image":"https://code.s3.yandex.net/react/code/sauce-04.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/sauce-04-large.png",
    "__v":0
};
export const ORDER_FOR_TEST = {
    createdAt: "2023-07-28T06:03:35.308Z",
    ingredients: ['643d69a5c3f7b9001cfa0940', '643d69a5c3f7b9001cfa093d'],
    name: "Метеоритный флюоресцентный бургер",
    number: 14790,
    status: "done",
    updatedAt: "2023-07-28T06:03:35.457Z",
    _id: "64c35a3782e277001bfa4c97"
};
export const ORDER_DETAILS_FOR_TEST = {"_id":"64c38c5b82e277001bfa4d1d",
"ingredients":["643d69a5c3f7b9001cfa093c","643d69a5c3f7b9001cfa093c","643d69a5c3f7b9001cfa0943"],
"status":"done",
"name":"Space краторный бургер",
"createdAt":"2023-07-28T09:37:31.718Z",
"updatedAt":"2023-07-28T09:37:31.864Z",
"number":14807};
export const EMAIL_FOR_TEST = "juliabednaia@gmail.com";
export const PASSWORD_FOR_TEST = "1234567";
