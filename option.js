(function() {
  'use strict';
  var isReloadCheckbox = document.getElementById('js-is-reload');
  chrome.storage.sync.get('isReload', function(result) {
    if(result.isReload) {
      isReloadCheckbox.checked = true;
    }
  });
  isReloadCheckbox.onclick = function(e) {
    chrome.storage.sync.set({
      isReload: isReloadCheckbox.checked
    });
  };
})();