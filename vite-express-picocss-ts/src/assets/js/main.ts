// import './modal.js';
// import './theme-switcher.js';
import '../css/main.css';
import { SwitchColorMode } from './theme-switcher';

window.addEventListener("load", () => {
    // Your TypeScript code to execute after all page resources are loaded
    console.log("Page and all resources loaded!");

    const switchColorMode = new SwitchColorMode();
    switchColorMode.init();
});


