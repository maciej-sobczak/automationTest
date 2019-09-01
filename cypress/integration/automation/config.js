export const selectors = {
    editPhotoButton: '.app_btn > .m_rgt_0 > a',
    closeModalButton: '#quickModal > .modal-dialog > .modal-content > .modal-header > .close > svg',
    canvas: '.c-canvas-section__auxiliary',
    zoomImageOutButton: '.c-canvas-status__subtract-btn > svg',
    zoomImageInButton: '.c-canvas-status__add-btn > svg',
    zoomDropdownMenu: '.c-canvas-status__right > .btn-group > .btn > span',
    zoomDropdown50percent: '.c-canvas-status__right > .btn-group > .dropdown-menu > :nth-child(3)',
    zoomDropdown125percent: '.c-canvas-status__right > .btn-group > .dropdown-menu > :nth-child(6)',
    resizeSectionButton:
        '.c-edit__edit-resize > .panel > .panel-heading > .panel-title > .c-edit__item-name',
    resizeWidthBox:
        '#collapse-editresize > .c-edit__body > .c-edit-corp > .c-width-height > .c-width-height__size-width',
    resizeHeightBox:
        '#collapse-editresize > .c-edit__body > .c-edit-corp > .c-width-height > .c-width-height__size-height',
    resizePercentageCheckbox: '#collapse-editresize > .c-edit__body > .c-edit-corp > .c-keep > .btn',
    resizeLockAspectRatio:
        '#collapse-editresize > .c-edit__body > .c-edit-corp > .c-width-height > .btn',
    resizeApplyButton: '#collapse-editresize > .c-edit__body > .c-edit__cancel-apply > .u-apply-btn',
    cropSectionButton:
        '.c-edit__edit-crop > .panel > .panel-heading > .panel-title > .c-edit__item-name',
    cropWidthBox:
        '#collapse-editcrop > .c-edit__body > .c-edit-corp > .c-width-height > .c-width-height__size-width',
    cropHeightBox:
        '#collapse-editcrop > .c-edit__body > .c-edit-corp > .c-width-height > .c-width-height__size-height',
    cropLockAspectRatio: '#collapse-editcrop > .c-edit__body > .c-edit-corp > .c-keep > .btn',
    cropApplyButton: '#collapse-editcrop > .c-edit__body > .c-edit__cancel-apply > .u-apply-btn',
};

export const dimensions = {
    default: {
        width: 1000,
        height: 666,
    },
    resized: {
        width: 170,
        height: 113,
    },
    croppedDefault: {
        width: 800,
        height: 533,
    },
    croppedCustom: {
        width: 150,
        height: 100,
    },
};
