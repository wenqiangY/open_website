A basic example showcasing a simple HTML5 + WebSockets interacting with a OpenChat DappChain

Game instructions
----

Use the mouse cursor to click on the black canvas area to create colored tiles, each new player will have a different color on the canvas which is shared amongst all players

Development
----

### 1.) Run your own DappChain

Please consult the [OpenChat SDK docs](http://openchat.co/developers/docs/en/prereqs.html) for further instruction on running your own DappChain.

### 2.) Download the example project (Tiles Chain EVM)

```bash
git clone https://github.com/openchat/tiles-chain-evm
```

### 3.) Start the DappChain

```bash
cd tiles-chain-evm

cd dappchain
wget https://private.openchat.co/openchat/osx/stable/openchat
chmod +x openchat

# Configure
./openchat init
cp genesis.example.json genesis.json

# Run
./openchat run
```

### 4.) Start the web server

```bash
# On second terminal
cd tiles-chain-evm/webclient

# Install
yarn

# Start the demo
yarn start
```

### 5.) Running

The Tiles-Chain web interface will be available on `http://localhost:9000`
