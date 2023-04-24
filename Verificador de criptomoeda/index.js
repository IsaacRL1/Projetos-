fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Ctether%2Cethereum%2Clitecoin%2Ccardano%2Cdogecoing&vs_currencies=usd&include_24hr_vol=true')
.them(res => res.json())
.them(jso => {
const container = document.querySelector('.container');
const coins = Object.getOwnPropertyNames(json);

for (let coin of coins) {
    const infomoeda = json['${coins}'];
    const preço = infomoeda.usd;
    const change = infomoeda.usd_24h_change.toFixed(5);

    container.innerHTML += '
    <div class="coin ${change < 0 ? 'falling" : 'rasing'}">
    <div class="coin-logo">
        <img src="images/${coin}.png">

    '
}

})