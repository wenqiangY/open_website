In order to access an Ethereum provider (especially after November 2, 2018), you will need to request permission from the user, rather than automatically injecting web3 into the page.

You can read the full rationale on our blog.

## Include the web3.js Library in Your Project
This can be done different ways depending on the structure of your project and the flavour of JS you happen to be using. Most often it looks something like this:
```
import Web3 from 'web3'
```

## Create a New Web3 Object
After importing Web3 from the library you’re using, you need to make sure it is instantiated for that page/app:
```
web3 = new Web3(ethereum)
```

## Request Full Access to the Provider
```
window.addEventListener('load', async () => {
    // Read-only provider is exposed by default
    console.log(await ethereum.send('net_version'));
    try {
        // Request full provider if needed
        await ethereum.enable();
        // Full provider exposed
    } catch (error) {
        // User denied full provider access
    }
});
```
Note the read-only provider in the first line, which is exposed by default. Accessing the user’s address and initiating transactions or signing messages requires the ethereum.enable() call to be accepted by the user.
