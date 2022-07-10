const tulind = require('tulind');
const log = console.log;


var close = [4,5,6,6,6,5,5,5,6,4];

// log(tulind.indicators.sma);
tulind.indicators.rsi.indicator([close],[2],(err,res) => {
    if(err) return log(err);
    log(res[0]);
    log(res[0].slice(-1)[0]);
});