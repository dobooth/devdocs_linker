var baseurl = "http://devdocs.magento.com";
var basemerch = "https://docs.magento.com/user-guide"
var selectedText
// Reepo -> website
var repos = [
  ["commerce-pwa-studio", "https://developer.adobe.com/commerce/pwa-studio/"]
];
//md is a flag for merchdocs, which has a different base url
function openDevdocs(selectedText, md = 0) {
  //Handle selection having leading slash or not
  var slashed = selectedText.charAt(0);
  if (slashed != '/') {
    baseurl = baseurl + '/';
  }
  //Assume .html but handle .md
  var extension = selectedText.slice(-3);
  if (extension = '.md') {
    selectedText = selectedText.replace(".md", ".html");
  }
  var theurl = baseurl + selectedText;
  if (md == 1) {
    theurl = basemerch + selectedText;
  }
  window.open(theurl, '_blank');
  //Need to reset the var after each use.
  baseurl = "http://devdocs.magento.com";
  basemerch = "https://docs.magento.com/user-guide"
}

function openAdobedocs(selectedText) {

  //Handle selection having leading slash or not
  var slashed = selectedText.charAt(0);
  if (slashed != '/') {
    baseurl = baseurl + '/';
  }
  //Assume .html but handle .md
  var extension = selectedText.slice(-3);
  if (extension = '.md') {
    selectedText = selectedText.replace(".md", ".html");
  }
  selectedText = selectedText.replace("src/pages/", "");
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];

    for (var i = 0; i < repos.length; i++) { 
      finalURL = repos[i][1] + selectedText;
      window.open(finalURL, '_blank');
    }
  });
}


function checkPath(info, tab) {
  // This if ensures we don't run this function if doing the @magento function
  if (info.editable == false) {
    //If it contains cotains 'guides', slash or not
    var selectedText = info.selectionText.toString().trim();
    var pass = selectedText.includes("src/guides");
    if (pass) {
      // stript src from devdocs links
      selectedText = selectedText.replace("src", "");
      openDevdocs(selectedText)
    }
    else if (/^\/?(src)?(\/cloud\/|\/codelinks\/|\/community\/|\/compliance\/|\/contributor-guide\/|\/extensions\/|\/marketplace\/|\/quality-patches\/|\/recommendations\/|\/release\/|\/schemas\/|\/security\/).*(\.(html|md))/.test(selectedText)) {
      //if for devdocs not guides
      selectedText = info.selectionText.toString().trim();
      selectedText = selectedText.replace('src', '');
      var pass = /^\/?(src).*(\.(html|md))/.test(selectedText);
      openDevdocs(selectedText)
    }
    else if (/(^\/?(src))?(\/catalog\/|\/cms\/|\/configuration\/|\/customers\/|\/design\/|\/getting-started\/|\/images\/|\/magento\/|\/marketing\/|\/mcom\/|\/payment\/|\/quick-tour\/|\/reports\/|\/sales-channels\/|\/sales\/|\/shipping\/|\/stores\/|\/system\/|\/tax\/).*(\.(html|md))/.test(selectedText)) {
      //if for src/ merchdocs
      selectedText = info.selectionText.toString().trim();
      selectedText = selectedText.replace('src', '');
      var pass = /^\/?(src).*(\.(html|md))/.test(selectedText);
      openDevdocs(selectedText, 1)
    }
    //Handle {{site.baseurl}}
    else if (/({{\s*?site.baseurl\s*?}}).*(.(html|md))/.test(selectedText)) {
      var reg = /({{\s*?site.baseurl\s*?}})/;
      var selectedText = selectedText.replace(reg, '');
      openDevdocs(selectedText)
    }
    //Handle {{page.baseurl}}. Assume v2.4
    else if (/({{\s*?page.baseurl\s*?}}).*(.(html|md))/.test(selectedText)) {
      var reg = /({{\s*?page.baseurl\s*?}})/;
      var selectedText = selectedText.replace(reg, 'guides/v2.4');
      openDevdocs(selectedText)
    }
    //Handle {{site.mage2bloburl}}. Assume v2.4
    else if (/({{\s*?site.mage2bloburl.*?version\s*?}}).*(.(p?html|xml|js|php))/.test(selectedText)) {
      var reg = /({{\s*?site.mage2bloburl.*?version\s*?}})/;
      var selectedText = selectedText.replace(reg, 'https://github.com/magento/magento2/blob/2.4');
      window.open(selectedText, '_blank');
    }
    //Handle AdobeDocs repos
    else if (/(?:src\/pages\/)(\S*\.md)/.test(selectedText)) {
      openAdobedocs(selectedText);
    }
    else {
      alert("Hmm...couldn't find that one. Let me know.");

    }
  }
}

chrome.contextMenus.create({
  "id": "devdocs",
  "title": "Open in Adobe/Magento Docs",
  "type": "normal",
  "contexts": ["selection"],
});

chrome.contextMenus.create({
  "id": "importddcode",
  "title": "@magento import code devdocs",
  "type": "normal",
  "contexts": ["editable"],
});

chrome.contextMenus.create({
  "id": "importddpr",
  "title": "@magento import pr devdocs",
  "type": "normal",
  "contexts": ["editable"],
});

chrome.contextMenus.create({
  "id": "importmdcode",
  "title": "@magento import code merchdocs",
  "type": "normal",
  "contexts": ["editable"],
});

chrome.contextMenus.create({
  "id": "importmdpr",
  "title": "@magento import pr merchdocs",
  "type": "normal",
  "contexts": ["editable"],
});

chrome.contextMenus.onClicked.addListener(checkPath);
chrome.contextMenus.onClicked.addListener(function (info, tabs) {
  if (tabs) {
    if (info.menuItemId === "importddcode") {
      chrome.tabs.query({ active: true }, function (tabs) {
        const msg = "ddcode";
        chrome.tabs.sendMessage(tabs[0].id, { "message": msg });
      })
    }
    if (info.menuItemId === "importmdcode") {
      chrome.tabs.query({ active: true }, function (tabs) {
        const msg = "mdcode";
        chrome.tabs.sendMessage(tabs[0].id, { "message": msg });
      })
    }
    if (info.menuItemId === "importddpr") {
      chrome.tabs.query({ active: true }, function (tabs) {
        const msg = "ddpr";
        chrome.tabs.sendMessage(tabs[0].id, { "message": msg });
      })
    }
    if (info.menuItemId === "importmdpr") {
      chrome.tabs.query({ active: true }, function (tabs) {
        const msg = "mdpr";
        chrome.tabs.sendMessage(tabs[0].id, { "message": msg });
      })
    }
  }
});



