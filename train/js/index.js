var urlPre="http://www.corsproxy.com/";var url1="www.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getStationAndTimeByStationName?UserID=";var url2="www.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getStationAndTimeDataSetByLikeTrainCode?UserID=";var url3="www.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getDetailInfoByTrainCode?UserID=";var onoff=false;var getTrianList=function(){if($("#search-code").val()||($("#search-begin").val()&&$("#search-end").val())){var searchBtn=$(this);searchBtn.button("option","disabled",true);$.mobile.loading("show");var _data={};var _url=url1;if(!$("#search-code").val()){_data.StartStation=$("#search-begin").val();_data.ArriveStation=$("#search-end").val()}else{_data.TrainCode=$("#search-no").val();_url=url2}$.get(urlPre+_url,_data,function(data){$("#list").html("");var list=$("#list");var TimeTable=$(data).find("TimeTable");var _arr=[];TimeTable.each(function(index,obj){var i=index;if(i>10){return false}var that=$(this);if(that.find("FirstStation").text()=="数据没有被发现"){alert("亲！没有帮你找到任何数据");return false}_arr.push('<li><a href="#" data-no="'+that.find("TrainCode").text()+'">'+"<h2>"+that.find("TrainCode").text()+"次</h2>"+"<p>"+that.find("FirstStation").text()+" - "+that.find("LastStation").text()+"</p>"+"<p>用时："+that.find("UseDate").text()+"</p>"+'<p class="ui-li-aside">'+that.find("StartTime").text()+" 开</p>"+"</a></li>")});if(_arr.length>0){list.html(_arr.join(""));list.listview("refresh")}searchBtn.button("option","disabled",false);$.mobile.loading("hide")})}else{alert("你还没有输入信息，我们无法为你查询哦，亲！")}};var ispageshow=false;var getDetailInfoByTrainCode=function(){$.mobile.loading("show");var traincode=$(this).attr("data-no");if(ispageshow){return}ispageshow=true;$.get(urlPre+url3,{TrainCode:traincode},function(data){ispageshow=false;$("#detail").find(".ui-content h2").html(traincode+"次");var tbody=$("#detail").find(".ui-content tbody");tbody.html("");$(data).find("TrainDetailInfo").each(function(index,obj){var tr=$("<tr></tr>");var that=$(this);tr.html("<td>"+that.find("TrainStation").text()+"</td>"+"<td>"+that.find("ArriveTime").text()+"</td>"+"<td>"+that.find("StartTime").text()+"</td>");tbody.append(tr)});$.mobile.loading("hide");$.mobile.changePage("#detail")})};var bindEvent=function(){$("#search-submit").on("click",getTrianList);$("#list").on("click","a",getDetailInfoByTrainCode)};$(document).on("pageshow",function(){if(onoff){return}onoff=!onoff;bindEvent()});