(function() {
  'use strict';
  chrome.storage.sync.get('isReload', function(result) {
    if(result.isReload) {
      chrome.tabs.reload();
    }
  });
})();