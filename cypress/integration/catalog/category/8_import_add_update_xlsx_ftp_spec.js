context('Import Сategories', () => {
    it('add update - xlsx - ftp - new job', () => {
        //login
        cy.loginToAdminPanel('ce')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        сy.generalImportSection('Category Import - add update - xlsx - ftp')
    
        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_category');

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append');

        //specify Import Source section
        cy.get('.type_file').find('select').as('importSourceType')
        cy.get('@importSourceType').select('xlsx');
        cy.ftpSource('importFtp','/files/import_categories_add_update.xlsx')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity catalog_category')

        //check that categories were created
        cy.get('#menu-magento-catalog-catalog').find('.item-catalog-categories').find('a').as('goToCategories')
        cy.get('@goToCategories').click({force:true})
        cy.get('#tree-div').contains('First test category',{timeout: 60000})
        cy.get('#tree-div').contains('Second test category',{timeout: 60000})
        cy.get('#tree-div').contains('Third test category',{timeout: 60000})
    })
})
