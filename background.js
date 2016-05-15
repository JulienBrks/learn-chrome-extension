(function() {
  'use strict';
  var tabToUrl = {};
  function tabRemovedCb(tabId, removeInfo) {
    chrome.storage.sync.get('removedUrls', function(result) {
      var storedRemovedUrls = result.removedUrls;
      if (storedRemovedUrls) {
        storedRemovedUrls.push(tabToUrl[tabId]);
      } else {
        storedRemovedUrls = [];
      }
      storedRemovedUrls.splice(9);
      chrome.storage.sync.set({
        removedUrls: storedRemovedUrls
      });
    });
  };
  function onUpdatedCb(tabId, changeInfo, tab) {
    tabToUrl[tabId] = tab.url;
  };
  chrome.tabs.onUpdated.addListener(onUpdatedCb);
  chrome.tabs.onRemoved.addListener(tabRemovedCb);
})();