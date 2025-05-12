describe('Burger Constructor Page Tests', () => {
  const SELECTORS = {
    burgerNoBun: '[data-cy=burgerNoBun]',
    burgerNoIngredients: '[data-cy=burgerNoIngredients]',
    ingredient: '[data-cy=ingredient]',
    modal: '[data-cy=modal]',
    modalCloseBtn: '[data-cy=modalCloseBtn]',
    modalCloseOverlay: '[data-cy=modalCloseOverlay]',
    orderButton: '[data-cy=orderButton]',
    burgerBun: '[data-cy=burgerBun]',
    orderNumber: '[data-cy=orderNumber]'
  };

  beforeEach(() => {
    window.localStorage.setItem('refreshToken', 'refresh-token-test');
    cy.setCookie('accessToken', 'access-token-test');

    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients'
    }).as('getIngredients');

    cy.intercept('GET', '**/user', { fixture: 'user.json' }).as('getUser');

    cy.intercept('POST', '**/orders', { fixture: 'orders.json' }).as(
      'createOrder'
    );

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    cy.clearLocalStorage();
  });

  it('should display an empty burger constructor by default', () => {
    cy.get(SELECTORS.burgerNoBun).should('exist');
    cy.get(SELECTORS.burgerNoIngredients).should('exist');
  });

  describe('Ingredient Details Modal', () => {
    it('should open modal with ingredient details when clicking on an ingredient', () => {
      cy.get(SELECTORS.ingredient).first().click();
      cy.get(SELECTORS.modal).as('modal');
      cy.get('@modal').should('be.visible');
      cy.get('@modal').should('contain', 'Детали ингредиента');
      cy.get('@modal').should('contain', 'Краторная булка N-200i');
    });

    it('should close ingredient details modal when clicking close button', () => {
      cy.get(SELECTORS.ingredient).first().click();
      cy.get(SELECTORS.modalCloseBtn).click();
      cy.get(SELECTORS.modal).should('not.exist');
    });

    it('should close ingredient details modal when clicking on overlay', () => {
      cy.get(SELECTORS.ingredient).first().click();
      cy.get(SELECTORS.modalCloseOverlay).click({ force: true });
      cy.get(SELECTORS.modal).should('not.exist');
    });

    it('should close ingredient details modal when pressing Escape key', () => {
      cy.get(SELECTORS.ingredient).first().click();
      cy.get('body').type('{esc}');
      cy.get(SELECTORS.modal).should('not.exist');
    });
  });

  describe('Create new order', () => {
    beforeEach(() => {
      cy.get('@getUser');

      cy.get(SELECTORS.burgerNoBun).should('exist');
      cy.get(SELECTORS.ingredient)
        .first()
        .within(() => {
          cy.get('button').click();
        });
    });

    it('should create a new order when bun and ingredients are added and order button is clicked', () => {
      cy.get(SELECTORS.burgerBun).should('exist');
      cy.get(SELECTORS.orderButton).click();

      cy.wait('@createOrder');

      cy.get(SELECTORS.modal).should('be.visible');
      cy.get(SELECTORS.orderNumber).should('contain', '76836');
    });

    it('should reset constructor after successful order creation', () => {
      cy.get(SELECTORS.orderButton).click();
      cy.wait('@createOrder');

      cy.get(SELECTORS.modalCloseBtn).click();
      cy.get(SELECTORS.burgerNoBun).should('exist');
      cy.get(SELECTORS.burgerNoIngredients).should('exist');
    });
  });
});
