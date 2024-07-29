const enableToggle = document.querySelector('#enableHateAds');

chrome.storage.local.get('isEnabled').then((value) => {
    const isEnabled = value.isEnabled;
    if (enableToggle) {
        (enableToggle as HTMLInputElement).checked = isEnabled;
    }
});

if (enableToggle) {
    enableToggle.addEventListener('change', (event) => {
        if ((event.target as HTMLInputElement).checked) {
            chrome.runtime.sendMessage({ event: 'enable' });
        } else {
            chrome.runtime.sendMessage({ event: 'disable' });
        }
    });
}


