import '../css/main.css';
import { SwitchColorMode } from './theme-switcher';
import { Todo } from "./todo";

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
});


