/*
 * Modal
 *
 * Pico.css - https://picocss.com
 * Copyright 2019-2024 - Licensed under MIT
 */

// Config
const isOpenClass: string = "modal-is-open";
const openingClass: string = "modal-is-opening";
const closingClass: string = "modal-is-closing";
const scrollbarWidthCssVar: string = "--pico-scrollbar-width";
const animationDuration: number = 400; // ms
let visibleModal: HTMLDialogElement | null = null;

// Toggle modal
// (window as any).toggleModal = (event: MouseEvent): void => {
//     event.preventDefault();

//     const modal = document.getElementById((event.currentTarget as HTMLElement).dataset.target as string) as HTMLDialogElement;
//     if (!modal) return;
//     modal && (modal.open ? closeModal(modal) : openModal(modal));
// };

export const confirm = (): Promise<boolean> => {
    const modal = document.getElementById('confirm-modal') as HTMLDialogElement;
    const okButton = document.getElementById('confirm-ok');
    const cancelButton = document.getElementById('confirm-cancel');

    return new Promise((resolve) => {
        modal.showModal();

        const handleOk = () => {
            modal.close();
            okButton?.removeEventListener('click', handleOk);
            cancelButton?.removeEventListener('click', handleCancel);
            resolve(true);
        };

        const handleCancel = () => {
            modal.close();
            okButton?.removeEventListener('click', handleOk);
            cancelButton?.removeEventListener('click', handleCancel);
            resolve(false);
        };

        okButton?.addEventListener('click', handleOk);
        cancelButton?.addEventListener('click', handleCancel);
    })
}

// Open modal
export const openModal = (): void => {
    const modal = document.getElementById('confirm-modal') as HTMLDialogElement;
    const { documentElement: html } = document;
    const scrollbarWidth = getScrollbarWidth();
    if (scrollbarWidth) {
        html.style.setProperty(scrollbarWidthCssVar, `${scrollbarWidth}px`);
    }
    html.classList.add(isOpenClass, openingClass);
    setTimeout(() => {
        visibleModal = modal;
        html.classList.remove(openingClass);
    }, animationDuration);
    modal.showModal();
};

// Close modal
export const closeModal = (): void => {
    visibleModal = null;
    const modal = document.getElementById('confirm-modal') as HTMLDialogElement;
    const { documentElement: html } = document;
    html.classList.add(closingClass);
    setTimeout(() => {
        html.classList.remove(closingClass, isOpenClass);
        html.style.removeProperty(scrollbarWidthCssVar);
        modal.close();
    }, animationDuration);
};

// Close with a click outside
document.addEventListener("click", (event: MouseEvent) => {
    if (visibleModal === null) return;
    const modalContent = visibleModal.querySelector("article") as HTMLElement;
    const isClickInside = modalContent.contains(event.target as Node);
    !isClickInside && closeModal();
});

// Close with Esc key
document.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Escape" && visibleModal) {
        closeModal();
    }
});

// Get scrollbar width
const getScrollbarWidth = (): number => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    return scrollbarWidth;
};

// Is scrollbar visible
const isScrollbarVisible = (): boolean => {
    return document.body.scrollHeight > screen.height;
};