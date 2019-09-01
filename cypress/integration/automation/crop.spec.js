import { selectors } from './config';
import { assertImageIsCropped, prepareView } from './helpers';

describe('Crop function test', () => {
    it('Navigates to fotojet website', () => {
        cy.visit('https://www.fotojet.com/');
    });

    it('Opens photo edition view', () => {
        cy.get(selectors.editPhotoButton).click();
        cy.get(selectors.closeModalButton).click();
        cy.get(selectors.canvas).should('be.visible');
    });

    it('Crops image with default parameters', () => {
        assertImageIsCropped();
    });

    it('Crops image with custom parameters', () => {
        const hasCustomParameters = true;

        prepareView();
        assertImageIsCropped(hasCustomParameters);
    });

    it('Crops image with custom parameters and locked aspect ratio', () => {
        const hasCustomParameters = true;
        const hasLockedAspectRatio = true;

        prepareView();
        assertImageIsCropped(hasCustomParameters, hasLockedAspectRatio);
    });
});
