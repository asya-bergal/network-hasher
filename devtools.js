function NetworkHasher() {
};

NetworkHasher.parseResponse = function(url) {
  return function(content, encoding) {
    var sha_hash = CryptoJS.SHA256(content).toString(CryptoJS.enc.Hex);
    chrome.devtools.inspectedWindow.eval('console.log("Hash from ' + url + ':\\n' + sha_hash + '")');
  }
};

NetworkHasher.handleRequest = function(request) {
  var url = request.request.url;
  request.getContent(Hasher.parseResponse(url));
};

chrome.devtools.network.onRequestFinished.addListener(NetworkHasher.handleRequest);
