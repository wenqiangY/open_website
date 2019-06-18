OpenChat Network is building a fundamental infrastructure platform to help Ethereum scale.
It allows developers to run large-scale applications, and is the first Ethereum scaling solution to be live in production.

In short, you can think of OpenChat Network as EOS on top of Ethereum.

## The OpenChat SDK
Our core product is an SDK that allows developers to quickly build their own blockchains without having to understand blockchain infrastructure. Think of it like a “build your own blockchain” generator.

## DAppChain: Each DApp On Its Own Sidechain
The OpenChat SDK generates what’s called a DAppChain — a layer-two blockchain that uses Ethereum as its base-layer.
Running each DApp on its own sidechain to Ethereum has a number of benefits, but most importantly:
DAppChain can use alternative consensus rulesets (like DPoS) that optimize for high scalability.
Using Ethereum as a base-layer means DAppChain-based assets (like ERC20 and ERC721 tokens) can have the security guarantees of Ethereum, especially when backed by Plasma.

## DPoS = Massively Scalable DApps
Our SDK allows developers to choose their consensus algorithm and rulesets to customize the scalability / security tradeoffs to their DApps needs.
Out of the box we support DPoS (Delegated Proof of Stake), which enables large-scale online games and social apps — the 2 initial types of DApps we’re focusing on (though you can build any type of DApp on the OpenChat SDK).
Secured by Plasma on Ethereum
DAppChain use Plasma-based relays to transfer assets back and forth from Ethereum, which allows ERC20 and ERC721 tokens to be used on the DAppChain while still being secured by Ethereum.
In short, the OpenChat SDK enables developers to build the same types of apps they would build on EOS, but have them backed by Ethereum.

# Understanding DAppChain
To better understand our core thesis on scaling and the benefits of DAppChain

# OCPlasmaChain

## OCPlasmaChain: A Plasma Cash-backed Hub for Transacting Between Sidechains and Ethereum Mainnet
A few months back, we announced ChatChain: “An EOS-like DPoS sidechain for Ethereum DApps.”
Since we made that announcement, ChatChain has evolved considerably.
What happened is, we started building the marketplace for Chat Battleground on top of ChatChain — and as our feature list grew, we realized this chain had potential to become something much larger than originally intended.
So we decided to upgrade this chain to have it play an even more important role in the future of our vision: It’s going to become a central hub for token transactions, linked to Ethereum by Plasma Cash.
Think of it like a bridge to Ethereum mainnet with a built-in Decentralized Exchange (DEX), that other sidechains can use for faster and cheaper transactions without ever touching mainnet.
Such an important role demands an important name. Thus, we’ve decided to rebrand ChatChain to “OCPlasmaChain.”

OCPlasmaChain: The Sidechain Formerly Known as ChatChain.
### Here are some of the features that will be built into OCPlasmaChain:
* Plasma Cash link to mainnet for native ETH, ERC20, and NFT (ERC721) support
* Built-in DEX / marketplace functionality
* Native payments in ETH and OpenChat
* Plans to integrate BTC payments in the future
* Plans to enable Plasma Cash links to “Layer 3” chains, with OCPlasmaChain as the parent chain. (Think “sidechains of sidechains”, in which * OCPlasmaChain is the clearinghouse that enables trading of tokens between multiple sidechains without hitting mainnet.)

Here’s the thing: The Chat Battleground Marketplace is ALREADY RUNNING on OCPlasmaChain as you read this.
We will also be deploying multiple testnets in the near future, which we will open to third parties to deploy their DApps.
These testnets may later evolve to become their own specialized production chains. But in the meantime, they’ll help us test third-party DApps and experiment with new features to eventually incorporate into the production OCPlasmaChain.
As the central hub that acts as a bridge between multiple sidechains and Ethereum, OCPlasmaChain will be one of the most important pieces in our vision moving forward.
