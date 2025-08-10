import { Dropdown } from 'bootstrap';
import { SwitchColorMode } from './theme-switcher';
import { Todo } from "./todo";

import '../css/main.css';

const initToggleMenu = () => {
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

window.addEventListener("load", () => {
    // Your TypeScript code to execute after all page resources are loaded
    console.log("Page and all resources loaded!");

    const switchColorMode = new SwitchColorMode();
    switchColorMode.init();
    initToggleMenu();
    Todo.init();

    Array.from(document.querySelectorAll('.dropdown'))
        .forEach(toastNode => {
            new Dropdown(toastNode);
        })

});


