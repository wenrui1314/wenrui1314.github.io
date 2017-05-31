
let canvas=document.querySelector('canvas');
let ctx=canvas.getContext('2d');
let line=document.querySelector('.icon-line');  //直线
let dashed=document.querySelector('.icon-xuxian');  //虚线
let pencil=document.querySelector('.icon-qianbi');  //铅笔
let circle=document.querySelector('.icon-circle');  //圆
let rectangle=document.querySelector('.icon-juxing');  //矩形
let round=document.querySelector('.icon-yuanjiaojuxing');  //圆角矩形
let polygon=document.querySelector('.icon-liubianxing');  //多边形
let star=document.querySelector('.icon-wujiaoxing');  //五角星
let ellipse=document.querySelector('.icon-tuoyuan');  //椭圆
let rightAngle=document.querySelector('.icon-zhijiaosanjiaoxing');  //直角三角形
let youqi=document.querySelector('.icon-youqi');  //填充
let miao=document.querySelector('.icon-miaobian');  //描边
let tcColor=document.querySelector('.tcColor');  //填充颜色-input表单
let mbColor=document.querySelector('.mbColor');  //描边颜色-input表单
let eraser=document.querySelector('.icon-eraser');  //橡皮擦图标
let eraserBtn=document.querySelector(('.eraserBtn'));    //  画板中的橡皮擦
let mask=document.querySelector('.mask');   //画板上的遮罩
let text=document.querySelector('.icon-wenzi');   //文字图标
let clip=document.querySelector('.icon-caijian');   //裁剪图标
let clipBtn=document.querySelector('.clipBtn');   //画板中的裁剪
let buid=document.querySelector('.icon-xinjian');   //新建   ？？？？
let store=document.querySelector('.icon-baocun');   //保存
let revoke=document.querySelector('.icon-chexiao');   //撤销
let clear=document.querySelector('.icon-trash');   //清空
let upload=document.querySelector('.icon-upload');   //上传图片
let inputBtn=document.querySelector('.inputBtn');   //上传图片
let palette=new Palette(canvas,ctx,mask);  //实例化对象
line.onclick=function(){
    palette.line();  //调用画板中得line方法
}
dashed.onclick=function(){
    palette.dashed();
}
pencil.onclick=function(){
    palette.pencil();
}
circle.onclick=function(){
    palette.circle();
}
rectangle.onclick=function(){
    palette.rectangle();
}
round.onclick=function(){
    palette.round();
}
polygon.onclick=function(){
    palette.bian=prompt('请输入边数','7');
    palette.polygon();
}
star.onclick=function(){
    palette.bian=prompt('请输入边数','7');
    palette.star();
}
ellipse.onclick=function(){      //椭圆
    palette.ellipse();
}
rightAngle.onclick=function(){      //直角
    palette.rightAngle();
}
youqi.onclick=function(){
    palette.type='fill';
}
miao.onclick=function(){
    palette.type='stroke';
}
tcColor.onchange=function(){
    palette.fillStyle=tcColor.value;
}
mbColor.onchange=function(){
    palette.strokeStyle=mbColor.value;
}
eraser.onclick=function(){   //橡皮擦
    let w=prompt('请输入橡皮擦的宽','40');
    palette.eraser(w,w,eraserBtn)
}
text.onclick=function(){      //文字
    palette.text();
}
clip.onclick=function(){    //裁剪
    palette.select(clipBtn);
}
/*build.onclick=function(){     //新建
    palette.build();
}*/
store.onclick=function(){    //保存
    palette.store();
}
revoke.onclick=function(){   //撤销
    palette.revoke();
}
clear.onclick=function(){   //清空
    palette.clear();
}
inputBtn.onchange=function(){   //上传图片
    let files=this.files[0];
    let reader=new FileReader();
    reader.readAsDataURL(files);
    reader.onload=function(){
        //在页面中导入
        let img=new Image();
        img.src=this.result;
        img.onload=function(){
            ctx.drawImage(img,50,50,200,200);   // 图片 图片位置   尺寸
        }
    }
}