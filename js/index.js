window.addEventListener('load',function (){
    // alert(11)
//    获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    focus.addEventListener('mouseover',function (){
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave',function (){
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function (){
            arrow_r.click();
        },2000);

    })
    var focusWidth = focus.offsetWidth;
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for(var i = 0; i < ul.children.length; i++){
        var li = document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);
        li.addEventListener('click',function (){
            for(var i = 0;i < ol.children.length; i++){
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            console.log(focusWidth);
            console.log(index);
            animate(ul,- index * focusWidth);

        })


    }
    ol.children[0].className = 'current';
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num = 0;
    var circle= 0;
    var flag = true;
    arrow_r.addEventListener('click',function (){
        if(flag){
            flag = false;
            if(num == ul.children.length - 1 ){
                ul.style.left = 0;
                num = 0
            }
            num++;
            circle++;
            // if(circle == ul.children.length - 1){
            //     circle = 0;
            // }
            circle = circle == ul.children.length - 1 ? circle = 0 : circle;
            circleChange();
        }
    });
    // console.log(ul.children.length)
    arrow_l.addEventListener('click',function (){
        if(flag){
            flag = false;
            if(num == 0 ){
                num =  ul.children.length - 1;
                ul.style.left = -num*focusWidth +'px';
            }
            num--;
            circle--;
            // if(circle < 0 ){
            //     circle = ol.children.length - 1;
            // }
            circle = circle < 0 ? circle = ol.children.length - 1:circle;
            circleChange();
        }
    });
    function circleChange() {
        for(var i = 0;i < ol.children.length;i++){
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
        animate(ul,-num * focusWidth,function (){
            flag = true;//打开节流阀
        })
    }
    var timer = setInterval(function (){
        arrow_r.click();
    },2000)
})
