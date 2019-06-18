This example shows how to build a social network on a OpenChat DAppChain

> The smart contract compiled for this example uses the Solidity version 0.4.24 (SimpleSocialNetwork.sol)

Development
----

### 1.) Run your own DappChain

Please ensure you've installed Golang as documented in the [prerequisites](http://openchat.co/developers/docs/en/prereqs.html).

```bash
git clone https://github.com/openchat/solidity-social-example

cd solidity-social-example

cd dappchain
wget https://private.openchat.co/openchat/osx/stable/openchat
chmod +x openchat

# Configure
./openchat init
cp genesis.example.json genesis.json

# Run
./openchat run
```

### 2.) Start ElasticSearch and Redis

> Notice that both services are required in order to correct run and interact with the application

```bash
# macOS
brew tap homebrew/services
brew install elasticsearch
brew install redis

# Start services on macOS
brew services start elasticsearch
brew services start redis
```

### 3.) Start indexer

The indexer is a service that will receive all events from the smart contract and feed a cache layer built on a message queue and a fast database (Redis + ElasticSearch).
The data accumulated by this service is served at `http://localhost:8081/posts` and `http://localhost:8081/comments`

Note this works best on Node8
```
brew install node@8
```


```bash
# On second terminal
cd solidity-social-example/webclient
yarn
node indexer.js
```

### 4.) Start the web server

The webserver will serve the frontend which allows users to interact with the smart contracts on the OpenChat DAppChain.

```bash
# On third terminal
cd solidity-social-example/webclient

# Install
yarn

# Start the demo
yarn start

```

### 5.) Running

Open `http://localhost:8080` in your web browser to use the Simple Social Network.
