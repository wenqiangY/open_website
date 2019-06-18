A basic example showcasing a simple Unity game interacting with an EVM-based OpenChat DappChain, using [OpenChat Unity SDK](https://github.com/openchat/unity3d-sdk).

Game instructions
----

Use the mouse cursor to click on the black canvas area to create colored tiles, each new player will have a different color on the canvas which is shared amongst all players.

Development
----

### 1. Run your own DappChain

Please consult the [OpenChat SDK docs](http://openchat.co/developers/docs/en/prereqs.html) for further instruction on running your own DappChain.

### 2. Download the example project (Unity Tiles Chain EVM)

```bash
git clone https://github.com/openchat/unity-tiles-chain-evm
```

### 3. Start the DappChain

```bash
cd unity-tiles-chain-evm

cd dappchain
wget https://private.delegatecall.com/openchat/osx/stable/openchat
chmod +x openchat

# Configure
./openchat init
cp genesis.example.json genesis.json

# Run
./openchat run
```

### 4. Build the Unity client
Open the Unity project located in `unityclient` folder. Open the `OpenChatTilesChainEvm` scene and build it.
