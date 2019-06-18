#!/bin/sh

rsync -rave 'ssh -o ProxyCommand="/usr/bin/nc -X 5 -x 127.0.0.1:10087 %h %p" -p 58022 -i  ~/.ssh/luan' --progress --exclude-from ./rsync_exclude  ./  luanhaipeng@47.74.19.84:/tmp/beecall2/

##      ssh -o ServerAliveInterval=60 -o ProxyCommand="/usr/bin/nc -X 5 -x 127.0.0.1:10087 %h %p" -o "StrictHostKeyChecking no" -i ~/.ssh/luan  -p 58022 luanhaipeng@47.74.19.84



##     网站的域名已经不叫beecall已经改名为   beechat.io



##     rsync -rave --progress  /tmp/beecall2/ ~/beecall/