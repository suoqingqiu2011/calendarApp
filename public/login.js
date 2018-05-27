
function fnLogin() {
    var oUname = document.getElementById("uname");
    var oUpass = document.getElementById("upass");
    var oError = document.getElementById("error_box");
    var isError = true;
    if (oUname.value.length > 20 || oUname.value.length < 6) {
        oError.innerHTML = "Please insert 6-20 bits for name";
        isError = false;
        return;
    }else if((oUname.value.charCodeAt(0)>=48) && (oUname.value.charCodeAt(0)<=57)){
        oError.innerHTML = "The first must be letter";
        return;
    }else for(var i=0;i<oUname.value.charCodeAt(i);i++){
        if((oUname.value.charCodeAt(i)<48)||(oUname.value.charCodeAt(i)>57) && (oUname.value.charCodeAt(i)<97)||(oUname.value.charCodeAt(i)>122)){
            oError.innerHTML = "it must have letters and numbers";        
        }
        
    }

    if (oUpass.value.length > 20 || oUpass.value.length < 6) {
        oError.innerHTML = "Please insert 6-20 bits for password";
        isError = false;
        return;
    }
  
    if(oUname.value=="a123456" && oUpass.value=="123456"){
        window.name=reUname();
        window.alert("login succesful "+reUname());  
  
        window.location.href="/logout";   
    }else{
        oError.innerHTML = "login fail";
        isError = false;
        return;  
    }
}


function reUname() {
     var oUname = document.getElementById("uname");
    return oUname.value;
}


function fnRegist() {
    var oUname = document.getElementById("uname");
    var oUpass = document.getElementById("upass");
    var oError = document.getElementById("error_box");
    var isError = true;
    if (oUname.value.length > 20 || oUname.value.length < 6) {
        oError.innerHTML = "Please insert 6-20 bits for name";
        isError = false;
        return;
    }else if((oUname.value.charCodeAt(0)>=48) && (oUname.value.charCodeAt(0)<=57)){
        oError.innerHTML = "The first must be letter";
        return;
    }else for(var i=0;i<oUname.value.charCodeAt(i);i++){
        if((oUname.value.charCodeAt(i)<48)||(oUname.value.charCodeAt(i)>57) && (oUname.value.charCodeAt(i)<97)||(oUname.value.charCodeAt(i)>122)){
            oError.innerHTML = "it must have letters and numbers";        
        }
        
    }

    if (oUpass.value.length > 20 || oUpass.value.length < 6) {
        oError.innerHTML = "Please insert 6-20 bits for password";
        isError = false;
        return;
    }
  
    if(oUname.value!="a123456" ){
        
        window.alert("Regsit succesful "+reUname());  
  
        window.location.href="/login";   
    }else{
        oError.innerHTML = "Regist fail,this name exsits";
        isError = false;
        return;  
    }
}