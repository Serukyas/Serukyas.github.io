const downArrow = document.querySelector('.down-arrow');
const hero = document.querySelector('.hero');
const navbar = document.querySelector('.nav');
const descBoxes = document.querySelectorAll('.personal-description > *');
const smallerBoxes = document.querySelectorAll('.personal-description > * > *');


function scroll_custom(){
    window.scroll({
        top: hero.offsetHeight - navbar.offsetHeight,
        behavior: "smooth"
    })
}
downArrow.addEventListener("click", scroll_custom);

window.addEventListener("scroll", () => {
    let heroPos = hero.getBoundingClientRect();
    console.log(heroPos.y);
    if(heroPos.y <= -20){
        navbar.classList.add("solid");
        descBoxes.forEach(box => {
            box.style.animation = "appear forwards 1s"
        })
        smallerBoxes.forEach(box => {
            box.style.animation = "appear forwards 1s 1s"
        })
    }else{
        navbar.classList.remove("solid");
    }
})

