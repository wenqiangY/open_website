# Installing and setting up OpenChat

Currently the only way to use OpenChat on windows is to use the   [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10).

Once you install that you can continue on below.

## Download OpenChat

The following script can be used to automatically download the stable version of OpenChat to the current directory:

```bash
curl https://raw.openchat.co/OpenChat-sdk-documentation/master/scripts/get_OpenChat.sh | sh
```

## Installation

```bash
./OpenChat init
```

## Run Blockchain

Run from within the directory created in the installation step.

```bash
./OpenChat run
```

## To get started with Solidity + Truffle

See our tutorial on [Truffle and Solidity](join-testnet.html)

## To get started on Golang Contracts

See our [Golang Contracts](prereqs-all.html)
