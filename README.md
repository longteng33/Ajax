# Ajax
使用js手动封装ajax函数  
1、ajax函数，用于向后台发送请求，请求之后返回数据，或者什么都不返回，只单纯地向后台发送请求  
2、ajax函数一般接收这几个形参，请求方式、请求地址（接口）、发送数据等  
3、ajax封装过程  
1）创建ajax对象  
2）初始化 HTTP 请求参数(请求方式, 地址, 同步异步)   
3）发送请求  
4）监控数据  
5）检查数据，使用数据  

``` function ajax(method, url, callback, data, flag) {
    形参  
    method：请求方式  
    url：请求地址  
    callback：回调函数  
    data：发送的数据  
    flag：同步还是异步  
    // （1） 创建ajax对象 
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
}```
