rm -f tpid

nohup ~/beecall/bin/node-v8.9.0-linux-x64/bin/node ~/beecall/server/dapps_bc_server.js > ~/beecall/logs/dapps_bc_server.log 2>&1 &

echo Start Success!