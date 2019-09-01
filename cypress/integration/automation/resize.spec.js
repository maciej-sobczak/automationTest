import { selectors } from './config';
import { assertImageIsResized, prepareView } from './helpers';

describe('Resize function test', () => {
    it('Navigates to fotojet website', () => {
        cy.visit('https://www.fotojet.com/');
    });

    it('Opens photo edition view', () => {
        cy.get(selectors.editPhotoButton).click();
        cy.get(selectors.closeModalButton).click();
        cy.get(selectors.canvas).should('be.visible');
    });

    it('Resizes Image with locked aspect ratio', () => {
        assertImageIsResized();
    });

    it('Resizes Image with locked aspect ratio and percentage value', () => {
        const isPercentage = true;

        prepareView();
        assertImageIsResized(isPercentage);
    });

    it('Resizes Image with unlocked aspect ratio', () => {
        const isPercentage = false;
        const hasUnlockedAspectRatio = true;

        prepareView();
        assertImageIsResized(isPercentage, hasUnlockedAspectRatio);
    });

    it('Resizes Image with unlocked aspect ratio and percentage value', () => {
        const isPercentage = true;
        const hasUnlockedAspectRatio = true;

        prepareView();
        assertImageIsResized(isPercentage, hasUnlockedAspectRatio);
    });
});
