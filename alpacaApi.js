const WebSocket = require('ws');
const url = "wss://stream.data.alpaca.markets/v1beta1/crypto";
const socket = new WebSocket(url);

const auth =  {"action": "auth", "key": "PKBRAN3GVLCSO6KPH2M3", "secret": "cUfvvgxM1kaZySt8qS48BJHEKecVjzaCVPfZUyUr"};
const subscribe = {"action":"subscribe", "trades":["ETHUSD"], "quotes":["LTCUSD", "ETHUSD"], "bars":["ETHUSD"]}

socket.onmessage = function(event) {
    const data = JSON.parse(event.data);

    console.log(data);

    if (data[0]['msg'] == 'connected') {
        console.log('do auth');

        socket.send(JSON.stringify(auth));
    }

    if (data[0]['msg'] == 'authenticated') {
        socket.send(JSON.stringify(auth));
    }
}

