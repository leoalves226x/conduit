import { IrPara } from "../support/page_objects/navigation"

describe ('Teste API', () => {


    beforeEach('Login', () => {
        IrPara.TelaLogin()
    })

    it('Verificar request e response', () =>{
    
    cy.intercept('POST','https://conduit-api.bondaracademy.com/api/articles/').as('postArticles')
    cy.contains('New Article').click()
    cy.get('[formcontrolname="title"]').clear().type('Teste Titulo')
    cy.get('[formcontrolname="description"]').clear().type('Teste Descricao')
    cy.get('[formcontrolname="body"]').clear().type('Teste body text')
    cy.contains('Publish Article').click()

    cy.wait('@postArticles').then(xhr => {
      //console.log(xhr)
      if(xhr.response.statusCode == 200 || xhr.response.statusCode == 201){
        expect(xhr.request.body.article.description).to.equal('Teste Descricao')
        expect(xhr.request.body.article.title).to.equal('Teste Titulo')
        expect(xhr.request.body.article.body).to.equal('Teste body text')
      }
    })

    cy.get('li.nav-item').eq(3).click()
    cy.contains('Teste Titulo').click()
    cy.contains('Delete Article').click()

    })
})