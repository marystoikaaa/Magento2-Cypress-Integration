context('Import Catalog Rule', () => {
    it('delete - export file - csv - sftp - new job', () => {
        //login
        cy.loginToAdminPanel('ee')
        
        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSection('Catalog Rule Import - export file - delete - csv - sftp')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_rule');

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('delete');

        //specify Import Source section
        cy.specifySftpSource('importSftp','/var/www/alex/files/test/export_catalog_rules.csv')
        
        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity catalog_rule')

       //check that  catalog rules were deleted
       cy.get('#menu-magento-backend-marketing').find('.item-promo-catalog').find('a').as('goToCatalogRuleGrid')
       cy.get('@goToCatalogRuleGrid').click({force:true})
       cy.get('.admin__control-support-text').contains('0',{timeout: 600000})
    })
})
