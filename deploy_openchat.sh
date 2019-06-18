#!/bin/sh

#rsync -rave 'ssh -o ProxyCommand="/usr/bin/nc -X 5 -x 127.0.0.1:10087 %h %p" -p 58022 -i  ~/.ssh/luan' --progress --exclude-from ./rsync_exclude  ./  luanhaipeng@47.74.20.215:/tmp/beecall2/


#169.56.150.19  sfhkss001

rsync -rave 'ssh -o ProxyCommand="/usr/bin/nc -X 5 -x 127.0.0.1:10087 %h %p" -p 58022 -i  ~/.ssh/luan' --progress --exclude-from ./rsync_exclude  ./  luanhaipeng@169.56.150.19:/tmp/beecall2/



##      ssh -o ServerAliveInterval=60 -o ProxyCommand="/usr/bin/nc -X 5 -x 127.0.0.1:10087 %h %p" -o "StrictHostKeyChecking no" -i ~/.ssh/luan  -p 58022 luanhaipeng@47.74.20.215


##     这个网站的域名是 http://openchat.co , 使用 新加坡 跳板机 。  ssh  -D  127.0.0.1:10087 luanhaipeng@47.74.182.219





##  rsync -rave --progress  /tmp/beecall2/ ~/beecall/