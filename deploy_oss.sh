#!/bin/sh

./tools/ossutilmac64 --config-file ./tools/ossconfig_beechat_web_cn cp -rf ./static/page/ios_install_bc2/beechat_224.plist  oss://bc2-apk-al/ios/plist/



# ./tools/ossutilmac64 --config-file ./tools/ossconfig_beechat_web_cn ls


# apk 包上传的OSS地址是 beechat-apk 北京


#?x-oss-process=image/resize,m_lfit,w_300,limit_0/auto-orient,0/quality,q_80