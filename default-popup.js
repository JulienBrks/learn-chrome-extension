(function() {
  'use strict';
  chrome.storage.sync.get('isReload', function(result) {
    if(result.isReload) {
      chrome.tabs.reload();
    }
  });
  chrome.storage.sync.get('removedUrls', function(result) {
    for (var iRemovedUrls = 0; iRemovedUrls < result.removedUrls.length; iRemovedUrls++) {
      var removedUrlLi = document.createElement('li');
      removedUrlLi.textContent = result.removedUrls[iRemovedUrls].title + ': ' + result.removedUrls[iRemovedUrls].url ;
      
      document.getElementById('js-removed-urls').appendChild(removedUrlLi);
    }
  });
})();