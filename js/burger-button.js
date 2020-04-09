(function(){
    const burgerButton = document.querySelector('.burger-button');
    const menu = document.querySelector('.nav');
    const ipad = window.matchMedia('screen and (max-width:779px)');
    const options = document.getElementsByClassName('link');
    ipad.addListener(verify);

    function verify(e){
        if(e.matchs){
            options[0].addEventListener('click',showHide);
            burgerButton.addEventListener('click',showHide);
        }
        else{
            options[0].addEventListener('click',showHide);
            burgerButton.addEventListener('click',showHide);
        }
    }

    function showHide(){
        if(menu.classList.contains('is-active')){
            menu.classList.remove('is-active');
        }
        else{
            menu.classList.add('is-active');
        }
    }
    verify(ipad);
}())
