
window.onload=function() {
    let audio = document.querySelector('audio');
    let song = document.querySelector('.song');
    let author = document.querySelector('.author');
    let lyrics = document.querySelector('.lyrics');
    let last = document.querySelector('.last');
    let playBtn = document.querySelector('.play');
    let next = document.querySelector('.next');
    let img = document.querySelector('img');
    let info = document.querySelector('.info');
    let cTime = document.querySelector('.cTime');
    let dTime = document.querySelector('.dTime');
    let midA=document.querySelector('.midA');
    let body=document.querySelector('body');
    let circle=document.querySelector('.circle');
    let volumebtn=document.querySelector('.icon-yinliang')
    console.log(circle);
    let index = 0;


    //  初始化
    offer(database[index]);

    //播放 play
    playBtn.onclick = function () {
        if (audio.paused) {
            audio.play();
            playBtn.classList.toggle('icon-play');
        } else {
            audio.pause();
            playBtn.classList.toggle('icon-play');
        }
    }
    //下一首  next
    next.onclick = function () {
        index++;
        if (index >database.length-1) {
            index = database.length-1;
        }
        offer(database[index]);
        //audio.play();
    }
    //上一首 last
    last.onclick = function () {
        index--;
        if (index < 0) {
            index = 0;
        }
        offer(database[index]);
        //audio.play();
    }

    //歌曲部分??
    var i=x=0;
    audio.ontimeupdate = function () {

        let current = format(audio.currentTime);
        let duration = format(audio.duration);
        let string = '';
        cTime.innerText = current;
        dTime.innerText = duration;
        let bili=audio.currentTime/audio.duration*100+'%';
        midA.style.width=bili;
        circle.style.left=audio.currentTime/audio.duration*700+'px';
    
        lyrics.innerHTML = '';
        database[index]['lyrics'].forEach(function (value, index) {
            if (value.time == current) {
                x = i = index;
            }
        })

        if(x < 2) {
            i = 0
        } else {
            i = x - 2;
        }
        for (let j = i; j < database[index]['lyrics'].length; j++) {
            if (j == x) {
                string += `
             <li class="hot">
                ${database[index]['lyrics'][j]['lyric']}
             </li>`;
            } else {
                string += `
             <li >
                ${database[index]['lyrics'][j]['lyric']}
             </li>`;
            }

        }
        lyrics.innerHTML = string;
        if(audio.ended){
            index++;
            if (index >database.length-1) {
                index = database.length-1;
            }
            offer(database[index]);
            audio.play();
        }

    }

    //格式化时间
    function format(time) {
        let m = Math.floor(time/60)>=10? Math.floor(time/60): "0" + Math.floor(time/60);
        let s = Math.floor(time%60)>=10? Math.floor(time%60): "0" + Math.floor(time%60);
        return `${m}:${s}`;
    }

    function offer(obj) {
        let string = '';
        song.innerText = obj.songs;
        author.innerText = obj.name;
        audio.src = obj.src;
        body.style.backgroundImage=`url(images/${index+1}.jpg)`
        //引入歌词
        obj.lyrics.forEach(function (value, index) {
            string += `<li>${value.lyric}</li>`
        })
        lyrics.innerHTML = '';
        lyrics.innerHTML = string;

        //底部
        // id: "0", songs: "阴天", name: "莫文蔚", src: "music/阴天.mp3", alltime:"04:02", photo: "images/mww.jpg", lyrics:
        info.innerText = `${obj.songs} - ${obj.name}`;
        img.src = obj.photo;
        cTime.innerText = '00:00';
        dTime.innerText = obj.alltime;

    }

    //volumn
    volumebtn.onclick=function(){
        volumebtn.classList.toggle('icon-yinliang')
        if(audio.volume!=0){
            audio.volume=0
        }else{
            audio.volume=1

        }
    }
}


