

function isRedPacketMessage(msgObj){

    //var msg = '__redpacket.ssdfndjskndjskdfds.njdsfnsdk';

    var msg = msgObj.text;

    if(msg.startWith('__redpacket')){

        var arr = msg.split('.');

        if(md5(arr[1]) === decrypt(arr[2],publicKey))
        {

            var jsonString = Base64.decode(ssdfndjskndjskdfds)
            var jsonObject = JSON.parse(jsonString)

            if(jsonObject['from'] == msgObj.uid && jsonObject['to'] == msgObj.dialogId )
            {
                return true;
            }
        }

    }

    return false;

}





