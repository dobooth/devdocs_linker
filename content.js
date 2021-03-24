
// Listening to messages in Context Script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var comment = document.getElementById("new_comment_field");
    comment.value = "@magento import code to magento-devdocs/devdocs";
})

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var comment = document.getElementById("new_comment_field");
    comment.value = "@magento import code to magento-devdocs/merchdocs";
})