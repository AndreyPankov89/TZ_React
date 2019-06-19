window.addEventListener('DOMContentLoaded',()=>{
  //menuToggle();
});

function menuToggle(){
    let menuBtn = document.getElementsByClassName('city')[0];
    let menu = document.getElementsByClassName('city-list')[0];
    menuBtn.addEventListener('click',()=>{
        menu.classList.toggle('hide');
    });

    let menuitem = menu.getElementsByTagName('span');
    [].forEach.call(menuitem, (item)=>{
        item.addEventListener('click', () => {
           // menu.classList.toggle('hide');
        //    menuBtn.innerHTML=item.innerHTML;
        })
    })
}