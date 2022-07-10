const WebSocket = require('ws');
const url = "https://paper-api.alpaca.markets/v2/orders";
const socket = new WebSocket(url);

const auth =  {"action": "auth", "key": "PKJ0GD9V5U995S15P54B", "secret": "d8ckiH9XJORePVduYTPIH25DclyiOYeRSVtzvKUt"};
const subscribe = {
    "symbol": "AAPL",
    "qty": "1",
    "notional": "500",
    "side": "buy",
    "type": "market",
    "time_in_force": "day",
    "limit_price": "1000",
    "trail_price": "1000",
  }

socket.onmessage = function(event) {
    const data = JSON.parse(event.data);

    console.log(data);

    if (data[0]['msg'] == 'connected') {
        console.log('do auth');

        socket.send(JSON.stringify(auth));
    }

    if (data[0]['msg'] == 'authenticated') {
        socket.send(JSON.stringify(subscribe));
    }
}