// ๐ผ๐น๐ณ๏ผ https://raw.githubusercontent.com/laoshur/MySelf/master/Surge/Panel.js
// ๐ญ๐๐๐๏ผhttps://raw.githubusercontent.com/fishingworld/something/main/groupPanel.js
// ๐๐ฉ๐๐๐ญ๐๏ผ2022.04.14 09:00

/*

[Script]
ไปฃ็้ๆฉ = type=generic,timeout=10,script-path=https://raw.githubusercontent.com/laoshur/MySelf/master/Surge/Panel.js,argument=icon=network&color=#86abee&group=๐๐ซ๐จ๐ฑ๐ฒ
  ๅฏนๅบๅๆฐ๏ผ
	icon๏ผๅพๆ 
	color๏ผๅพๆ ้ข่ฒ
	group๏ผ็ญ็ฅ็ปๅ็งฐ
	
[Panel]
ไปฃ็้ๆฉ = script-name=ไปฃ็้ๆฉ,update-interval=5

*/

;(async () => {

let params = getParams($argument);
let group=params.group;
let proxy = await httpAPI("/v1/policy_groups");
let groupName = (await httpAPI("/v1/policy_groups/select?group_name="+encodeURIComponent(group)+"")).policy;
var proxyName= [];
let arr = proxy[""+group+""];
let allGroup = [];

for (var key in proxy){
   allGroup.push(key)
    }

for (let i = 0; i < arr.length; ++i) {
proxyName.push(arr[i].name);
}

let index;

for(let i = 0;i < proxyName.length; ++i) {
	if(groupName==proxyName[i]){
index=i
	}
};

if($trigger == "button"){
index += 1;

if(index>arr.length-1){
	index = 0;
	}
$surge.setSelectGroupPolicy(group, proxyName[index]);

};

let name =proxyName[index];
let secondName;
let rootName = name;
if(allGroup.includes(rootName)==true){
	secondName = (await httpAPI("/v1/policy_groups/select?group_name="+encodeURIComponent(rootName)+"")).policy;
	name = name + ' โ ' + secondName
}

while(allGroup.includes(rootName)==true){
	rootName = (await httpAPI("/v1/policy_groups/select?group_name="+encodeURIComponent(rootName)+"")).policy;
}

if(arr[index].isGroup==true && secondName!= rootName){
name=name + ' โ ' + rootName;
}

    $done({
      title:group,
      content:name,
      icon: params.icon,
		"icon-color":params.color
    });
})();

function httpAPI(path = "", method = "GET", body = null) {
    return new Promise((resolve) => {
        $httpAPI(method, path, body, (result) => {
            resolve(result);
        });
    });
};

function getParams(param) {
  return Object.fromEntries(
    $argument
      .split("&")
      .map((item) => item.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}
