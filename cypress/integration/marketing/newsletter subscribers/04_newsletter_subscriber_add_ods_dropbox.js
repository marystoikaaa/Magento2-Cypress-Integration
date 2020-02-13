context('Import Newsletter Subscribers', () => {
    it('add - ods - dropbox - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSection('Newsletter Subscribers Import - add  - ods - dropbox')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('newsletter_subscriber');

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append');

        //specify Import Source section
        cy.get('.type_file').find('select').as('importSourceType')
        cy.get('@importSourceType').select('csv');
        cy.dropboxSource('/newsletter_subscribers.csv','lOuV6o4bspAAAAAAAAAGOQMtMH2Wid9IxkITAAKusEWjT0EMiDsCv0_Z4S1YUsB2')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity newsletter_subscriber')

        //check that  newsletter sibscribers were added
        cy.get('#menu-magento-backend-marketing').find('.item-newsletter-subscriber').find('a').as('goToNewsletterSubscriberGrid')
        cy.get('@goToNewsletterSubscriberGrid').click({force:true})
        cy.get('.even').find('.col-email').contains('test@mail.com',{timeout: 600000})
       
    })
})
