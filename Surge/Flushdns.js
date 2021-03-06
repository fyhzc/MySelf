// ð¼ð¹ð³ï¼ https://raw.githubusercontent.com/laoshur/MySelf/master/Surge/Flushdns.js
// ð­ðððï¼https://raw.githubusercontent.com/githubdulong/Script/master/surgepro_flushdns.js
// ðð©ððð­ðï¼2022.04.14 09:00

let params = getParams($argument)

!(async () => {
/* æ¶é´è·å */
let traffic = (await httpAPI("/v1/traffic","GET"))
let dateNow = new Date()
let dateTime = Math.floor(traffic.startTime*1000)
let startTime = timeTransform(dateNow,dateTime)
let title = params.title

if ($trigger == "button") await httpAPI("/v1/dns/flush");

  $done({
      title:title,
      content:`å¯å¨æ¶é¿: ${startTime}`,
		icon: params.icon,
		"icon-color":params.color
    });

})();

function timeTransform(dateNow,dateTime) {
let dateDiff = dateNow - dateTime;
let days = Math.floor(dateDiff / (24 * 3600 * 1000));//è®¡ç®åºç¸å·®å¤©æ°
let leave1=dateDiff%(24*3600*1000)    //è®¡ç®å¤©æ°åå©ä½çæ¯«ç§æ°
let hours=Math.floor(leave1/(3600*1000))//è®¡ç®åºå°æ¶æ°
//è®¡ç®ç¸å·®åéæ°
let leave2=leave1%(3600*1000)    //è®¡ç®å°æ¶æ°åå©ä½çæ¯«ç§æ°
let minutes=Math.floor(leave2/(60*1000))//è®¡ç®ç¸å·®åéæ°
//è®¡ç®ç¸å·®ç§æ°
let leave3=leave2%(60*1000)      //è®¡ç®åéæ°åå©ä½çæ¯«ç§æ°
let seconds=Math.round(leave3/1000)

if(days==0){

	if(hours==0){
	if(minutes==0)return(`${seconds}ç§`);
	return(`${minutes}å${seconds}ç§`)
	}
	return(`${hours}æ¶${minutes}å${seconds}ç§`)
	}else {
	return(`${days}å¤©${hours}æ¶${minutes}å`)
	}

}

function httpAPI(path = "", method = "POST", body = null) {
    return new Promise((resolve) => {
        $httpAPI(method, path, body, (result) => {
            resolve(result);
        });
    });
}

function getParams(param) {
  return Object.fromEntries(
    $argument
      .split("&")
      .map((item) => item.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}
