We strive to resolve common issues and make them better with each release.

Inbetween releases we keep common issues here that people run into.

1) "Plugin Exited before we could connect"

```

plugin: plugin process exited: path=/bin/sh
panic: plugin exited before we could connect

```

This usually means there is a process hanging around that needs to be killed

```
ps -ef | grep chatprint
kill -9 xxxx
```

Change chatprint to whatever the name of the contract is, and then the xxx is the process id
