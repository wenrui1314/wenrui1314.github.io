
function circlesport(x,y,r,num,obj){
    let canvas=document.querySelector(`.${obj}`)
    let ctx=canvas.getContext('2d')
    let n=0;
    let t;
    ctx.font='20px 苹方';
    ctx.lineWidth=5;
    ctx.fillStyle='#FC9808';
    ctx.strokeStyle='#79CBFF'
    ctx.lineCap='round';
    ctx.textAlign='center'
    ctx.textBaseline='middle'
    t=setInterval(keyfram,40)

    function keyfram(){
        n++;
        if(n==num){
            clearInterval(t);
        }
        ctx.clearRect(0,0,200,200)
        let agle=n*360/100*Math.PI/180;
        ctx.beginPath();
        ctx.arc(x,y,r,-Math.PI/2,agle-Math.PI/2);
        ctx.stroke();
        ctx.fillText(`${n}%`,x,y)


    }


}
