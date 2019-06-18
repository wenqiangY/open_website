## Overview

The `openchat-js` library contains everything you need to build web apps and NodeJS services that
interact with smart contracts running on openchat DAppChain.

To get started install `openchat-js` from NPM:

```shell
yarn add openchat-js
# or if you prefer...
npm install openchat-js
```

## Sample Code

You can find all the code on this page the [OpenChat JS samples repo](https://github.com/OpenChat/openchat-js-samples)
in the `quickstart` directory.

## Connecting to a DAppChain

The `Contract` class provides a convenient way to interact with a smart contract running on a openchat
DAppChain. Let's write a function that creates a `Contract` instance to interact with the sample
[ChatPrint][] smart contract from the openchat SDK...

```js
const {
  NonceTxMiddleware, SignedTxMiddleware, Client,
  Contract, Address, LocalAddress, CryptoUtils
} = require('openchat-js')

const { MapEntry } = require('./helloworld_pb')

/**
 * Creates a new `Contract` instance that can be used to interact with a smart contract.
 * @param privateKey Private key that will be used to sign transactions sent to the contract.
 * @param publicKey Public key that corresponds to the private key.
 * @returns `Contract` instance.
 */
async function getContract(privateKey, publicKey) {
  const client = new Client(
    'default',
    'ws://127.0.0.1:46658/websocket',
    'ws://127.0.0.1:46658/queryws'
  )
  // required middleware
  client.txMiddleware = [
    new NonceTxMiddleware(publicKey, client),
    new SignedTxMiddleware(privateKey)
  ]
  const contractAddr = await client.getContractAddressAsync('ChatPrint')
  const callerAddr = new Address(client.chainId, LocalAddress.fromPublicKey(publicKey))
  return new Contract({
    contractAddr,
    callerAddr,
    client
  })
}
```

## Writing data to a DAppChain

To mutate the state of a smart contract you need to call one of its public methods, to do so a
signed transaction must be sent to and validated by the DAppChain. Fortunately the `Contract` class
takes care of most of this when you use the `Contract.callAsync()` method.

The [ChatPrint][] smart contract has a public `SetMsg` method that can be called to store an
association between a key and a value. Let's write a function that calls this method...

```js
/**
 * Stores an association between a key and a value in a smart contract.
 * @param contract Contract instance returned from `getContract()`.
 */
async function store(contract, key, value) {
  const params = new MapEntry()
  params.setKey(key)
  params.setValue(value)
  await contract.callAsync('SetMsg', params)
}

```

## Reading data from a DAppChain

To read the state of a smart contract you need to call one of its public read-only methods, you can
do so by using the `Contract.staticCallAsync()` method.

The [ChatPrint][] smart contract has a public `GetMsg` method that can be called to look up an
association between a key and a value. Let's write a function that calls this method...

```js
/**
 * Loads the value associated with a key in a smart contract.
 * @param contract Contract instance returned from `getContract()`.
 */
async function load(contract, key) {
  const params = new MapEntry()
  // The smart contract will look up the value stored under this key.
  params.setKey(key)
  const result = await contract.staticCallAsync('GetMsg', params, new MapEntry())
  return result.getValue()
}
```

## Putting it all together

Now that we have all the pieces in place make sure that you have the DAppChain running and then
run the following code, you should see `Value: hello!` printed to the console.

```js
(async function () {
  const privateKey = CryptoUtils.generatePrivateKey()
  const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)

  const contract = await getContract(privateKey, publicKey)
  await store(contract, '123', 'hello!')
  const value = await load(contract, '123')
  console.log('Value: ' + value)
})()
```

[ChatPrint]: https://github.com/OpenChat/ChatPrint/master/src/ChatPrint.go
