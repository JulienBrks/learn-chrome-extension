(function() {
  'use strict';
  var tabToUrl = {},
    tabToTitle = {};
  function tabRemovedCb(tabId, removeInfo) {
    chrome.storage.sync.get('removedUrls', function(result) {
      var storedRemovedUrls = result.removedUrls;
      if (storedRemovedUrls) {
        storedRemovedUrls.unshift({
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
        suggestResult,
        url,
        title;
      for (var iRemovedUrls = 0; iRemovedUrls < result.removedUrls.length; iRemovedUrls++) {
        suggestResult = {};
        url = result.removedUrls[iRemovedUrls].url;
        title = result.removedUrls[iRemovedUrls].title;
        suggestResult.content = url;
        suggestResult.description = title;
        
        if ((url && url.toLocaleLowerCase().includes(text.toLocaleLowerCase())) || (title &&    title.toLocaleLowerCase().includes(text.toLocaleLowerCase()))) {
          suggestResultList.unshift(suggestResult);
        } else {
          suggestResultList.push(suggestResult);
        }
      }
      suggestCb(suggestResultList);
    });
  };
  chrome.tabs.onUpdated.addListener(onUpdatedCb);
  chrome.tabs.onRemoved.addListener(tabRemovedCb);
  chrome.omnibox.onInputChanged.addListener(onInputChanged);
  chrome.omnibox.onInputEntered.addListener(onInputEnteredCb);
})();