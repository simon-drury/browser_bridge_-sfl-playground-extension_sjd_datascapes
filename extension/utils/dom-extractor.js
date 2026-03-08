// dom-extractor.js

/**
 * Extracts the DOM Accessibility Tree and element information.
 * @returns {Array} - An array of objects containing the accessibility info of each element.
 */
function extractDOMAccessibilityTree() {
    const elements = document.body.getElementsByTagName('*');
    const accessibilityInfo = [];

    for (let element of elements) {
        const info = {
            tag: element.tagName,
            id: element.id || null,
            classes: element.className || null,
            roles: element.getAttribute('role') || null,
            ariaLabel: element.getAttribute('aria-label') || null,
            computedStyle: window.getComputedStyle(element).cssText,
        };
        accessibilityInfo.push(info);
    }

    return accessibilityInfo;
}

// Example usage:
// console.log(extractDOMAccessibilityTree());