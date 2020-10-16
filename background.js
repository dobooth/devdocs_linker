var baseurl = "http://devdocs.magento.com";
var basemerch = "https://docs.magento.com/user-guide"

//md is a flag for merchdocs, which has a different base url
function openDevdocs(selectedText, md=0){
  //Handle selection having leading slash or not
  var slashed = selectedText.charAt(0);
  if ( slashed != '/') {
    baseurl = baseurl+'/';
  }
  //Assume .html but handle .md
  var extension = selectedText.slice(-3);
  if ( extension = '.md') {
    selectedText = selectedText.replace(".md",".html");
  }
  var theurl = baseurl+selectedText;
  if(md == 1){
    theurl = basemerch+selectedText;
  }
  window.open(theurl, '_blank');
  //Need to reset the var after each use.
  baseurl = "http://devdocs.magento.com";
  basemerch = "https://docs.magento.com/user-guide"
}

function checkPath(info, tab){
  //If it contains cotains 'guides', slash or not
  var selectedText = info.selectionText.toString().trim();
  var pass = selectedText.includes("guides");
  if(pass){
    // stript src from devdocs links
    selectedText = selectedText.replace("src","");
    openDevdocs(selectedText)
  }
  else if (/^\/?(src)?(\/cloud\/|\/codelinks\/|\/community\/|\/compliance\/|\/contributor-guide\/|\/extensions\/|\/marketplace\/|\/quality-patches\/|\/recommendations\/|\/release\/|\/schemas\/|\/security\/).*(\.(html|md))/.test(selectedText)){
    //if for devdocs not guides
    selectedText = info.selectionText.toString().trim();
    selectedText = selectedText.replace('src', '');
    var pass = /^\/?(src).*(\.(html|md))/.test(selectedText);
    openDevdocs(selectedText)
  }
  else if (/^\/?(src)(\/catalog\/|\/cms\/|\/configuration\/|\/customers\/|\/design\/|\/getting-started\/|\/images\/|\/magento\/|\/marketing\/|\/mcom\/|\/payment\/|\/quick-tour\/|\/reports\/|\/sales-channels\/|\/sales\/|\/shipping\/|\/stores\/|\/system\/|\/tax\/).*(\.(html|md))/.test(selectedText)){
    //if for src/ merchdocs
    selectedText = info.selectionText.toString().trim();
    selectedText = selectedText.replace('src', '');
    var pass = /^\/?(src).*(\.(html|md))/.test(selectedText);
    openDevdocs(selectedText, 1)
  }
  //Handle {{site.baseurl}}
  else if (/({{\s*?site.baseurl\s*?}}).*(.(html|md))/.test(selectedText)){
    var reg = /({{\s*?site.baseurl\s*?}})/;
    var selectedText = selectedText.replace(reg, '');
    openDevdocs(selectedText)
  }
  //Handle {{page.baseurl}}. Assume v2.4
  else if (/({{\s*?page.baseurl\s*?}}).*(.(html|md))/.test(selectedText)){
    var reg = /({{\s*?page.baseurl\s*?}})/;
    var selectedText = selectedText.replace(reg, 'guides/v2.4');
    openDevdocs(selectedText)
  }
  //Handle {{site.mage2bloburl}}. Assume v2.4
  else if (/({{\s*?site.mage2bloburl.*?version\s*?}}).*(.(p?html|xml|js|php))/.test(selectedText)){
    var reg = /({{\s*?site.mage2bloburl.*?version\s*?}})/;
    var selectedText = selectedText.replace(reg, 'https://github.com/magento/magento2/blob/2.4');
    window.open(selectedText, '_blank');
  }
  else{
    alert("Check selection: src/*.html(.md) and {{ site|page.baseurl|mage2bloburl }}/.(xml|(p)html|js|php)");

  }
}

chrome.contextMenus.create({
  "id": "devdocs",
  "title": "Open in Devdocs/Merchdocs",
  "type": "normal",
  "contexts": ["selection"],
});

chrome.contextMenus.onClicked.addListener(checkPath);