/*
* @Author: L
* @Date:   2017-04-29 14:27:44
* @Last Modified by:   L
* @Last Modified time: 2017-04-29 16:26:01
*/

'use strict';
function $(selector,ranger=document){
	
	let type=typeof selector;
	if(type=="string"){
	  //获取
        let select=selector.trim();  //去空
        let first=select.charAt(0);  //截取
		if(first=='.'){
			return ranger.getElementsByClassName(select.substr(1))
		} 
		if(first=='#'){
			return document.getElementById(select.substr(1))
		} 
		if(/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(select)){
			return document.getElementsByTagName(select)				
	    }
	}
	    else if(type=="function"){
			//添加事件
		   window.onload=function(){
				selector();
		   }
	    }
		
}
