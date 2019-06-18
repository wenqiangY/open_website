A basic example showcasing a simple HTML5 + WebSockets interacting with a OpenChat DappChain

Game instructions
----

Use the mouse cursor to click on the black canvas area to create colored tiles, each new player will have a different color on the canvas which is shared amongst all players

Development
----

### 1.) Download the example project (Tiles Chain)

```bash
git clone https://github.com/openchat/tiles-chain
```

### 2.) Start the DappChain

```bash
cd tiles-chain
mkdir tmpgopath
export GOPATH=`pwd`/tmpgopath

cd dappchain
wget https://private.openchat.co/openchat/osx/stable/openchat
chmod +x openchat

# Compile
export GOPATH=$GOPATH:`pwd`
make deps
make

# Configure
cd build
../openchat init
cp ../genesis.example.json genesis.json

# Run
../openchat run
```

### 3.) Start the web server

```bash
cd tiles-chain/webclient

# Install
yarn

# Compile protobuf
yarn run proto

# Start the demo
yarn start

```

### 5.) Running

The Tiles-Chain web interface will be available on `http://localhost:9000`
