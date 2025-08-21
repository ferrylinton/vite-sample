import { Dropdown, Offcanvas, Toast } from 'bootstrap';
import { ThemeToggle } from './theme-toggle';
import { Todo } from "./todo";

const initMenuToggle = () => {
    const menuToggle = document.getElementById('menu-toggle');

    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();

            if (e.currentTarget instanceof HTMLElement) {
                e.currentTarget.classList.toggle('is-active');
                document.body.classList.toggle('sidebar-is-active');
            }

        });
    }
}

const initToat = () => {
    const messageToastEl = document.getElementById('messageToast');

    if (messageToastEl) {
        const messageToast = Toast.getOrCreateInstance(messageToastEl);
        messageToast.show()
    }
}

const initDropdown = () => {
    Array.from(document.querySelectorAll('.dropdown'))
        .forEach(toastNode => {
            new Dropdown(toastNode);
        })
}

const initSidebar = () => {
    const offcanvasResponsiveEl = document.getElementById('offcanvasResponsive');

    if (offcanvasResponsiveEl) {
        new Offcanvas(offcanvasResponsiveEl);
    }
}

window.addEventListener("load", () => {
    // Your TypeScript code to execute after all page resources are loaded
    console.log("Page and all resources loaded!");

    const themeToggle = new ThemeToggle();
    themeToggle.init();
    initMenuToggle();
    initToat();
    Todo.init();

    initDropdown();

    initSidebar();

});

window.toast = () => {
    const messageToastEl = document.getElementById('messageToast');

    if (messageToastEl) {
        const messageToast = Toast.getOrCreateInstance(messageToastEl);
        messageToast.show()
    }

}

