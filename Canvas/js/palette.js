//构造函数上  属性
function Palette(obj,ctx,mask){
    this.obj=obj;
    this.ctx=ctx;
    this.mask=mask;
    this.lineWidth=3;
    this.lineCap='round';
    this.strokeStyle='#2EFCFF';
    this.fillStyle='#000000';
    this.type='stroke';
    this.width=obj.width;
    this.height=obj.height;
    this.history=[];
    this.bian=7;
    this.r=20;
    this.w=40;
    this.eraserBtn=eraserBtn;
}
//原型对象上 方法
Palette.prototype={
    init:function(){
        this.ctx.lineWidth=this.lineWidth;
        this.ctx.lineCap=this.lineCap;
        this.ctx.fillStyle=this.fillStyle;
        this.ctx.strokeStyle=this.strokeStyle;
   },
    revoke:function(){       //撤销   左上角撤销图标
        let last = this.history.pop();
        this.ctx.putImageData(last, 0, 0);
    },
    store:function(){       //保存  左上角保存图标
        let img=new Image;
        let data=canvas.toDataURL('image/png').replace('data:image/png','data:stream/octet');
        img.src=data;
        location.href=data;
    },
    clear:function(){       //清空
        if(confirm('真的要清空吗？')){
            this.ctx.clearRect(0,0,this.width,this.height);
            this.history=[];
        }
    },
    line:function(){          //直线
        let self=this;
        self.mask.onmousedown=function(e){
            let ox= e.offsetX,oy= e.offsetY;  //内部变量
            self.mask.onmousemove=function(e){
                let cx= e.offsetX,cy= e.offsetY;
                self.ctx.clearRect(0,0,self.width,self.height);
                //连续画线
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                self.init();
                self.ctx.beginPath();
                self.ctx.moveTo(ox,oy);
                self.ctx.lineTo(cx,cy);
                self.ctx.closePath();
                self.ctx.stroke();
            }
            self.mask.onmouseup=function(){
               self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
            }
            //撤销    键盘快捷键ctrl+z
            document.body.onkeydown=function(e) {
                if (e.ctrlKey && e.keyCode == 90) {
                    let last = self.history.pop();   //pop()删除数组的最后一个元素，返回删除的元素
                    self.ctx.putImageData(last, 0, 0)
                }
                //if(e.ctrKey&&e.keyCode==83){
                //      let img=new Image;
                //    let data=canvas.toDataURL('image/png').replace('data:image/png','data:stream/octet');
                //    img.src=data;
                //    location.href=data;
                //}
            }
        }
    },
    dashed:function(){           //虚线
        let self=this;
        self.mask.onmousedown=function(e){
            let ox= e.offsetX,oy= e.offsetY;  //内部变量
            self.mask.onmousemove=function(e){
                let cx= e.offsetX,cy= e.offsetY;
                self.ctx.clearRect(0,0,self.width,self.height);
                //连续画线
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                self.init();
                self.ctx.beginPath();
                self.ctx.setLineDash([5,10]);
                self.ctx.moveTo(ox,oy);
                self.ctx.lineTo(cx,cy);
                self.ctx.stroke();
            }
            self.mask.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
            }
            //撤销
            document.body.onkeydown=function(e) {
                if (e.ctrlKey && e.keyCode == 90) {
                    let last = self.history.pop();
                    self.ctx.putImageData(last, 0, 0)
                }
            }
        }
    },
    pencil:function(){          //铅笔
        let self=this;
        self.mask.onmousedown=function(e){
            let ox= e.offsetX,oy= e.offsetY;
            //self.ctx.clearRect(0,0,self.obj.width,self.obj.height);
            self.ctx.beginPath();
            self.ctx.moveTo(ox,oy);
            self.mask.onmousemove=function(e){
                let cx= e.offsetX,cy= e.offsetY;
                //连续
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                self.init();
                self.ctx.lineTo(cx,cy);
                self.ctx.stroke();
            }
            self.mask.onmouseup=function(){
                self.ctx.closePath();
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
            }
            //撤销
            document.body.onkeydown=function(e) {
                if (e.ctrlKey && e.keyCode == 90) {
                    let last = self.history.pop();
                    self.ctx.putImageData(last, 0, 0)
                }
            }
        }
    },
    circle:function(){            //圆
        let self=this;
        self.mask.onmousedown=function(e){
            let ox= e.offsetX,oy= e.offsetY;
            self.mask.onmousemove=function(e){
                let cx= e.offsetX,cy= e.offsetY;
                let r=Math.sqrt((cx-ox)*(cx-ox)+(cy-oy)*(cy-oy));
                self.ctx.clearRect(0,0,self.width,self.height);
                //连续
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                self.init();
                self.ctx.beginPath();
                self.ctx.arc(ox,oy,r,0,2*Math.PI,true);
                self.ctx.closePath();
                self.ctx[self.type]();
            }
            self.mask.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
            }
            //撤销
            document.body.onkeydown=function(e) {
                if (e.ctrlKey && e.keyCode == 90) {
                    let last = self.history.pop();
                    self.ctx.putImageData(last, 0, 0)
                }
            }
        }
    },
    rectangle:function(){           //矩形
        let self=this;
        self.mask.onmousedown=function(e){
            let ox= e.offsetX,oy= e.offsetY;
            self.mask.onmousemove=function(e){
                let cx= e.offsetX,cy= e.offsetY;
                let r=Math.sqrt((cx-ox)*(cx-ox)+(cy-oy)*(cy-oy));
                self.ctx.clearRect(0,0,self.width,self.height);
                //连续
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                self.init();
                self.ctx.beginPath();
                self.ctx.rect(ox,oy,2*(cx-ox),2*(cy-oy));
                self.ctx.closePath();
                self.ctx[self.type]();
            }
            self.mask.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
            }
            //撤销
            document.body.onkeydown=function(e) {
                if (e.ctrlKey && e.keyCode == 90) {
                    let last = self.history.pop();
                    self.ctx.putImageData(last, 0, 0)
                }
            }
        }
    },
    round:function(){          //圆角矩形
        let self=this;
        self.mask.onmousedown=function(e){
            let ox= e.offsetX,oy= e.offsetY;
            self.mask.onmousemove=function(e){
                let cx= e.offsetX,cy= e.offsetY;
                self.ctx.clearRect(0,0,self.width,self.height);
                let r =20;
                //连续
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                self.init();
                self.ctx.beginPath();
                self.ctx.moveTo(ox+r,oy);  //以左上角为起始点开始画
                self.ctx.lineTo(cx-r,oy);
                self.ctx.quadraticCurveTo(cx,oy,cx,oy+r);
                self.ctx.lineTo(cx,cy-r);
                self.ctx.quadraticCurveTo(cx,cy,cx-r,cy);
                self.ctx.lineTo(ox+r,cy);
                self.ctx.quadraticCurveTo(ox,cy,ox,cy-r);
                self.ctx.lineTo(ox,oy+r);
                self.ctx.quadraticCurveTo(ox,oy,ox+r,oy);
                self.ctx.closePath();
                self.ctx[self.type]();
            }
            self.mask.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
            }
            //撤销
            document.body.onkeydown=function(e) {
                if (e.ctrlKey && e.keyCode == 90) {
                    let last = self.history.pop();
                    self.ctx.putImageData(last, 0, 0)
                }
            }
        }
    },
    polygon:function(){            //多边形
        let self=this;
        let angle=(360/self.bian)/180*Math.PI;
        self.mask.onmousedown=function(e){
            let ox= e.offsetX,oy= e.offsetY;
            self.mask.onmousemove=function(e){
                let cx= e.offsetX,cy= e.offsetY;
                let r=Math.sqrt((cx-ox)*(cx-ox)+(cy-oy)*(cy-oy));
                self.ctx.clearRect(0,0,self.mask.width,self.mask.height);
                //连续
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                self.init();
                self.ctx.beginPath();
                self.ctx.moveTo(ox+r,oy);
                for(let i=0;i<self.bian;i++){
                    self.ctx.lineTo((ox+r*Math.cos(angle*i)),(oy+r*Math.sin(angle*i)));
                }
                self.ctx.closePath();
                self.ctx[self.type]();
                //self.ctx.stroke();
            }
            self.mask.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
            }
            //撤销
            document.body.onkeydown=function(e) {
                if (e.ctrlKey && e.keyCode == 90) {
                    let last = self.history.pop();
                    self.ctx.putImageData(last, 0, 0)
                }
            }
        }
    },
    star:function(){            //五角星
        let self=this;
        self.mask.onmousedown=function(e){
            let ox= e.offsetX,oy= e.offsetY;
            self.mask.onmousemove=function(e){
                let cx= e.offsetX,cy= e.offsetY;
                let r=Math.sqrt((cx-ox)*(cx-ox)+(cy-oy)*(cy-oy));  //开平方
                let r1=r/3;
                let angle=360/(self.bian*2)*Math.PI/180;
                self.ctx.clearRect(0,0,self.width,self.height);
                //连续
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                self.init();
                self.ctx.beginPath();
                self.ctx.moveTo(ox+r,oy);
                for(let i=0;i<self.bian*2;i++){
                    if(i%2==0){
                       let x=ox+r*Math.cos(angle*i),y=oy+r*Math.sin(angle*i);
                        self.ctx.lineTo(x,y);
                    }else {
                        let x=ox+r1*Math.cos(angle*i),y=oy+r1*Math.sin(angle*i);
                        self.ctx.lineTo(x,y)
                    }
                }
                self.ctx.closePath();
                self.ctx[self.type]();

            }
            self.mask.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
            }
            //撤销
            document.body.onkeydown=function(e) {
                if (e.ctrlKey && e.keyCode == 90) {
                    let last = self.history.pop();
                    self.ctx.putImageData(last, 0, 0)
                }
            }
        }
    },
    ellipse:function(){          //椭圆
        let self=this;
        self.mask.onmousedown=function(e){
            let ox= e.offsetX,oy= e.offsetY;
            self.mask.onmousemove=function(e){
                let cx= e.offsetX,cy= e.offsetY;
                self.ctx.clearRect(0,0,self.width,self.height);
                let w=cx-ox;
                let h=cy-oy;
                //连续
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                self.init();
                self.ctx.beginPath();
                self.ctx.moveTo(ox+w/2,oy);  //以左上角为起始点开始画
                self.ctx.quadraticCurveTo(cx,oy,cx,cy-h/2);
                self.ctx.quadraticCurveTo(cx,cy,cx-w/2,cy);
                self.ctx.quadraticCurveTo(ox,cy,ox,cy-h/2);
                self.ctx.quadraticCurveTo(ox,oy,ox+w/2,oy);
                self.ctx.closePath();
                self.ctx[self.type]();
            }
            self.mask.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
            }
            //撤销
            document.body.onkeydown=function(e) {
                if (e.ctrlKey && e.keyCode == 90) {
                    let last = self.history.pop();
                    self.ctx.putImageData(last, 0, 0)
                }
            }
        }
    },
    rightAngle:function(){          //直角三角形
        let self=this;
        self.mask.onmousedown=function(e){
            let ox= e.offsetX,oy= e.offsetY;
            self.mask.onmousemove=function(e){
                let cx= e.offsetX,cy= e.offsetY;
                self.ctx.clearRect(0,0,self.width,self.height);
                //let r =20;
                //连续
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                self.init();
                self.ctx.beginPath();
                self.ctx.moveTo(ox,oy);  //以左上角为起始点开始画
                self.ctx.lineTo(cx,cy);
                self.ctx.lineTo(ox,cy);
                self.ctx.lineTo(ox,oy);
                self.ctx.closePath();
                self.ctx[self.type]();
            }
            self.mask.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
            }
            //撤销
            document.body.onkeydown=function(e) {
                if (e.ctrlKey && e.keyCode == 90) {
                    let last = self.history.pop();
                    self.ctx.putImageData(last, 0, 0)
                }
            }
        }
    },
    eraser:function(w,w,eraserBtn){    //橡皮擦
        let self =this;
        self.eraserBtn=eraserBtn;
        //let w=40;
        self.mask.onmousedown=function(){
            if(self.history.length>0){
                self.ctx.putImageData(self.history[self.history.length-1],0,0);
            }
            self.eraserBtn.style.display='block';
            self.eraserBtn.style.width=`${w}px`;
            self.eraserBtn.style.height=`${w}px`;
            self.mask.onmousemove=function(e){
                let cx= e.offsetX,cy= e.offsetY;
                if (cx >= self.width - w) {
                    cx = self.width - w;
                }
                if (cx <= 0) {
                    cx = 0;
                }
                if (cy >= self.height - w) {
                    cy = self.height - w;
                }
                if (cy <= 0) {
                    cy = 0;
                }
                self.init();
                eraserBtn.style.left = cx + 'px';
                eraserBtn.style.top = cy + 'px';
                self.ctx.clearRect(cx, cy, w, w);
            }
            self.mask.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
                self.eraserBtn.style.display='none';
            }
        }
    },
     text:function(){     //文字
         let self =this;
         self.mask.onmousedown=function(e){
             let ox= e.offsetX,oy= e.offsetY;
             let div=document.createElement('div');
             div.style.cssText=`min-width:50px;min-height:50px;
             border:2px dashed #CBFAFA;color:red;outline:none;
             position:absolute;left:${ox}px;top:${oy}px`;
             div.contentEditable=true;
             self.mask.appendChild(div);
             self.mask.onmousedown=null;   //停止继续创建
             self.area=div;
             self.area.onmousedown=function(e){
                 let ox=e.clientX-this.offsetLeft;
                 let oy=e.clientY-this.offsetTop;

                 self.area.onmousemove=function(e){
                     let cx= e.clientX,cy= e.clientY;
                     let lefts=cx-ox;
                     let tops=cy-oy;
                     if (lefts >= self.width -this.offsetWidth ) {
                         lefts = self.width - this.offsetWidth;
                     }
                     if (lefts <= 0) {
                         lefts = 0;
                     }
                     if (tops >= self.width -this.offsetHeight) {
                         tops = self.width -this.offsetHeight;
                     }
                     if (tops <= 0) {
                         tops = 0;
                     }
                     self.area.style.left=`${lefts}px`;
                     self.area.style.top=`${tops}px`;
                     //连续
                     if(self.history.length>0){
                         self.ctx.putImageData(self.history[self.history.length-1],0,0);
                     }

                 }
                 self.area.onmouseup=function(){
                     self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                     self.area.onmousemove=null;
                     self.area.onmouseup=null;
                 }
                 self.area.onblur=function(){       //失去焦点
                     self.ctx.font='16px 宋体';
                     self.ctx.textBaseline='top';
                     self.ctx.fillText(this.innerText,this.offsetLeft,this.offsetTop);
                     console.log(this.innerText)
                     this.parentNode.removeChild(this);
                     self.area=null;
                 }

                 //撤销
                 document.body.onkeydown=function(e) {
                     if (e.ctrlKey && e.keyCode == 90) {
                         let last = self.history.pop();
                         self.ctx.putImageData(last, 0, 0)
                     }
                 }
             }
         }
     },

    select: function (clipBtn) {
        var self = this;
        self.init();
        self.clipBtn=clipBtn;
        self.mask.onmousedown = function (e) {
            var startx = e.offsetX;
            var starty = e.offsetY;
            var minx, miny, w, h;
            self.init();
            self.mask.onmousemove = function (e) {
                self.init();
                var endx = e.offsetX;
                var endy = e.offsetY;
                minx = startx > endx ? endx : startx;
                miny = starty > endy ? endy : starty;
                w = Math.abs(endx - startx);
                h = Math.abs(endy - starty);
                self.clipBtn.style.display="block";
                self.clipBtn.style.left= minx+'px';
                self.clipBtn.style.top= miny+'px';
                self.clipBtn.style.width= w+'px';
                self.clipBtn.style.height= h+'px';
            }
            self.mask.onmouseup = function (e) {
                self.mask.onmouseup = null;
                self.mask.onmousemove = null;
                self.temp = self.ctx.getImageData(minx, miny, w, h);
                self.ctx.clearRect(minx, miny, w, h)
                self.history.push(self.ctx.getImageData(0, 0, self.width, self.height))
                self.ctx.putImageData(self.temp, minx, miny);
                self.drag(minx, miny, w, h, clipBtn);
            }
        }
    },
    drag: function (x, y, w, h, clipBtn) {
        var self = this;
        self.mask.onmousemove = function (e) {
            var ox = e.offsetX;
            var oy = e.offsetY;
            if (ox > x && ox < w + x && oy > y && oy < h + y) {
                self.mask.style.cursor = "move";
            } else {
                self.mask.style.cursor = "default";
            }
        }
        self.mask.onmousedown = function (e) {
            var ox = e.offsetX;
            var oy = e.offsetY;
            //鼠标相对于div左上角的位置
            var cx = ox - x;
            var cy = oy - y;
            if (ox > x && ox < w + x && oy > y && oy < h + y) {
                self.mask.style.cursor = "move";
            } else {
                self.mask.style.cursor = "default";
                return;
            }
            self.mask.onmousemove = function (e) {
                self.ctx.clearRect(0, 0, self.width, self.height);
                if (self.history.length != 0) {
                    self.ctx.putImageData(self.history[self.history.length - 1], 0, 0)
                }
                var endx = e.offsetX;
                var endy = e.offsetY;
                var left = endx - cx;
                var top = endy - cy;
                if(left<0){
                    left=0;
                }
                if(left>self.width-w){
                    left=self.width-w
                }
                if(top<0){
                    top=0;
                }
                if(top>self.height-h){
                    top=self.height-h
                }
                self.clipBtn.style.left= left+'px';
                self.clipBtn.style.top=top+'px';
                x=left;
                y=top;
                self.ctx.putImageData(self.temp, left, top);
            }
            self.mask.onmouseup = function () {
                self.mask.onmouseup = null;
                self.mask.onmousemove = null;
                self.drag(x, y, w, h, clipBtn);
            }
        }

    }


}