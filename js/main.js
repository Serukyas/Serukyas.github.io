window.onload = removeLoader();
function removeLoader(){
    let loader = document.querySelector(".loader");
    loader.classList.add("transparent");
    setTimeout(function (){
        document.querySelector(".loader").classList.add("hidden");
    }, 1000)

}

const cards = document.querySelectorAll('.tilting-card');
const downArrow = document.querySelector('.down-arrow');
const hero = document.querySelector('.hero');
const navbar = document.querySelector('.nav');
const descBoxes = document.querySelectorAll('.personal-description > *');
const smallerBoxes = document.querySelectorAll('.personal-description > * > *');

function generateGrid(card, toBeTilted){
    for(let i = 0; i < card.offsetHeight/40 * card.offsetWidth/40; i++){

        let box = document.createElement('div');
        box.classList.add('square');
        box.classList.add(i);
        card.appendChild(box);

        let col_length = window.getComputedStyle(card).getPropertyValue("grid-template-columns").split(" ").length;
        let row_length = window.getComputedStyle(card).getPropertyValue("grid-template-rows").split(" ").length;
        let max = [row_length, col_length];

        tilt(box, get_position_of_cell(i, card), toBeTilted, max)
    }
}

function get_position_of_cell(cardNumber, gridContainer) {
    let gridComputedStyle = window.getComputedStyle(gridContainer);

    let colspan = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;
    
    let col = Math.floor(cardNumber / colspan);
    let row = cardNumber % colspan;
    console.log(col, row);
    
    return [col + 1, row + 1]
}

function tilt(cell, position, card, max){

    let xOffset = (position[0] - max[0]/2) / max[0];
    let yOffset = (position[1] - max[1]/2) / max[1];

    console.log(xOffset, yOffset, cell);

    cell.addEventListener("mouseover", () => {
        card.style.transform = `rotateX(${xOffset * 30}deg) rotateY(${yOffset * 30}deg)`;
    })
}

cards.forEach(card => {
    setTimeout(() => {
        generateGrid(card, card.parentElement);
    }, 0);

    card.parentElement.addEventListener("mouseleave", () => {
        card.parentElement.style.transform = `rotateX(0) rotateY(0)`
    })

});
function scroll_custom(){
    window.scroll({
        top: window.innerHeight,
        behavior: "smooth"
    })
}
downArrow.addEventListener("click", scroll_custom);
window.addEventListener("scroll", () => {
    let heroPos = hero.getBoundingClientRect();
    console.log(heroPos.y, window.innerHeight);
    if(heroPos.y <= -window.innerHeight + 150){
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

