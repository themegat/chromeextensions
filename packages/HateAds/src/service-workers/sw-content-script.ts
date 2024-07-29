export default class ContentScriptServiceWorker {
    static start = () => {

        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.event === 'enable') {
                this.handleEnabling(true);
                return true;
            }
        });

        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.event === 'disable') {
                this.handleEnabling(false);
                return true;
            }
        });
    }

    static handleEnabling = (isEnabled: boolean) => {
        chrome.storage.local.set({ 'isEnabled': isEnabled });
    }

}