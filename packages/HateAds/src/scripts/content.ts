const ADVERT_CLASS_NAMES = [
  ".google-right-ad",
  "._ap_apex_ad",
  "[data-google-query-id]",
];
const COMPLETE = "complete";
const WINDOW_LOADED_TIMEOUT = 1000;

let isEnabled = false;

const removeAdverts = (adverts: NodeListOf<any>) => {
  if (adverts && adverts.length > 0) {
    adverts.forEach((ad) => {
      ad.remove();
    });
  }
};

const getAdverts = (classNames: string[]) => {
  let adverts = document.querySelectorAll(classNames.join(","));
  return adverts;
};

const removeAdvertsAfterLoad = () => {
  const itertations = 5;
  for (let i = 1; i <= itertations; i++) {
    setTimeout(() => {
      removeAdverts(getAdverts(ADVERT_CLASS_NAMES));
    }, i * WINDOW_LOADED_TIMEOUT * itertations);
  }
};

const onWindowLoaded = () => {
  setTimeout(() => {
    let completed = document.readyState === COMPLETE;
    if (!completed) {
      onWindowLoaded();
    } else {
      removeAdverts(getAdverts(ADVERT_CLASS_NAMES));
      //Remove Adverts that only load after the page has loaded
      removeAdvertsAfterLoad();
    }
  }, WINDOW_LOADED_TIMEOUT);
};

const execute = () => {
  if (isEnabled) {
    //Remove Adverts that can be removed before the page is loaded completely
    removeAdverts(getAdverts(ADVERT_CLASS_NAMES));
    //Remove Adverts after the page has loaded
    onWindowLoaded();
  }
};

chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key === "isEnabled") {
      console.log("enabled: ", newValue);
      isEnabled = newValue;
      execute();
    }
  }
});

chrome.storage.local.get("isEnabled").then((value) => {
  isEnabled = value.isEnabled;
  execute();
});
