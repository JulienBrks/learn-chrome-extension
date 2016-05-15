(function() {
  'use strict';
  var tabToUrl = {},
    tabToTitle = {};
  function tabRemovedCb(tabId, removeInfo) {
    chrome.storage.sync.get('removedUrls', function(result) {
      var storedRemovedUrls = result.removedUrls;
      if (storedRemovedUrls) {
        storedRemovedUrls.push({
          url: tabToUrl[tabId],
          title: tabToTitle[tabId]
        });
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
    tabToTitle[tabId] = tab.title || '';
  };
  function onInputEnteredCb(url) {
    chrome.tabs.update(null, {
      url: url
    });
  };
  function onInputChanged(text, suggestCb) {
    chrome.storage.sync.get('removedUrls', function(result) {
      var suggestResultList = [],
        suggestResult;
      for (var iRemovedUrls = 0; iRemovedUrls < result.removedUrls.length; iRemovedUrls++) {
        suggestResult = {};
        suggestResult.content = result.removedUrls[iRemovedUrls].url;
        suggestResult.description = result.removedUrls[iRemovedUrls].title;
        suggestResultList.push(suggestResult);
      }
      suggestCb(suggestResultList);
    });
  };
  chrome.tabs.onUpdated.addListener(onUpdatedCb);
  chrome.tabs.onRemoved.addListener(tabRemovedCb);
  chrome.omnibox.onInputChanged.addListener(onInputChanged);
  chrome.omnibox.onInputEntered.addListener(onInputEnteredCb);
})();