# Devdocs Linker

This is a Chrome extension that opens relative devdoc links in a new browser tab.

It looks at a selected string and if it is recognized as a devdocs link, you can use the "Open in Devdocs" context menu to open the link.

## How to install

1. Clone this code to your local machine.
1. Open `chrome://extensions/` in Chrome.
1. Turn on Developer Mode in the top right corner.
1. Click the 'Load Unpacked' button that appeared.
1. Browse to the folder with the code and load it.

The 'Devdocs Link Opener' should show in your extension list. Go [check it out!](https://github.com/magento/devdocs/pulls)

## Recognized strings

We look for strings that can be construed to be devdocs links.
For instance: a string that start with `'/guides'` (with or without the inital slash) and ends in either `.md` or `.html`.

We also look for `{{ site|page.mage2bloburl }}` strings that end in `.php`, `.phtml`, `.html`, `.xml` and `.js`.

### Common examples

- A [Github issue title](https://github.com/magento/devdocs/issues/4681):

      /guides/v2.3/cloud/configure/setup-cron-jobs.html

- A file reference in a [Github files PR tab](https://github.com/magento/devdocs/pull/4715/files)

      guides/v2.1/javascript-dev-guide/widgets/jquery-widgets-about.md

- `{{ site.baseurl}}/path/to/file.md` paths found in source code.

      {{ site.baseurl }}/guides/v2.2/config-guide/cli/config-cli-subcommands-config-mgmt-set.html

- {{ page.baseurl }} paths in source code. Defaults to v2.3.

      {{page.baseurl}}/javascript-dev-guide/widgets/widget_redirectUrl.html

- `{{ site.mage2bloburl }}` will always default to v2.3.

      {{ site.mage2bloburl }}/{{page.guide_version}}/lib/internal/Magento/Framework/Setup/UninstallInterface.php
