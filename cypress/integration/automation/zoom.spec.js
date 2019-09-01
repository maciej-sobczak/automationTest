import { selectors } from './config';
import {
    assertImageIsZoomedOut,
    assertImageIsZoomedIn,
    assertImageIsZoomedOutDropdown,
    assertImageIsZoomedInDropdown,
    prepareView,
} from './helpers';

describe('Zoom function test', () => {
    it('Navigates to fotojet website', () => {
        cy.visit('https://www.fotojet.com/');
    });

    it('Opens photo edition view', () => {
        cy.get(selectors.editPhotoButton).click();
        cy.get(selectors.closeModalButton).click();
        cy.get(selectors.canvas).should('be.visible');
    });

    it('Zooms image out using minus button', () => {
        assertImageIsZoomedOut();
    });

    it('Zooms image in using plus button', () => {
        prepareView();
        assertImageIsZoomedIn();
    });

    it('Zooms image out using dropdown menu', () => {
        prepareView();
        assertImageIsZoomedOutDropdown();
    });

    it('Zooms image in using dropdown menu', () => {
        prepareView();
        assertImageIsZoomedInDropdown();
    });
});
