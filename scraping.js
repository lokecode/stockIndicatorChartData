const axios = require('axios')
const cherrio = require('cheerio')
const express = require('express')

async function getPriceFeed() {
    try {
        const siteUrl = 'https://coinmarketcap.com/'

        const { data } = await axios({
            method: "GET",
            url: siteUrl,
        })

        const $ = cherrio.load(data)
        const elemSelector = '#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div > div.h7vnx2-1.bFzXgL > table > tbody > tr'

        const keys = [
            'rank',
            'name',
            'price',
            '1h',
            '24h',
            '7d',
            'marketCap',
            'volume',
            'curculatingSupply',
        ]

        const stocks = [];

        $(elemSelector).each((parrentIdx, parrentElem) => {
            let keyIdx = 1
            const coinObj = {}
            
                $(parrentElem).children().each((childIdx, childElem) => {
                    const values = $(childElem).text()
    
                    if(values) {
                        if (parrentIdx <= 9) {
                            if (keyIdx == 2) {
                                coinObj[keys[1]] = values
                            }
                            if (keyIdx == 3) {
                                coinObj[keys[2]] = values
                            }
                        } else {
                            if (keyIdx == 1) {
                                coinObj[keys[1]] = values
                            }
                            if (keyIdx == 2) {
                                coinObj[keys[2]] = values
                            }
                        }

                        stocks[parrentIdx] = coinObj
                        keyIdx++
                    }
                }) 
        }) 
        console.log(stocks)

        return stocks
    } catch (err) {
        console.error(err)
        return []
    } 
}

console.log(getPriceFeed())
