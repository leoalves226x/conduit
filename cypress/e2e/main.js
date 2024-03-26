import { IrPara } from "../support/page_objects/navigation"

describe ('Teste API', () => {


    beforeEach('Login', () => {
        IrPara.TelaLogin()
    })

    it('Verificar request e response', () =>{

    cy.intercept('POST','https://conduit-api.bondaracademy.com/api/articles/').as('postArticles')
    cy.contains('New Article').click()
    cy.get('[formcontrolname="title"]').clear().type('This is a Test Title')
    cy.get('[formcontrolname="description"]').clear().type('This is a Description')
    cy.get('[formcontrolname="body"]').clear().type('This is the body text')
    cy.contains('Publish Article').click()

    cy.wait('@postArticles').then(xhr => {
      console.log(xhr)
      if(xhr.response.statusCode == 200){
        expect(xhr.response.statusCode).to.equal(200)
      }
      else if(xhr.response.statusCode == 201) {
        expect(xhr.response.statusCode).to.equal(201)
      }    
      expect(xhr.request.body.article.description).to.equal('This is a Description')
    })
    })
})