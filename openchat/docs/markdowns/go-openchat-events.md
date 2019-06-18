## Emitting events from go-plugins

The openchat sdk gives gives a facility for the contracts to emit events that can be used for multiple
purposes such as indexng. Currently the openchat sdk supports emitting events into a Redis sorted set.


### Configuring the openchat sdk

By default the openchat-sdk will only emit events to the log. To configure it to send it to a redis
sorted set, add the following line to the openchat.yaml config file.

```
EventDispatcherURI: "redis://localhost:6379"
```

This will start emitting events to the redis server in a sorted set called `openchatevents`.
Each event is added to the sorted set with the score being the blockchain height.

### Emitting events

The code snippet below shows sample code for emitting events from the contract.

```go
	emitMsg := struct {
		Owner  string
		Method string
		Addr   []byte
	}{owner, "createacct", addr}
	emitMsgJSON, err := json.Marshal(emitMsg)
	if err != nil {
		log.Println("Error marshalling emit message")
	}
	ctx.Emit(emitMsgJSON)
```

### Subscribing to events

See [this page](openchatevents.html) for more information on subscribing to events
