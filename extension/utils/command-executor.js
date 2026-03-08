// command-executor.js

class CommandExecutor {
    constructor() {}

    click(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.click();
        } else {
            console.error(`Element not found for selector: ${selector}`);
        }
    }

    type(selector, text) {
        const element = document.querySelector(selector);
        if (element) {
            element.value = text;
            element.dispatchEvent(new Event('input', { bubbles: true }));
        } else {
            console.error(`Element not found for selector: ${selector}`);
        }
    }

    submit(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.submit();
        } else {
            console.error(`Element not found for selector: ${selector}`);
        }
    }

    scrollTo(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView();
        } else {
            console.error(`Element not found for selector: ${selector}`);
        }
    }
}

// Export the CommandExecutor class
export default CommandExecutor;