Etherboy is a multi-platform 2D game built in Unity, using the [OpenChat Unity SDK][] to interact with a
smart contract written in Golang and running on a OpenChat DAppChain.

## Game Controls

### Desktop / WebGL

- **UP**: enter doors, go up ropes
- **DOWN**: go down ropes
- **E**: talk to NPCs, sleep in bed, interact with objects
- **SPACE** / **RIGHT-CLICK**: jump
- **LEFT-CLICK**: attack (when weapon is equipped)

## Supported Platforms

- WebGL
- Android (WIP)
- iOS (WIP)
- Windows / Mac / Linux

## Development

Currently you need to be on MacOS or Linux to spin up a OpenChat DAppChain, but if you're on Windows 10
you can run Ubuntu in the [Windows Subsystem for Linux][] (other distros may work but docs are
written for Ubuntu).

### MacOS

1. Install Golang by following the steps in [MacOS prerequisites][] (if you haven't done so already).
2. Download OpenChat DAppChain binary
   ```bash
   wget https://private.openchat.co/openchat/osx/stable/openchat
   chmod +x openchat
   export OPENCHAT_BIN=`pwd`/openchat
   ```

### Linux

1. Install Golang by follwing the steps in [Ubuntu prerequisites][]  (if you haven't done so already).
2. Download OpenChat DAppChain binary
   ```bash
   curl -OL https://private.openchat.co/openchat/linux/stable/openchat
   chmod +x openchat
   export OPENCHAT_BIN=`pwd`/openchat
   ```

### Deploy Etherboy contract (OSX / Linux)

Fetch the smart contract code from Github
```bash
export GOPATH=`pwd`/ebgopath
mkdir -p ebgopath/src/github.com/openchat
cd ebgopath/src/github.com/openchat
git clone https://github.com/openchat/etherboy-core.git etherboy-core
```

Build and deploy the contract
```bash
cd etherboy-core
make deps
make
cd run
$OPENCHAT_BIN init
cp ../genesis.json genesis.json
$OPENCHAT_BIN run
```

Assuming everything went without a hitch so far you now have a local OpenChat DAppChain running the
Etherboy smart contract!

### Build the Unity project

Clone the Unity project for the [Etherboy game][] from Github and modify

- Open the project in Unity
- Select `File`->`Build Settings`
- Select either `Web GL` or `PC, Mac & Linux Standalone` from the platform list
- Press `Switch Platform` if it's enabled
- Press `Build`, select the build output directory

> WebGL builds of the full game take around 30 minutes to complete.

### Run the game

#### Desktop

Just launch the binary generated in the build output directory. If you have issues logging in
please ensure nothing is running on port `9998`.

#### WebGL

Run an http server to serve the build output directory at `localhost:8090`, and open
`localhost:8090` in your web browser.

If you don't know how to set up a local http server follow the steps below.

```bash
brew install node
npm install http-server -g
cd path/to/webgl-build-dir
http-server -a localhost -p 8090
```

### Optional configuration

If you configure your local DAppChain to run on another host or port you'll need to update the
following section of `Assets/WebGLTemplates/openchat/settings.js` before doing a **WebGL** build, or
you can edit `settings.js` inside the build output directory after the build:

```js
  dappchain: {
    writeUrl: 'http://localhost:46658/rpc',
    readUrl: 'http://localhost:46658/query'
  }
```

For a desktop build you'll need to edit `Assets/Resources/env_config.json` to change the default
DAppChain host & port:

```json
{
    "write_host": "http://localhost:46658/rpc",
    "read_host": "http://localhost:46658/query"
}
```

[MacOS prerequisites]: prereqs.html
[Ubuntu prerequisites]: prereqs-ubuntu.html
[Windows Subsystem for Linux]: https://docs.microsoft.com/en-us/windows/wsl/install-win10
[OpenChat Unity SDK]: unity-sdk.html
[Etherboy game]: https://github.com/openchat/Etherboy
[Etherboy smart contract]: https://github.com/openchat/etherboy-core
