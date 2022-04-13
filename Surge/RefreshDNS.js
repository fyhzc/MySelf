/*
* 𝑼𝑹𝑳: https://raw.githubusercontent.com/laoshur/MySelf/master/Surge/RefreshDNS.js
// Refresh DNS = type=generic,timeout=10,script-path=https://raw.githubusercontent.com/zZPiglet/Task/master/asset/flushDNS.js
// https://raw.githubusercontent.com/love499520/mask_angel/master/RefreshDNS.js

[Script]
Refresh DNS = type=generic,timeout=10,script-path=https://raw.githubusercontent.com/laoshur/MySelf/master/Surge/RefreshDNS.js,argument=icon=arrow.clockwise&color=#3d3d5b

[Panel]
Refresh DNS = script-name=Refresh DNS,update-interval=-1

*/

!(async () => {
    let dnsCache = (await httpAPI("/v1/dns", "GET")).dnsCache;
    dnsCache = [...new Set(dnsCache.map((d) => d.server))].toString().replace(/,/g, "\n");
    await httpAPI("/v1/dns/flush");
    let delay = ((await httpAPI("/v1/test/dns_delay")).delay * 1000).toFixed(0);
    let panel = {
        title: "𝐑𝐞𝐟𝐫𝐞𝐬𝐡𝐃𝐍𝐒",
        content: `delay: ${delay}ms${dnsCache ? `\nserver:\n${dnsCache}` : ""}`,
    };
    if (typeof $argument != "undefined") {
        let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=")));
        panel.icon = arg.icon;
        panel["icon-color"] = arg.color;
    }
    $done(panel);
})();

function httpAPI(path = "", method = "POST", body = null) {
    return new Promise((resolve) => {
        $httpAPI(method, path, body, (result) => {
            resolve(result);
        });
    });
}
