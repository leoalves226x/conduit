export class Navigation {

    TelaLogin() {
        cy.visit('https://conduit.bondaracademy.com/login')
        cy.get('form').find('input').eq(0).clear().type('testapi123@gmail.com')
        cy.get('form').find('input').eq(1).clear().type('test123')
        cy.get('form').submit()
    }
}

export const IrPara = new Navigation()