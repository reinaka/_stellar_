import { EMAIL_FOR_TEST, PASSWORD_FOR_TEST } from '../../src/constants/constants';

describe("Тестирование роутинга", () => {
    before(() => {
        cy.visit('')
    });

    it("Должна открыться страница Конструктора", () => {
        cy.contains("Соберите бургер");
    });

    it("Должен произойти переход на Ленту заказов", () => {
        cy.visit('')
        cy.contains("Лента заказов").click()
        cy.contains("Выполнено")
    });

    it("Должен произойти переход в Личный кабинет или на страницу логина", () => {
        cy.visit('')
        cy.contains("Личный кабинет").click()
        cy.contains("Вход" || "изменить свои персональные данные") 
    });

    it("Должен прооизойти переход на страницу Конструктора", () => {
        cy.visit('')
        cy.contains("Конструктор").click()
        cy.contains("Соберите бургер");
    })
});


describe("Тестирование формы для логина", () => {
    it("Пробуем залогиниться", () => {
        cy.visit(`/login`)
        cy.get("div").contains('E-mail').parent().within(() => {
            cy.get("input").type(EMAIL_FOR_TEST)
        })
        cy.get("div").contains("Пароль").parent().within(() => {
            cy.get("input").type(PASSWORD_FOR_TEST)
        })
        cy.contains("Войти").click()
        cy.contains("Конструктор")
    })
})

describe("Тестируем корректность загрузки ингредиентов и работоспособность функционала", () => {
    beforeEach(() => {
        cy.visit('')
        cy.wait(3000)
        it("Проверка структуры ингредиентов", () => {
            cy.intercept("GET", "api/ingredients", {fixture: "ingredients.json"})
        })
    })
    

    it("Тестируем модальное окно с деталями ингредиента", () => {
        cy.contains("Детали ингредиента").should("not.exist")
        cy.get("li").contains("Краторная булка").click()
        cy.get('[data-cy=modal]').contains("Детали ингредиента")
        cy.get('body').trigger('keydown', { keyCode: 27});
    })

    it("Тестируем перетаскивание булки", () => {
        cy.get('li')
            .contains("Флюоресцентная булка")
            .trigger("dragstart")
        cy.get('[data-cy=constructor]')
            .trigger("drop")
        cy.contains("Флюоресцентная булка R2-D3 (верх)").should("exist")
        cy.contains("Флюоресцентная булка R2-D3 (низ)").should("exist")
    })


    it("Тестируем перетаскивание ингредиента", () => {
        cy.get('li')
            .contains("Соус фирменный Space Sauce")
            .trigger("dragstart")
        cy.wait(3000);
        cy.get('[data-cy=constructor')
            .trigger("drop")
        cy.contains("Соус фирменный Space Sauce").should("exist")

        cy.get('li')
            .contains("Соус традиционный галактический")
            .trigger("dragstart")
        cy.wait(3000);
        cy.get('[data-cy=constructor')
            .trigger("drop")
        cy.contains("Соус традиционный галактический").should("exist")
    })


    it("Проверка модального окна с деталями заказа", () => {
        cy.visit(`/login`)
        cy.get("div").contains('E-mail').parent().within(() => {
            cy.get("input").type(EMAIL_FOR_TEST)
        })
        cy.get("div").contains("Пароль").parent().within(() => {
            cy.get("input").type(PASSWORD_FOR_TEST)
        })
        cy.contains("Войти").click()
        cy.contains("Конструктор")
        cy.get('li')
                .contains("Флюоресцентная булка")
                .trigger("dragstart")
            cy.wait(3000)
            cy.get('[data-cy=constructor]')
                .trigger("drop")
            cy.contains("Флюоресцентная булка R2-D3 (верх)").should("exist")
            cy.contains("Флюоресцентная булка R2-D3 (низ)").should("exist")

        cy.get("button").contains("Оформить заказ").click()
        cy.get('[data-cy=modal]').should("exist").contains("Формируем заказ" || "идентификатор заказа")
})
})

    



