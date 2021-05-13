// Listening to messages in Context Script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var comment = document.getElementById("new_comment_field");
    if(request.message === "ddcode"){
        comment.value = "@magento import code to magento-devdocs/devdocs";
    }
    if(request.message === "mdcode"){
        comment.value = "@magento import code to magento-devdocs/merchdocs";
    }
    if(request.message === "ddpr"){
        comment.value = "@magento import pr to magento-devdocs/devdocs";
    }
    if(request.message === "mdpr"){
        comment.value = "@magento import pr to magento-devdocs/merchdocs";
    }
})
