/*
* @Author: L
* @Date:   2017-04-29 14:35:11
* @Last Modified by:   L
* @Last Modified time: 2017-05-14 23:21:02
*/
'use strict';
$(function(){
  //banner轮播图
    let ban=document.querySelector('.banner');
    let imgBox=document.querySelector('.imgBox');
    let imgs=document.querySelectorAll('.imgBox>li');
    let imgWidth=parseInt(getComputedStyle(imgBox,null).width);
    let btns=document.querySelectorAll('.banner .btn>li');
    let lefts=document.querySelector('.banner .zuo');
    let rights=document.querySelector('.banner .you');
    let current=0; //当前窗口中的图片下标
    let next=0;
    let t;
      //即将要显示的图片下标
    t=setInterval(move,3000);
        for(let i=0;i<imgs.length;i++){
          if(i==0){
            continue;
          }
          imgs[i].style.left=imgWidth+'px';
        }
     //按钮点击操作 
        for(let i=0;i<btns.length;i++){
          btns[i].index=i;
          btns[i].onclick=function(){  
              if(current==this.index){
                return;
              }
              else if(current<this.index){
                  btns[current].style.background='';
                  btns[this.index].style.background='#C9C6C6';            
                  imgs[this.index].style.left=imgWidth+'px';
                  animate(imgs[current],{ left: -imgWidth});
                  animate(imgs[this.index],{left:0});
                  current=next=this.index;
              }
              else if(current>this.index){
                  btns[current].style.background='';
                  btns[this.index].style.background='#C9C6C6';    
                  imgs[this.index].style.left=-imgWidth+'px';
                  animate(imgs[current],{left:imgWidth});
                  animate(imgs[this.index],{left:0});
                  current=next=this.index;
              } 
          }
        }
      
      // 轮播图左右播放
      function move(){
          next++;
          if(next==imgs.length){
            next=0;
          }
          //就位 next left:width
          imgs[next].style.left=imgWidth+'px';
          //动画
          animate(imgs[current],{left:-imgWidth});
          animate(imgs[next],{left:0});
    
          //按钮
          btns[current].style.background='';
          btns[next].style.background='#C9C6C6';    
          //跟新 current
          current=next;
      }
      function moveDown(){
          next--;
          if(next<0){
            next=imgs.length-1;
          }  
          //就位 next left:width
          imgs[next].style.left=-imgWidth+'px';
          //动画
          animate(imgs[current],{left:imgWidth});
          animate(imgs[next],{left:0});

          //按钮
          btns[current].style.background='';
          btns[next].style.background='#C9C6C6'; 
          current=next;
      }
      //鼠标移入图片暂停播放   
      ban.onmouseover=function(){
          clearInterval(t);
      }
      ban.onmouseout=function(){
          t=setInterval(move,3000);
      }
      //左右箭头
      lefts.onclick=function(){   
        moveDown();
      }
      rights.onclick=function(){    
        move();
      }
      
 




  //小米明星单品 
      let ming=document.querySelector('.star .ming');
      let liS=document.querySelectorAll('.star .ming>li');
      let right=document.querySelector('.star .right');
      let barL=document.querySelector('.star .right .zuo');
      let barR=document.querySelector('.star .right .you');
      let copy=document.querySelector('.star .right .icon-jiantou-copy');
      let copy1=document.querySelector('.star .right .icon-jiantou-copy1');
      let T; 
       T=setInterval(moveL,3000)
        function moveL(){
          let move=parseInt(getComputedStyle(ming,null).marginLeft);
          if(move==0){
            ming.style.marginLeft=`-1240px`;
            copy.style.color='#B0B0B0';  //浅色
            copy1.style.color='#E2E0E0';
          }
          else if(move==-1240){
            ming.style.marginLeft=`0px`;
            copy1.style.color='#B0B0B0';
            copy.style.color='';
          }
        }
                    //鼠标移入按钮，图片暂停播放
        right.onmouseover=function(){
                clearInterval(T);
            }
        right.onmouseout=function(){
                T=setInterval(move,3000);
            }
                     //左右箭头事件
        barR.onclick=function(){
            ming.style.marginLeft=`-1240px`;
             copy.style.color='#B0B0B0';
            copy1.style.color='#E2E0E0';
        }
        barL.onclick=function(){
           ming.style.marginLeft=`0px`;
           copy1.style.color='#B0B0B0';
            copy.style.color='';
        }

    

  //智能硬件
      let zhi=document.querySelector('.zhi .box2');
      let power=document.querySelectorAll('.zhi .box2>ul');
      let zhi2=document.querySelectorAll('.zhi .right>ul>li');
       for(let i=0;i<power.length;i++){
          if(i==0){
            continue;
          }
           power[i].style.display='none';
           zhi2[i].style.color='#333';
           zhi2[i].style.textDecoration='none';
       }
      let z=0;
      for(let i=0;i<power.length;i++){
          zhi2[i].onmouseenter=function(){
               power[z].style.display='none';
               zhi2[z].style.color='#333';
               zhi2[z].style.textDecoration='none';
               power[i].style.display='block';
               zhi2[i].style.color='#FF6700';
               zhi2[i].style.textDecoration='underline';
               z=i;
          }  
      }  
  //搭配
      let da=document.querySelector('.da .box2');
      let da1=document.querySelectorAll('.da .box2>ul');
      let da2=document.querySelectorAll('.da .right>ul>li');
        for(let i=0;i<da1.length;i++){
          if(i==0){
            continue;
          }
           da1[i].style.display='none';
           da2[i].style.color='#333';
           da2[i].style.textDecoration='none';
        }
      let d=0;
      for(let i=0;i<da1.length;i++){
          da2[i].onmouseenter=function(){
               da1[d].style.display='none';
               da2[d].style.color='#333';
               da2[d].style.textDecoration='none';
               da1[i].style.display='block';
               da2[i].style.color='#FF6700';
               da2[i].style.textDecoration='underline';
               d=i;
          }  
      }
   


  //配件
      let pei=document.querySelector('.jian .box2');
      let uls=document.querySelectorAll('.jian .box2>ul');
      let pp=document.querySelectorAll('.jian .right>ul>li');
        for(let i=0;i<uls.length;i++){
          if(i==0){
            continue;
          }
           uls[i].style.display='none';
           pp[i].style.color='#333';
           pp[i].style.textDecoration='none';

        }
      let j=0;
        for(let i=0;i<uls.length;i++){
          pp[i].onmouseenter=function(){
               uls[j].style.display='none';
               pp[j].style.color='#333';
               pp[j].style.textDecoration='none';
               uls[i].style.display='block';
               pp[i].style.color='#FF6700';
               pp[i].style.textDecoration='underline';
               j=i;
          }  
        }
   


   //生活周边
      let around=document.querySelector('.around .box2');
      let around1=document.querySelectorAll('.around .box2>ul');
      let around2=document.querySelectorAll('.around .right>ul>li');
       for(let i=0;i<around1.length;i++){
          if(i==0){
            continue;
          }
           around1[i].style.display='none';
           around2[i].style.color='#333';
           around2[i].style.textDecoration='none';
       }
      let e=0;
      for(let i=0;i<around1.length;i++){
         around2[i].onmouseenter=function(){
               around1[e].style.display='none';
               around2[e].style.color='#333';
               around2[e].style.textDecoration='none';
               around1[i].style.display='block';
               around2[i].style.color='';
               around2[i].style.textDecoration='';
               e=i;
         }  
      }    
  


  
  //为你推荐(箭头点击事件)
      let son1=document.querySelector('.recommend .son1');
      let lis=document.querySelectorAll('.recommend .son1>li');
      let zuo=document.querySelector('.recommend .right .zuo');
      let you=document.querySelector('.recommend .right .you');
      let jiantou1=document.querySelector('.recommend .right .icon-jiantou-copy');
      let jiantou2=document.querySelector('.recommend .right .icon-jiantou-copy1');
      let a=0;
        you.onclick=function(){
            a-=1240;
            if(a<=-3720){
                a=-3720;
            }
           son1.style.transform=`translateX(${a}px)`;
        }
        zuo.onclick=function(){
            a+=1240;
            if(a>0){
                a=0;
            }
           son1.style.transform=`translateX(${a}px)`;
        }

      
  //内容(箭头点击事件)
      //图一
       let k1=document.querySelector('.content .k1 .box1');
       let z1=document.querySelector('.content .k1 .btnz');
       let y1=document.querySelector('.content .k1 .btny');
       let dot=document.querySelectorAll('.content .k1 .page .dot'); 
       let n1=0;
        y1.onclick=function(){
          n1-=296;
          if(n1<=-592){
            n1=-592;
          }
          k1.style.transform=`translateX(${n1}px)`;
          }
        z1.onclick=function(){
            n1+=296;
            if(n1>0){
                n1=0;
            }
           k1.style.transform=`translateX(${n1}px)`;
        }    
        
      //图二
       let k2=document.querySelector('.content .k2 .box1');
       let z2=document.querySelector('.content .k2 .btnz');
       let y2=document.querySelector('.content .k2 .btny');
       let n2=0;
        y2.onclick=function(){
          n2-=296;
          if(n2<=-592){
            n2=-592;
          }
          k2.style.transform=`translateX(${n2}px)`;
          }
        z2.onclick=function(){
            n2+=296;
            if(n2>0){
                n2=0;
            }
           k2.style.transform=`translateX(${n2}px)`;
        }    
        
      //图三
       let k3=document.querySelector('.content .k3 .box1');
       let z3=document.querySelector('.content .k3 .btnz');
       let y3=document.querySelector('.content .k3 .btny');
       let n3=0;
        y3.onclick=function(){
          n3-=296;
          if(n3<=-592){
            n3=-592;
          }
          k3.style.transform=`translateX(${n3}px)`;
          }
        z3.onclick=function(){
            n3+=296;
            if(n3>0){
                n3=0;
            }
           k3.style.transform=`translateX(${n3}px)`;
        }    
         //图四
       let k4=document.querySelector('.content .k4 .box1');
       let z4=document.querySelector('.content .k4 .btnz');
       let y4=document.querySelector('.content .k4 .btny');
       let n4=0;
        y4.onclick=function(){
          n4-=296;
          if(n4<=-592){
            n4=-592;
          }
          k4.style.transform=`translateX(${n4}px)`;
          }
        z4.onclick=function(){
            n4+=296;
            if(n4>0){
                n4=0;
            }
           k4.style.transform=`translateX(${n4}px)`;
        }    









            
})

