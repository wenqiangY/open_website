# Overview

A template for a OpenChat DAppChain with a Unity client. Contains:

- Template [`chatprint` Solidity contract](https://github.com/openchat/OpenChat-unity-project-template/blob/master/TruffleProject/contracts/chatprint.sol) implementing a basic string-to-string map. Perfect as a starting point.
- Pre-configured Truffle project that automatically extracts ABIs and binaries of compiled contracts into corresponding folders.
- Pre-configured optimally setup Unity project with `chatprint` contract test scene, and an already included OpenChat SDK.

# Template Structure

```shell
├── DAppChain/
│   ├── build/ # OpenChat binary and app/blockchain state data will be stored here
│   │   ├── contracts/ # Compiled contracts .bin will go here
│   │   └── ...
│   ├── start-chain.sh # Starts the OpenChat DAppChain
│   ├── reset-and-start-chain.sh ## Resets app/blockchain state and starts the OpenChat DAppChain
│   ├── genesis.json # Change this file when changing/adding contracts
│   └── ...
├── TruffleProject/
│   └── ...
└── UnityClient/ # Unity client project
    ├── Assets/
    │   ├── Contracts/ # Contract ABIs will go here
    │   └── ...
    └── ...
```

-------------------

## Getting the Template

First, you need to install Truffle, if it isn't installed already:

```shell
npm install -g truffle
```

After that, you can download the template itself:

```shell
git clone https://github.com/openchat/OpenChat-unity-project-template.git
```

Feel free to rename the `OpenChat-unity-project-template` folder right away according to the name of your project.

## Building the Truffle Project

```shell
# Build the Truffle project. This will extract the ABI files to the Unity client,
# and compiled contracts to the DAppChain/build/ directory

cd Truffle
truffle build
```

## Running the DAppChain

```shell
# Start the OpenChat DAppChain. OpenChat binary will be downloaded automatically

cd DAppChain
./start-chain.sh
```

## Running the Unity client

Open the Unity project located in `UnityClient`. Open the `chatprint/chatprintTest` scene and run/build it.

# Workflow

1. Make changes to the contracts.
2. Build the Truffle project using `truffle build`.
3. Start the OpenChat DAppChain using `DAppChain/start-chain.sh`.
4. Make changes to the Unity client project.
