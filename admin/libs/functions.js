//让Object.assign兼容ie
export function objectAssign() {
    if (typeof Object.assign !== 'function') {
        Object.assign = function (target) {
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }
            var output = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source !== undefined && source !== null) {
                    for (var nextKey in source) {
                        if (source.hasOwnProperty(nextKey)) {
                            output[nextKey] = source[nextKey];
                        }
                    }
                }
            }
            return output;
        };
    }
}

//动态插入js
export function createScript(url, callback) {
    var oScript = document.createElement('script');
    oScript.type = 'text/javascript';
    oScript.async = true;
    oScript.src = url;
    /*
     ** script标签的onload和onreadystatechange事件
     ** IE6/7/8支持onreadystatechange事件
     ** IE9/10支持onreadystatechange和onload事件
     ** Firefox/Chrome/Opera支持onload事件
     */
    // 判断IE8及以下浏览器
    var isIE = !-[1,];
    if (isIE) {
        oScript.onreadystatechange = function () {
            if (this.readyState == 'loaded' || this.readyState == 'complete') {
                callback();
            }
        }
    } else {
        // IE9及以上浏览器，Firefox，Chrome，Opera
        oScript.onload = function () {
            callback();
        }
    }
    document.body.appendChild(oScript);
}

export function createStyle(url) {
    let doc = document;
    let link = doc.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", url);

    var heads = doc.getElementsByTagName("head");
    if (heads.length) {
        heads[0].appendChild(link);
    } else {
        doc.documentElement.appendChild(link);
    }
}


export function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = decodeURI(window.location.search).substr(1).match(reg);
    if (r != null)return r[2];
    return null;
}

export function getCookie(name) {
    let arrStr = document.cookie.split(";");
    for(let i = 0;i < arrStr.length;i ++){
        let temp = arrStr[i].split("=");
        let tempName = temp[0].replace(/ /,"");
        if(tempName == name){
            return temp[1];
        }
    }
}


