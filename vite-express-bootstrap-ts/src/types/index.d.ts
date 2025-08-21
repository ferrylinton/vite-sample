export {};

declare global {
    interface Window {
        toast: () => void
    }
}