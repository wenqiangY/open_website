This doc is for developers on how they can join the OCPlasmachain Testnet to do deployment. If you are looking for information on how to run nodes, or to become a validator please checkout [Validator Guide](validator.html)

**Prerequisite**
 - OpenChat installed

```bash
 curl https://raw.openchat.co/openchat-sdk-documentation/master/scripts/get_openchat.sh | sh
 ```

**How to generate a private key with OpenChat and get your public address**

```
$ ./openchat genkey -k priv_key -a pub_key
```

and this will create files named `priv_key` and `pub_key`,
the `priv_key` file contains your private key that you'll use to deploy contracts to the DAppChain.

# Deploy Truffle Example to a Testnet

1. Make sure you have node and yarn/npm installed
2. Obtain the testnet URL from [OCPlasmachain Testnets](testnet-plasma.html) page
3. Get the source:
    ```bash
    git clone https://github.com/OpenChat/truffle-dappchain-example
    cd truffle-dappchain-example
    # copy the private key generated earlier to the root directory of the example repo
    cp ../priv_key extdev_private_key
    ```
4. If you wish to deploy the example contracts to `extdev-plasma-us1` skip this step. Otherwise,
   add the network you wish to deploy to in `truffle-config.js`.
5. Install node modules:
    ```bash
    yarn
    ```
6. Run deploy:
    ```bash
    yarn deploy:extdev
    ```
