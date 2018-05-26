window.onload = function () {
  
      var oInput = document.getElementsByTagName('input')[0];
      var oCalendar = document.querySelector('#calendar');
      var oEvenmnt = document.querySelector('#evenmnt');

      var oDate = new Date();
      var year = oDate.getFullYear();
      var month = oDate.getMonth()+1;
      var days = oDate.getDate();
      var weekDay = oDate.getDay();
  
      var ospans;
      var prevMonth;
      var nextMonth;
      var nowMonth;
      var nowYear;
      
      
      
      //日期td
      var oTds = oCalendar.getElementsByTagName('td');

      var flag = false;

      showDate(year,month);

      var ospansEvnt;
      var prevMonthEvnt ;
      var nextMonthEvnt ;
      var nowDayEvnt ;
      var nowMonthEvnt ;
      var nowYearEvnt ;
  
      var oTdsEvent = oEvenmnt.getElementsByTagName('td');
      var thEvnt = oEvenmnt.getElementsByTagName('th');
      var oDateTxt = oEvenmnt.getElementsByClassName('numDate');
      
      var valueClic;
      showEvent(year,month,days);  
  
      showUser();
      btnShow();
  
      function showUser(){
            //alert(window.name);
        var userNom = document.getElementById("username");
        
           if(window.name == "Preview"){
               userNom.innerHTML="";
           }else{
               userNom.innerHTML=window.name;
           }
       } 
  
      function btnShow(){
          var uName = document.getElementById("username");
          if(window.name == "Preview"){  //alert("123456");
             document.getElementById("btnIn").style.display="block";
             document.getElementById("btnOut").style.display="none"; 
          }else{
             document.getElementById("btnIn").style.display="none";
             document.getElementById("btnOut").style.display="block"; 
             window.name ="Preview";
          } 
      }
  
       //显示日历
       function showDate(year,month) {
           if (false == flag) {
            
               var oTitle = document.createElement('div');
               oTitle.className = 'title';
               oTitle.innerHTML = '<div class="prev"> Ahead:<span>'+(month-1)+'</span> </div> ' +
                       '<div class="now"> Year:<span>'+year+'</span>  Month: <span>'+month+'</span> </div> ' +
                       '<div class="next"> Next:<span>'+(month+1)+'</span> </div>';
               oCalendar.appendChild(oTitle);
           
               //月份span
                ospans = oCalendar.getElementsByTagName('span');
               // console.log(ospans);
                prevMonth = ospans[0];
                nextMonth = ospans[3];
                nowMonth = ospans[2];
                nowYear = ospans[1];

               //创建星期
               var otable = document.createElement('table');
               var othead = document.createElement('thead');
               var otr = document.createElement('tr');
               var arr = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
               for (var i=0; i<arr.length; i++) {
                   //创建th
                   var oth = document.createElement('th');
                   oth.innerHTML = arr[i];
                   otr.appendChild(oth);
               }
               othead.appendChild(otr);
               otable.appendChild(othead);
               oCalendar.appendChild(otable);


               //先获得当前月有多少天
               var dayNum = num_day(month);
               
               
               //确定当前月的1号是星期几
               oDate.setFullYear(year);
               oDate.setMonth(month-1);
               oDate.setDate(1);

               //日期
               var otbody = document.createElement('tbody');
               for (var i=0; i<6; i++) {
                   var oTr = document.createElement('tr');
                   //每行里面有7列
                   for (var j=0; j<7; j++) {
                       var oTd = document.createElement('td');
                       //oTd.innerHTML = 1;
                       oTr.appendChild(oTd);
                   }
                   otbody.appendChild(oTr);
               }
               otable.appendChild(otbody);

               //获得今天1号对应的是星期几
               var week = oDate.getDay();
               var oTds = oCalendar.getElementsByTagName('td');
               //alert(week);
               for (var i=0; i<dayNum; i++) {
                   oTds[i+week].innerHTML = i+1;
               }

               //如果当前月month 是12或者1
               if (1 == month) {
                   prevMonth.innerHTML = 12;
               } else if (12 == month) {
                   nextMonth.innerHTML = 1;
               }
               //让当前日期显示红色、后面的显示蓝色
               showColor();   
               //给左右月份绑定点击事件
               monthEvent();
               //给所有的td绑定点击事件
               tdClick();
             
               
               //判断最后一行是否全为空
               lastTr();
               //获得任务信息
               getMission()
               flag = true;
           }
       }
  
        //显示记事录
        function showEvent(year,month,day) {
              //alert(year+"-"+month+"-"+day);
              var dayNum;
              var dayNum1;
            
              dayNum = num_day(month);
              if(month>1){
                 dayNum1 = num_day(month-1);
              }else{
                 dayNum1 = num_day(12);
              }

              var oTitleEvent = document.createElement('div');
              oTitleEvent.className = 'EventTitle';
              oTitleEvent.innerHTML = '<div class="prev_event"> PreMonth:<span>'+(month-1)+'</span> </div> ' +
                     '<div class="now_event"> Year:<span>'+year+'</span>  Month: <span> '+month+ '</span><span style="visibility:hidden;">'+day+'</span></div>'+
                     '<div class="next_event"> NextMonth:<span>'+(month+1)+'</span>  </div>';
              oEvenmnt.appendChild(oTitleEvent);

              ospansEvnt = oEvenmnt.getElementsByTagName('span');

              prevMonthEvnt = ospansEvnt[0];
              nextMonthEvnt = ospansEvnt[4];
              nowDayEvnt = ospansEvnt[3];
              nowMonthEvnt = ospansEvnt[2];
              nowYearEvnt = ospansEvnt[1];
                  
              var otableEvent = document.createElement('table');
              otableEvent.className='EventTab';
              var otheadEvent = document.createElement('thead');
              var otrEvent = document.createElement('tr');
              var arrEvent = ['time','SUN','MON','TUE','WED','THU','FRI','SAT'];
              for (var i=0; i<arrEvent.length; i++) {
                 //创建th
                 var othEvent = document.createElement('th');
                 othEvent.innerHTML = arrEvent[i];
                 otrEvent.appendChild(othEvent);
              }
              otheadEvent.appendChild(otrEvent);
              otableEvent.appendChild(otheadEvent);
              oEvenmnt.appendChild(otableEvent);
        
              oDate.setFullYear(year);
              oDate.setMonth(month-1);
              oDate.setDate(1);
              var week=oDate.getDay();
              var nowWeek= Math.ceil((day+week)/7); //alert(day+"-"+week+"-"+(day+week)/7);
              var maxWeek= Math.ceil((dayNum+week)/7); //alert(dayNum+"-"+week+"-"+(dayNum+week)/7);
              var weekLast=(dayNum+week)%7-1;
          
              if (1 == month) {
                   prevMonthEvnt.innerHTML = 12;
               } else if (12 == month) {
                   nextMonthEvnt.innerHTML = 1;
               }
          
              var s,d,d1,d2;
              d1=dayNum1-week+1;
               
               //alert(nowWeek+"~"+week);
              var tmp= (day+week)%7;  var tmp1=(day+week)%7; 
              if(tmp==0){
                tmp=7;
              }                                        
              var todate = nowWeek*7-week-(7-tmp);  
              //alert(todate+"--"+day); 
           
              var debut;
              if(todate == day){  
                //alert(tmp-1);
                  d2=1;
                  debut=1;
                  d=day-(tmp-1);

                    for (var j=1; j<8; j++) {
                      if(d>0 && d <= dayNum){
                        thEvnt[j].innerHTML+='('+parseInt(month)+'/<span class="numDate">'+d+'</span>)'; //alert("d:"+d);
                      }else if(nowWeek==1){
                        thEvnt[j].innerHTML+='('+parseInt(prevMonthEvnt.innerHTML)+'/<span class="numDate">'+d1+'</span>)'; //alert("d1:"+d1);
                        d1++;
                      }else if(nowWeek==maxWeek && day<dayNum){
                        thEvnt[j].innerHTML+='('+parseInt(nextMonthEvnt.innerHTML)+'/<span class="numDate">'+d2+'</span>)'; //alert("d2:"+d2);
                        d2++;
                      }else{
                        thEvnt[j].innerHTML+='('+parseInt(nextMonthEvnt.innerHTML)+'/<span class="numDate">'+debut+'</span>)'; //alert("debut:"+debut);
                        debut++;
                      }
                      d++;
                    }
              }
          
               
              var otbodyEvent = document.createElement('tbody');
                for (var i=0; i<48; i++) {
                   var oTrEvent = document.createElement('tr');
              
                   for (var j=0; j<8; j++) {   
                       var oTdEvent = document.createElement('td');
                       //oTdEvent.innerHTML = 1;
                       oTdEvent.value = j;
                       oTrEvent.appendChild(oTdEvent);
                   }
                   otbodyEvent.appendChild(oTrEvent);
              }
              otableEvent.appendChild(otbodyEvent);
            
              var t=0;
              var tmp=0;
              for (var i=0; i<oTdsEvent.length; i+=8) {
                    oTdsEvent[i].className = 'time';
                    if((i/8)%2==0){
                       oTdsEvent[i].innerHTML = '<span>'+t+':00</span>-<span>'+t+':30</span>';
                    }
                    if((i/8)%2==1){  
                        tmp=t+1;
                       oTdsEvent[i].innerHTML = '<span>'+t+':30</span>-<span>'+tmp+':00</span>';
                       t++;
                    }         
              }    
              
          
              for(var i=0;i<oTdsEvent.length;i++){
                oTdsEvent[i].onclick=doclick; // 添加任务事件 和 事件段         
              }    
          
              for(var i=0;i<oTdsEvent.length;i++){ 
                  oTdsEvent[i].onmouseover=function(){   
                    
                    //alert(this.style.backgroundColor.colorHex());
                      if(this.className=="notesMission"){ 
                        document.getElementById("infobox").style.display="block";
                      }
                  };
                  oTdsEvent[i].onmouseout=function(){ 
                      if(this.className==""){ 
                        document.getElementById("infobox").style.display="none";
                      } 
                  };
                  
              }
          
              var hideobj = document.getElementById("hidebg");
              var addEvent = document.createElement('div');
              addEvent.id="hidebox";
              var closeEvent = document.createElement('div');
              closeEvent.id="closebox";
              closeEvent.innerHTML="close";

              addEvent.appendChild(closeEvent);   
              oEvenmnt.appendChild(addEvent);
  
              //给左右月份绑定点击事件
              weekEvent(nowWeek,maxWeek,d1,d2,parseInt(tmp1-1));
              //让当前日期显示淡蓝色    
              setColor();
              formTxt();
              returnDay();          
        }
  
        function formTxt(){
                var spansEvt = oEvenmnt.getElementsByTagName('span');      
                
                var addEvt = document.getElementById("hidebox");
            
                var new_option1= document.createElement("select");  
                new_option1.id = "mySelect1";
                for (var i=0; i<48; i++) {
                    var options1 = document.createElement('option');
                    new_option1.appendChild(options1);
                }
                addEvt.appendChild(new_option1);

                var obj1 = document.getElementById('mySelect1'); 
                for (var i=0; i<new_option1.options.length; i++) {
                    obj1.options[i].value = i;   //alert(spansEvt[12+2*i].innerHTML); 
                    obj1.options[i].innerHTML = spansEvt[12+2*i].innerHTML;
                }

                var new_option2= document.createElement("select");  
                new_option2.id = "mySelect2";
                for (var i=0; i<48; i++) {
                    var options2 = document.createElement('option');
                    new_option2.appendChild(options2);
                }
                addEvt.appendChild(new_option2);

                var obj2 = document.getElementById('mySelect2'); 
                for (var i=0; i<new_option2.options.length; i++) {
                    obj2.options[i].value = i;   //alert(spansEvt[13+2*i].innerHTML); 
                    obj2.options[i].innerHTML = spansEvt[13+2*i].innerHTML;
                }
                var titleEvnt= document.createElement("textarea"); 
                titleEvnt.id="titEvnt";
                titleEvnt.placeholder = "title";
                addEvt.appendChild(titleEvnt);
  
                var contentEvnt= document.createElement("textarea"); 
                contentEvnt.id="contEvnt";
                contentEvnt.placeholder = "Events";
                addEvt.appendChild(contentEvnt);
          
                var addTime = document.createElement('div');
                addTime.id="addT";
                addTime.innerHTML="add";

                addEvt.appendChild(addTime);
          
        }
  
        function doclick(){
              if(this.style.backgroundColor==''){
                show(this.value);     
              }else{  
                this.style.backgroundColor='';
                this.className="";
              }
        }
  
        function show(value){ //显示隐藏层和弹出层    
            var obj1 = document.getElementById('mySelect1'); 
            var obj2 = document.getElementById('mySelect2'); 
            obj1.options[0].selected = true;
            obj2.options[0].selected = true;
            
            var hideobj = document.getElementById("hidebg");
            var hidbx = document.getElementById("hidebox");
          
            hideobj.style.display = "block"; //显示隐藏层
            hideobj.style.height = document.body.clientHeight + "px"; //设置隐藏层的高度为当前页面高度
            hidbx.style.display = "block"; //显示弹出层
            
            var closeEvt = document.getElementById("closebox");
            closeEvt.onclick=hide;
          
            var addEvt = document.getElementById("addT");
            var waringEvnt= document.createElement("div"); 
            waringEvnt.id="wEvnt";
            hidbx.appendChild(waringEvnt);
          
            var titxt = document.getElementById('titEvnt');
            titxt.value = '';
          
            var tetxt = document.getElementById('contEvnt');
            tetxt.value = '';
          
            addEvt.onclick=function(){
                var index1 = obj1.selectedIndex;     //序号，取当前选中选项的序号 
                var val1 = obj1.options[index1].value;

                var index2= obj2.selectedIndex;     //序号，取当前选中选项的序号 
                var val2 = obj2.options[index2].value;

                var waringsEvt = document.getElementById('wEvnt'); 

                if(parseInt(val1) > parseInt(val2)){
                    waringsEvt.innerHTML="Begining time must be less than finishing time";  
                }else if(tetxt.value == ""){
                    waringsEvt.innerHTML="Please insert your planning";       
                }else{
                    
                    document.getElementById("hidebg").style.display = "none";
                    document.getElementById("hidebox").style.display = "none";

                    for(var j=parseInt(val1);j<=parseInt(val2);j++){   
                      oTdsEvent[8*j+value].style.backgroundColor='#e1e8fb'; 
                      oTdsEvent[8*j+value].className="notesMission";
                    }  
                    //alert(tetxt.value);
                    oTdsEvent[parseInt(val1)*8+value].innerHTML= "Title: "+titxt.value; 
                    document.getElementById("infobox").innerHTML = tetxt.value;
                }
            }; 
        }

        function hide(){ //去除隐藏层和弹出层
            document.getElementById("hidebg").style.display = "none";
            document.getElementById("hidebox").style.display = "none";
        }

        function num_day(month) {
            var dayNum ;
            if (1 == month || 3 == month || 5 == month || 7 == month || 8 == month || 10 == month || 12 == month) {
                   dayNum = 31;
               } else if (4 == month || 6 == month || 9 == month || 11 == month) {
                   dayNum = 30;
               } else if (2 == month && isLeapYear(year)) {
                   dayNum = 29;
               } else {
                   dayNum = 28;
               }
           return dayNum;
        }
  
       //最后一行如果全部为空就将其隐藏
    
       function lastTr() {
           //查找最后一行的所有td
           var flag = true;
           for (var i=35; i<42; i++) {
               if (oTds[i].innerHTML != '') {
                   //有任何一个td不为空就设置为false
                   flag = false;
               }
           }
           //全部是空的
           if (flag) {
               for (var i=35; i<42; i++) {
                   oTds[i].style.display = 'none';
               }
           }
       }
  
       /* var txt = document.createElement('textarea');
        txt.className = 'txt';  
        oEvenmnt.appendChild(txt);*/
  
       //给所有的td绑定点击事件
       function tdClick() {    
           for (var i=0; i<oTds.length; i++) {
               
               oTds[i].onclick = function() {
                   //txt.innerHTML = '';
                    if ('red' == this.className ||'lightblue' == this.className) {
                        var year = nowYear.innerHTML;
                        var month = nowMonth.innerHTML;
                        var date = this.innerHTML;                     
                        oInput.value = 'Check events '+ year +'-'+month+'-'+date;
                        flag = false;          
                        //txt.innerHTML = '报效祖国 人人有责'+date;
                        oEvenmnt.innerHTML = '';
                        showEvent(parseInt(year),parseInt(month),parseInt(date));
                    } else {
                        alert('您只能选择红色或淡蓝色区域，白色区域已经过期');
                    }
               }
           }
       }
  
  
       //当前日期显示红色、后面的显示黄色
       function showColor() {
           //当前的日期
           var oday = new Date().getDate();
           var oMonth = new Date().getMonth()+1;
           var oYear = new Date().getFullYear();
           var restxt = " Return";
         
           var oToday = document.createElement('h1');
           oToday.className = 'today';
           oToday.innerHTML = '<div class="todaytxt">Today:<span>'+oYear+'</span>/<span>'+oMonth+'</span>/<span>'+oday+'</span><span class="return">'+restxt+'</span></div>';
           oCalendar.appendChild(oToday);
   
           var spans = oCalendar.getElementsByTagName('span');
           var nowM = spans[2].innerText;
           var nowY = spans[1].innerText;
           
           var numday = num_day(nowM);
           for (var i=0; i<oTds.length; i++) {
               var oindex;
      
               var week = oDate.getDay();
               if (oday == oTds[i].innerHTML && oMonth == nowM && oYear == nowY) {         
                   oTds[i].className = 'red';
                   oindex = i;       
               }else if(oMonth < nowM && oYear == nowY || oYear < nowY ){
                   oindex = week-1 ; 
               }else if(oMonth > nowM  && oYear == nowY || oYear > nowY){
                   oindex = 36;
               }   
           }
         
           var l= numday+week; 
           for (var j=oindex+1; j < l; j++) {
                 oTds[j].className = 'lightblue';
           }  
         
       }

      //当前日期显示蓝色
       function setColor() {
           //当前的日期
           var oday = new Date().getDate();
           var oMonth = new Date().getMonth()+1;
           var oYear = new Date().getFullYear();

           var spansTxt = oEvenmnt.getElementsByTagName('span');
           var nowDtxt = spansTxt[3].innerText;
           var nowMtxt = spansTxt[2].innerText;
           var nowYtxt = spansTxt[1].innerText;
           
           var numday = num_day(nowMtxt);   
         
           //alert(parseInt(oDateTxt[0].innerHTML));         
           for (var i=0; i< oDateTxt.length ; i++) { 
               
               var week = oDate.getDay();  
               if (oday == parseInt(oDateTxt[i].innerHTML) && oMonth == nowMtxt && oYear == nowYtxt) { 
                     thEvnt[i+1].style.background = '#FFc8B4';
                 for(var j=0;j<48;j++){
                     oTdsEvent[j*8+i+1].className = 'lightred';                     
                 }
               }
           }
       }
      //记事本返回今天
      var returnBut;
      function returnDay(){   
           var oday = new Date().getDate();
           var oMonth = new Date().getMonth()+1;
           var oYear = new Date().getFullYear();
        
           var returnToday = oCalendar.getElementsByTagName('span');  
           returnBut = returnToday[7];
           //alert(returnBut.innerHTML); 
          
           returnBut.parentNode.onclick = function () { 
             oEvenmnt.innerHTML = '';
             oInput.value = '';
             showEvent(oYear,oMonth,oday);
           }   
      }
  
  
      //给左右星期绑定点击事件
       function weekEvent(nowWeek,maxWeek,d1,d2,s) {
           //向左的星期div
           prevMonthEvnt.parentNode.onclick = function () {  
               
               flag = false;
               oEvenmnt.innerHTML = '';
               if (12 == prevMonthEvnt.innerHTML && nowWeek>=1 && nowWeek<=2) { 
                   showEvent(year-=1,12,parseInt(nowDayEvnt.innerHTML)+num_day(12)-7);
               }else if(nowWeek >1 && parseInt(nowDayEvnt.innerHTML)-7 >0){
                   showEvent(year,parseInt(nowMonthEvnt.innerHTML),parseInt(nowDayEvnt.innerHTML)-7);
               }else{     
                   showEvent(year,parseInt(nowMonthEvnt.innerHTML)-1,parseInt(nowDayEvnt.innerHTML)+num_day(parseInt(nowMonthEvnt.innerHTML)-1)-7);                 
               }
           }
           //向右的星期div
           nextMonthEvnt.parentNode.onclick = function () {
               
               flag = false;
               oEvenmnt.innerHTML = ''; 
               if (1 == nextMonthEvnt.innerHTML && nowWeek >=maxWeek-1) {    //alert(nowWeek+"-"+maxWeek);
                   if(parseInt(nowDayEvnt.innerHTML)+7<= num_day(12)){ 
                       showEvent(year+=1,1,parseInt(nowDayEvnt.innerHTML)+7);
                   }else if(parseInt(nowDayEvnt.innerHTML)+7> num_day(12)){  
                       showEvent(year+=1,1,parseInt(nowDayEvnt.innerHTML)+7-num_day(12));
                   }else if(parseInt(nowDayEvnt.innerHTML)==num_day(12)){ 
                       showEvent(year+=1,1,7);
                   }else{
                       showEvent(year+=1,1,parseInt(s+1));
                   }
               }else if(nowWeek < maxWeek && parseInt(nowDayEvnt.innerHTML)+7<= num_day(parseInt(nowMonthEvnt.innerHTML))){     //alert("1");
                   showEvent(year,parseInt(nowMonthEvnt.innerHTML),parseInt(nowDayEvnt.innerHTML)+7);
               }else if(nowWeek < maxWeek && parseInt(nowDayEvnt.innerHTML)+7> num_day(parseInt(nowMonthEvnt.innerHTML))){      //alert("2");
                   showEvent(year,parseInt(nowMonthEvnt.innerHTML)+1,parseInt(nowDayEvnt.innerHTML)+7-num_day(parseInt(nowMonthEvnt.innerHTML)));
               }else if(parseInt(nowDayEvnt.innerHTML)==num_day(parseInt(nowMonthEvnt.innerHTML))){   //alert("3");
                   showEvent(year,parseInt(nowMonthEvnt.innerHTML)+1,7);
               }else {    
                   showEvent(year,parseInt(nowMonthEvnt.innerHTML)+1,parseInt(s+1));
               }
           }
       }
   
  
   //给左右月份绑定点击事件
      function monthEvent() {
           //向左的月份div
            prevMonth.parentNode.onclick = function () {
               
               flag = false;
               oCalendar.innerHTML = '';
               if (12 == prevMonth.innerHTML) {
                   showDate(year-=1, 12);
               } else {
                   showDate(year,parseInt(prevMonth.innerHTML));
               }
           }
           //向左的月份div
            nextMonth.parentNode.onclick = function () {
              
               flag = false;
               oCalendar.innerHTML = '';
               if (1 == nextMonth.innerHTML) {
                   showDate(year+=1,1);
               } else {
                   showDate(year,parseInt(nextMonth.innerHTML));
               }
           }
       }
  
       //判断是否是闰年
       function isLeapYear(year) {
           if (0 == year%100 && 0 == year%400) {
               return true;
           }else if (year%100 != 0 && year%4 ==0) {
               return true;
           } else {
               return false;
           }
       }
      
      function evil(fn) {
            var Fn = Function; //一个变量指向Function，防止有些前端编译工具报错
            return new Fn('return ' + fn)();
      }
  
      var obj;
      //从服务器获取任务信息
      function getMission() {
           $.request({
               method:"post", //获取方式
               //url:"mission.php", //从哪个文件中获取
               url:"data.json",
               data:"",  //可以传递所有数据
               dataType:"json",
               callback:function (res) { 
               obj= evil(res);
             
                 if (obj.status) {
                     var dates = obj.dates;
                     for (var i=0; i<dates.length; i++) {
                         for (var j=0; j<oTds.length; j++) {
                             if (oTds[j].innerHTML == dates[i]) {
                                 oTds[j].innerHTML += "*";
                                 oTds[j].style.background = '#77ff00';
                             }
                         }
                     }
                 }
             }
           }); 
      }
}

