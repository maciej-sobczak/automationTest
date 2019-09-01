import { selectors, dimensions } from './config';

const WIDTH = 'width';
const HEIGHT = 'height';

function getElementDimension(element, dimensionType) {
    const dimensions = element.getBoundingClientRect();
    const elementDimension = dimensions[dimensionType];

    return elementDimension;
}

function assertImageIsNotCropped(zoomSelector) {
    cy.get(selectors.canvas).then(([selector]) => {
        const elementWidth = getElementDimension(selector, WIDTH);
        const elementHeight = getElementDimension(selector, HEIGHT);

        cy.get(zoomSelector).click();

        cy.get(selectors.canvas).then(([selector]) => {
            const zoomedElementWidth = getElementDimension(selector, WIDTH);
            const zoomedElementHeight = getElementDimension(selector, HEIGHT);
            assert.isTrue(
                elementWidth.toFixed(0) === zoomedElementWidth.toFixed(0),
                'Elements width remains the same',
            );
            assert.isTrue(
                elementHeight.toFixed(0) === zoomedElementHeight.toFixed(0),
                'Elements height remains the same',
            );
        });
    });
}

function assertDefaultImageDimensions() {
    cy.get(selectors.canvas).should('have.css', WIDTH, `${dimensions.default.width}px`);
    cy.get(selectors.canvas).should('have.css', HEIGHT, `${dimensions.default.height}px`);
}

function recalculateImageDimensions(isDropdown, isZoomedOut) {
    const zoomParameter = isDropdown ? (isZoomedOut ? 0.5 : 1.25) : isZoomedOut ? 0.9 : 1.1;
    const recalculatedImageDimensions = {
        width: (dimensions.default.width * zoomParameter).toFixed(0),
        height: (dimensions.default.height * zoomParameter).toFixed(0),
    };

    return recalculatedImageDimensions;
}

function assertRecalculatedImageDimensions(isDropdown, isZoomedOut) {
    const recalculatedImageDimensions = recalculateImageDimensions(isDropdown, isZoomedOut);
    cy.get(selectors.canvas).should('have.css', WIDTH, `${recalculatedImageDimensions.width}px`);
    cy.get(selectors.canvas).should('have.css', HEIGHT, `${recalculatedImageDimensions.height}px`);
}

function assertElementIsZoomed(zoomSelector) {
    const isDropdown =
        zoomSelector === selectors.zoomDropdown50percent ||
        zoomSelector === selectors.zoomDropdown125percent;
    const isZoomedOut =
        zoomSelector === selectors.zoomImageOutButton ||
        zoomSelector === selectors.zoomDropdown50percent;

    assertDefaultImageDimensions();

    if (isDropdown) {
        selectDropdownZoom(zoomSelector);
    } else {
        assertImageIsNotCropped(zoomSelector);
    }

    assertRecalculatedImageDimensions(isDropdown, isZoomedOut);
}

function selectDropdownZoom(zoomSelector) {
    cy.get(selectors.zoomDropdownMenu).click();
    cy.get(zoomSelector).click();
}

export function prepareView() {
    cy.reload();
    cy.get(selectors.closeModalButton).click();
}

export function assertImageIsZoomedOut() {
    assertElementIsZoomed(selectors.zoomImageOutButton);
}

export function assertImageIsZoomedIn() {
    assertElementIsZoomed(selectors.zoomImageInButton);
}

export function assertImageIsZoomedOutDropdown() {
    assertElementIsZoomed(selectors.zoomDropdown50percent);
}

export function assertImageIsZoomedInDropdown() {
    assertElementIsZoomed(selectors.zoomDropdown125percent);
}

function checkResizedDimension(hasUnlockedAspectRatio) {
    cy.get(selectors.canvas).should('have.css', WIDTH, `${dimensions.resized.width}px`);
    cy.get(selectors.canvas).should(
        'have.css',
        HEIGHT,
        `${hasUnlockedAspectRatio ? dimensions.default.height : dimensions.resized.height}px`,
    );
}

export function assertImageIsResized(isPercentage, hasUnlockedAspectRatio) {
    cy.get(selectors.resizeSectionButton).click();

    if (hasUnlockedAspectRatio) {
        cy.get(selectors.resizeLockAspectRatio).click();
    }

    if (isPercentage) {
        cy.get(selectors.resizePercentageCheckbox).click();
    }
    cy.get(selectors.resizeWidthBox)
        .clear()
        .type(isPercentage ? '7' : '70');
    cy.get(selectors.resizeApplyButton).click();
    checkResizedDimension(hasUnlockedAspectRatio);
}

function checkCroppedDimension(hasCustomParameters) {
    cy.get(selectors.canvas).should(
        'have.css',
        WIDTH,
        `${hasCustomParameters ? dimensions.croppedCustom.width : dimensions.croppedDefault.width}px`,
    );
    cy.get(selectors.canvas).should(
        'have.css',
        HEIGHT,
        `${hasCustomParameters ? dimensions.croppedCustom.height : dimensions.croppedDefault.height}px`,
    );
}

export function assertImageIsCropped(hasCustomParameters, hasLockedAspectRatio) {
    cy.get(selectors.cropSectionButton).click();

    if (hasCustomParameters && !hasLockedAspectRatio) {
        cy.get(selectors.cropWidthBox)
            .clear()
            .type('50');
        cy.get(selectors.cropHeightBox)
            .clear()
            .type('00');
    }

    if (hasLockedAspectRatio) {
        cy.get(selectors.cropLockAspectRatio).click();
        cy.get(selectors.cropWidthBox)
            .clear()
            .type('50');
    }

    cy.get(selectors.cropApplyButton).click();

    checkCroppedDimension(hasCustomParameters);
}
