import { IrPara } from "../support/page_objects/navigation"

describe ('Teste API', () => {


    beforeEach('Login', () => {
        cy.intercept({method: 'Get', path: 'tags'}, {fixture: 'tags.json'})
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

    it('Validar feed global', () => {

      cy.intercept('GET','https://conduit-api.bondaracademy.com/api/articles/feed*' , {"articles":[],"articlesCount":0}).as('YourFeed')
      cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/articles*', {fixture: 'articles.json'})
  
      cy.contains('Global Feed').click()
      cy.get('app-article-list app-article-preview button').then(buttonList => {
          expect(buttonList[0]).to.contain('1')
          expect(buttonList[1]).to.contain('5')
      })
  
      cy.fixture('articles.json').then(file =>{
        const articleLink = file.articles[1].slug
        file.articles[1].favoritesCount = 6
        cy.intercept('POST','https://conduit-api.bondaracademy.com/api/articles/'+articleLink+'/favorite', file)
      })
  
      cy.get('app-article-list app-article-preview button').eq(1).click().should('contain', '6')
  
    })
})