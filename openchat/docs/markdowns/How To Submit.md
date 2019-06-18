## Instructions
We accept submissions to our DApp list via pull request.

Once you’ve tested your DApp thoroughly on OpenChat and addressed any issues, make a pull request to openchat-react with the following:

Add a square icon for your DApp (180x180 png) with a colored (non-white) background to resources/images/contacts. The file name should match your DApp, e.g. my-dapp.png. Please do not include any text. Note that the icon will be round cropped.

Add information about your icon to src/openchat_im/react_native/resources.cljs. For example:
```
:my-dapp (js/require "./resources/images/contacts/my-dapp.png")
```

Add your DApp to the appropriate category list in src/openchat_im/ui/screens/browser/default_dapps.cljs:
```
{:title (i18n/label :t/default-dapps-fun-games)
 :data [{:name        "CryptoKitties"
         :dapp-url    "https://www.cryptokitties.co"
         :photo-path  "contacts://cryptokitties"
         :description "Collect and breed adorable digital cats."}
```

## Link to your DApp
You can deep link to any DApp in OpenChat using this format:
```
https://get.openchat.co/browse/website.com
```
You can also use the Share link button from the options menu within the OpenChat browser.
