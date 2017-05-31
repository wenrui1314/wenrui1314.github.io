/*
* @Author: L
* @Date:   2017-04-29 14:27:44
* @Last Modified by:   L
* @Last Modified time: 2017-05-13 13:41:40
*/

'use strict';
function $(selector,ranger=document){
		let type=typeof selector;
		if(type=="string"){
			let select=selector.trim();
			let first=select.charAt(0);
			 if(first=='.'){
				return ranger.getElementsByClassName(select.substr(1))
			}
			 if(first=='#'){
				return document.getElementById(select.substr(1))
			}
			 if(/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(select)){
				return ranger.getElementsByTagName(select)				
			}
		}
		else if(type=="function"){
			window.onload=function(){
				selector();
			}
		}
	}


//判断浏览器



//获取某一个对象指定的样式属性
//obj 对象 attr 样式
//1.判断浏览器
//getSytle(box,'width')
function getStyle(obj,attr){
	if(window.getComputedStyle){
		return getComputedStyle(obj,null)[attr];
	}else{
		return obj.currentStyle[attr];
	}
}



//html(obj,[content])
//设置或者是获取某一个元素内容
//obj 指定的对象
//[content]设置的内容
//没有  获取obj 内容
//有，设置
function html(obj,content){
	if(content){
		obj.innerHTML=content;
	}else{
		//获取
		return obj.innerHTML;
	}
}
