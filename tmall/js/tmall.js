/*
* @Author: L
* @Date:   2017-04-29 14:35:11
* @Last Modified by:   L
* @Last Modified time: 2017-05-07 20:44:15
*/

'use strict';
$(function(){
        let banner=document.querySelector('.banner')
        let newArr=['#E8E8E8','#E8E8E8','#E8B1B4','#E8E8E8','#ED112A','#A84A1A']
        let bn=document.querySelector('.banner1')
        let a=document.querySelectorAll('.banner1>a')
        let li=document.querySelectorAll('.slider-nav>li')      
        let img=document.querySelectorAll('.right-bar a img')
        let gou=document.querySelectorAll('.right-bar .gou')
        let tiao=document.querySelectorAll('.right-bar .tiao')
        let jiao=document.querySelectorAll('.right-bar .jiao')
        let mao=document.querySelectorAll('.bar-son2 .mao')       
        let lefts=document.querySelectorAll('.left-bar>a')
        let lis3=document.querySelectorAll('.tu-2 .play li')
    
        

      console.log(lefts)
    // banner轮播图  轮播点     
        for(let i=0;i<a.length;i++){
            li[i].onmouseenter=function(){
                for(let j=0;j<a.length;j++){
                    a[j].style.display='none'
                    li[j].style.background=''
                }
                a[i].style.display='block'
                banner.style.background=newArr[i];
                li[i].style.background='#fff'
                index=i;
            }
            bn.onmouseover=function(){
                clearInterval(t);
            }
            bn.onmouseout=function(){
                t=setInterval(move,4000);
            }
        }
 
     let index=0;
     let  t=setInterval(move,4000);
        function move(){
        	index++;
        	//判断index
        	if(index==a.length){
        		index=0;
        	}
        	for(let i=0;i<a.length;i++){
        		a[i].style.display='none';
        		li[i].style.background='';
        	}
        	a[index].style.display='block';
            banner.style.background=newArr[index];
            li[index].style.background='#fff';
        }
    //banner2鼠标移入字体颜色变化事件
    let bns2=document.querySelectorAll('.banner2>ul>li');
    let aa=document.querySelectorAll('.banner2>ul>li>a')
    let ii=document.querySelectorAll('.banner2>ul>li>i')
    let colorArr=['#E54077','#427DEF','#6347ED','#E54077','#6347ED','#427DEF','#E54077','#F7A831','#F7A831','#427DEF','#DD2727','#427DEF','#F7A831','#3BC7B0','#DD2727','#3BC7B0']
    for(let i=0;i<16;i++){
        bns2[i].onmouseenter=function(){
            aa[i].style.color=colorArr[i];
            ii[i].style.color=colorArr[i];
            aa[i].style.fontWeight='bold';
        }
        bns2[i].onmouseleave=function(){
            aa[i].style.color='';
            ii[i].style.color='';
            aa[i].style.fontWeight='';
        }
    }
    //右侧固定黑色条           
        for(let i=0;i<img.length;i++){
            if(i!=7){
            	img[i].onmouseenter=function(){
	                    this.style.background='#C40000';
	                    tiao[i].style.transform='translateX(20px)';
	                    jiao[i].style.transform='translateX(20px)';
	                    tiao[i].style.opacity=1;
	                    jiao[i].style.opacity=1;                
            	}
            	img[i].onmouseleave=function(){
	                    this.style.background='';
	                    tiao[i].style.transform='translateX(0px)';
	                    jiao[i].style.transform='translateX(0px)';
	                    tiao[i].style.opacity=0;
	                    jiao[i].style.opacity=0;  
            	}
           }else{
                    img[7].onmouseenter=function(){
                        	this.style.background='red';
                        	mao[0].style.display='block';
                    }
                    img[7].onmouseleave=function(){
                        	this.style.background='';
                        	mao[0].style.display='none';
                    }
            	}	
        }
            for(let i=0;i<gou.length;i++){
                gou[i].onmouseenter=function(){
                    this.style.background='#C40000';               
            	}
            	gou[i].onmouseleave=function(){
                    this.style.background='';  
            	}
            }
        
    //图片展示部分1-视频播放滚动条
        let onlives=document.querySelector('.tu-2 .left>div:nth-child(1)')
        let onlives1=document.querySelectorAll('.tu-2 .left>div:nth-child(2)>div')
        let onimgs=document.querySelectorAll('.tu-2 .anniu');
        let onimg1=document.querySelector('.tu-2 .anniu1');
        
        let m=0;     
            for(let i=0;i<onlives1.length;i++){
                for(let j=0;j<onlives1.length;j++){
                    if(j==0){
                        continue ;
                    }
                    onimgs[j].style.opacity=`0`;
                }
                onlives1[i].onmouseenter=function(){
                let b=2*i+1
                onlives.style.backgroundImage=`url(img/play${b}.jpg_.webp)`;
                onimgs[m].style.opacity=`0`;
                onimgs[i].style.opacity=`1`;
                m=i;
                //小按钮缩放
                onimgs[i].style.transform=`scale(1.3)`;
                onimgs[i].addEventListener('webkitTransitionEnd',function(){
                    onimgs[i].style.transform=`scale(1)`;
                 },false)
               }
            }
            //大按钮缩放
            onlives.onmouseenter=function(){
                onimg1.style.transform=`scale(1.3)`;
                onimg1.addEventListener('webkitTransitionEnd',function(){
                    onimg1.style.transform=`scale(1)`;
                 },false)
            }
            //左右箭头点击事件
        let zuo=document.querySelector('.zuo');
        let you=document.querySelector('.you');
        let tu2=document.querySelector('.tu-2>.left>div:nth-child(2)');   
            you.onclick=function(){
               tu2.style.transform='translateX(-488px)';
               you.style.display='none';
               zuo.style.display='block';
            }
            zuo.onclick=function(){
               tu2.style.transform='translateX(0)';
               zuo.style.display='none';
               you.style.display='block';
            }
          

          //直播文字上下滚动
        t=setInterval(shang,3000)
        function shang(){
            let shang=parseInt(getComputedStyle(lis3[0],null).marginTop);
            if(shang==0){
            lis3[0].style.marginTop=`-40px`;
            }
            else if(shang==-40){
            lis3[0].style.marginTop=`0px`;
            }
        }


      // 滚动事件(左侧边栏/中间图片/头部显示条)      
        let lefts2=document.querySelector('.left-bar'); 
        let ch=window.innerHeight;
        let floors=document.querySelectorAll('.picture2');
        let arr=[];   
        let topss=document.querySelector('.top-bar');
        let flag1=true;
        let arr1=['#EA5F8D','#0AA6E8','#64C333','#F15453','#19C8A9','#F7A945','#DD2727'];
        let n=1;
        let flag=true;
         floors.forEach(function(value,index){   
           arr.push(value.offsetTop)
        })
        
        window.onscroll=function(){
            let tops=document.body.scrollTop;           
            //头部导航显示条
                if(tops>1000){
                    if(flag1){     
                      flag1=!flag1;
                      topss.style.transform=`translateY(50px)`
                    }
                }else if(tops<=1000){
                    if(!flag1){
                      flag1=!flag1;
                      topss.style.transform=`translateY(-50px)`      
                    }
                }
            //左侧边栏显示事件
               if(tops>600){
                  lefts2.style.transform=`scale(1,1)`;
               }else if(tops<=600){
                  lefts2.style.transform=`scale(0,0)`;
               }
            //中间picture2图片滚动事件
            if(!flag){
            return ;
            }
            for(let i=1;i<8;i++){
                if(tops+ch>arr[i-1]+300){
                    //左按钮
                    lefts[n].style.background='';
                    lefts[i].style.background=arr1[i-1];
                    n=i;
                    //图片加载
                    let imgs=floors[i-1].getElementsByTagName('img')
                    for(let j=0;j<imgs.length;j++){
                       imgs[j]['src']=imgs[j]['title'];
                    }
                }
            }



        }
        //左侧边栏点击事件       
        for(let i=1;i<8;i++){
            lefts[i].onclick=function(){ 
               flag=false;                        
               animate(document.body,{scrollTop:arr[i-1]}, function(){flag=true;});
            }
        }

        //picture2 美丽人生-左侧字体上下滚动事件
        let slides=document.querySelectorAll('.picture2 .slide>ul')
        t=setInterval(moveT,4000);
        function moveT(){
            for(let i=0;i<slides.length;i++){
                animate(slides[i],{top:-30},function(){   
                    let first=slides[i].firstElementChild;
                    slides[i].appendChild(first);
                    slides[i].style.top=0;
                })
            }
        }
















            
})

