function carousel(targetName, pictures){

    //var initialization
    const HEIGHT = 500; //in px
    const WIDTH = 500; //in px
    const TIMING = 2000; //in ms
    const ANIM_DURATION = 500; //in ms

    var i = 1;
    var pos = WIDTH;

    //add the last item on index 0 and first item on last index for seamlessloop
    pictures.push(pictures[0]);
    pictures.splice(0, 0, pictures[pictures.length-2]);

    //construct DOM
    let target = document.getElementById(targetName);
    target.innerHTML = `<div id="pic-container"></div>
    <div id="button-container">
    <button id="back" class="nav-btn">&lt;</button>
    <button id="next" class="nav-btn">&gt;</button>
    </div>`;

    //set height,width and animation duration css var 
    document.documentElement.style.setProperty('--WIDTH', `${WIDTH}px`);
    document.documentElement.style.setProperty('--HEIGHT', `${HEIGHT}px`);
    document.documentElement.style.setProperty('--ANIM_DURATION', `${ANIM_DURATION}ms`)


    //create pictures in the img-container
    for(pic in pictures){
        let img = document.createElement('img');
        //setup by start on index 1
        img.style.transform = `translateX(-${WIDTH}px)`;

        img.classList.add('frame');
        img.classList.add('t');
        img.setAttribute('src', pictures[pic]);

        let target = document.getElementById(targetName);
        target.appendChild(img);
    }

    //go to next pic
    function next(){
        let imgs = document.getElementsByClassName('frame');
        i++;
        pos += WIDTH;

        if(i === pictures.length-1){
        // if it's the last element, we need to go back to index 1 (without transform-duration
        // for making it seamless)

        //do normal 
        for(elem of imgs){
            elem.style.transform = `translateX(-${pos}px)`;
        }

        i = 1;
        pos = WIDTH;

        let regen = imgs[0].addEventListener('transitionend', function(){
            //wait for end of transition and go to first picture without animation
            for(elem of imgs){
                elem.classList.remove('t');
                elem.style.transform = `translateX(-${pos}px)`;
            }
            
            //re-add animation
            setTimeout(function(){
                for(elem of imgs){
                    elem.classList.add('t');
                }
            }, 0);
        })
        imgs[0].removeEventListener('transitionend', regen);
        }else{
            for(elem of imgs){
                elem.style.transform = `translateX(-${pos}px)`;
            }
        }
    }

    //go to previous pic
    function back(){
        let imgs = document.getElementsByClassName('frame');
        i--;
        pos -= WIDTH;

        if(i === 0){
        //if it's the first element, we need to go back to index -2 (without transform-duration
        //for making it seamless)

        //last animation before reset
        for(elem of imgs){
            elem.style.transform = `translateX(0)`;
        }

        i = pictures.length - 2;
        pos = ((pictures.length - 2) * WIDTH);

        //wait for end of transition and go to last picture without animation
        let regen = imgs[0].addEventListener('transitionend', function (){
            for(elem of imgs){
                elem.classList.remove('t');
                elem.style.transform = `translateX(-${pos}px)`;
            }
            
            //re-add animation
            setTimeout(function(){
                for(elem of imgs){
                    elem.classList.add('t');
                }
            }, 0);
        })
        imgs[0].removeEventListener('transitionend', regen);
        }else{
            for(elem of imgs){
                elem.style.transform = `translateX(-${pos}px)`;
            }
        }
    }

    //add auto-mode
    var automode = setInterval(next, TIMING);

    //add event listener for button
    document.getElementById('next').addEventListener("click",function(){
        clearInterval(automode);
        next();
        automode = setInterval(next, TIMING);
    })

    document.getElementById('back').addEventListener("click",function(){
        clearInterval(automode);
        back();
        automode = setInterval(next, TIMING);
    })

}

//your set of picture
let pictures = [
    './img/fraisier.jpeg',
    './img/raspberrylayercake.jpg',
    './img/blackforestcake.jpg',
    './img/lemonpie.jpeg',
    './img/redvelvetcake.jpg'
]

//the first parameter is the carousel container div id, the second is the picture url array
carousel('spinOne', pictures)