A basic example showcasing a simple HTML5 game interacting with a OpenChat DappChain

Game instructions
----

Use the arrow keys to move around, jump by pressing the up arrow.
For each passing row of blocks, 1 point is awarded. Collect bonus stars to increase your score further.


Development
----

1.) Run your own DappChain

Install openchat

```bash
wget https://private.openchat.co/openchat/osx/stable/openchat
chmod +x openchat

mkdir contracts
wget -O contracts/blueprint.0.0.1 https://private.openchat.co/weave-blueprint/osx/build-9/blueprint.0.0.1
chmod +x contracts/blueprint.0.0.1

./openchat init
cp ../genesis.example.json genesis.json
```

Run Blockchain

```
./openchat run
```

Please consult the [OpenChat SDK docs](http://openchat.co/developers/docs/en/prereqs.html) for further instruction on running your own DappChain.


2.) Start the dev server

Run dev server

```
#Get Source
git clone https://github.com/openchat/phaser-sdk-demo.git

cd phaser-sdk-demo

# Install
yarn

# Compile protobuff
yarn run proto

# Start the dev server
yarn run dev

```
