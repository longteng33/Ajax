function ajax(method, url, callback, data, flag) {
    // （2） ajax对象 
    var xml = null;
    // IE6及以下没有这个方法，进行兼容性处理
    // 如果当前浏览器的window中有XMLHttpRequest，就令xml=new XMLHttpRequest()
    if (window.XMLHttpRequest) {
        xml = new XMLHttpRequest();
    } else {
        xml = new ActiveXObject("Microsoft.XMLHttp");
    }

    // （3） 初始化 HTTP 请求参数(请求方式, 地址, 同步异步)，用open方法,open(请求方式,地址,同步异步)
    // （4） 发送请求
    //  传入的请求类型get、post可能是小写，为了兼容性，将他们转化成大写
    method = method.toUpperCase();
    if (method == 'GET') {
        // 如果是get请求
        var date=new Date();
        timer=date.getTime();
        xml.open('GET', url + '?' + data+'timer='+timer, flag);
        xml.send();

    } else if (method == 'POST') {
        // 如果是post请求
        xml.open('POST', url, flag);
        xml.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xml.send(data);
    }

    // （5） 监控数据 
    xml.onreadystatechange = function () {
        if (xml.readyState == 4) {
            // （6） 检查数据 使用
            if (xml.status == 200) {
                callback(xml.responseText);
            }
        }
    }
}