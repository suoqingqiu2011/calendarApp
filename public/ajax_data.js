var $ = {
    request:function(obj){
        var xhr;
        try {
            //主流浏览器里面的ajax对象
            xhr = new XMLHttpRequest();
        } catch(e) {
            alert("Please change the navigateur.");  
        }

        //建立和服务器的连接
        if (obj.method == 'get') {
            xhr.open(obj.method,obj.url+'?'+obj.data+'&'+Math.random(),true);
            xhr.send();
        } else if (obj.method == 'post') {
            xhr.open(obj.method,obj.url,true);
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xhr.send(obj.data);
        }
        //监视服务器的处理状态
        xhr.onreadystatechange = function(){
            if (4 == xhr.readyState && 200 == xhr.status) {
                //说明请求成功了，输出服务器返回的数据
                obj.callback(xhr.responseText);
            }
        }
    }
}