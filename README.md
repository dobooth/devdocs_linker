# Adobe/Magento Linker

This is a Chrome extension that opens relative AdobeDocs and Magento doc links in a new browser tab.

It looks at a selected string and if it is recognized as a devdocs/mercdocs/AdobeDocs path, you can use the "Open in Adobe/Magento" context menu to open the link.

## How to install

1. Clone this code to your local machine.
1. Open `chrome://extensions/` in Chrome.
1. Turn on Developer Mode in the top right corner.
1. Click the 'Load Unpacked' button that appeared.
1. Browse to the folder with the code and load it.

The 'Adobe/Magento Link Opener' should show in your extension list.

## Recognized strings

We look for text selections that can be construed to be Devdocs/Merchdocs links.
For instance: a selection that start with `src/guides` (with or without the initial slash) and ends in either `.md` or `.html`.

We also look for `{{ site | page | mage2bloburl }}` strings that end in `.php`, `.phtml`, `.html`, `.xml` and `.js`.

### Usage and example strings

Test your extension with these sample strings.

1. Select an example string below.
1. Right click and choose "Open in Devdocs" from the context menu.

- A [Github issue title](https://github.com/magento/devdocs/issues/8066):

      /cloud/docker/docker-config.html

- A file reference in a [Github files PR tab](https://github.com/magento/devdocs/pull/8073/files):

      src/guides/v2.4/javascript-dev-guide/widgets/jquery-widgets-about.md

- Paths start with `src`. Depending on the folder after `src` we sent to merchdocs or devdocs.

      src/configuration/advanced.md

- `{{ site.baseurl}}/path/to/file.md` paths found in source code:

      {{ site.baseurl }}/guides/v2.2/config-guide/cli/config-cli-subcommands-config-mgmt-set.html

- `{{ page.baseurl }}` paths in source code. Defaults to v2.4:

      {{page.baseurl}}/javascript-dev-guide/widgets/widget_prompt.html

- `{{ site.mage2bloburl }}` will always default to v2.4:

      {{ site.mage2bloburl }}/{{page.guide_version}}/lib/internal/Magento/Framework/Setup/UninstallInterface.php


### AdobeDocs

Version 0.4 adds link opening support for the PWA repo on AdobeDocs.

## @magento

To assist in importing code, a "@magento import" context menu will appear when in the "New Comment" text area in a Github PR page.
There are options for devdocs and merchdocs.
Selecting this menu, you can add either:

- `@magento import code to magento-devdocs/devdocs` 
- `@magento import code to magento-devdocs/merchdocs` 
- `@magento import pr to magento-devdocs/devdocs` 
- `@magento import pr to magento-devdocs/merchdocs` 

to the text area.