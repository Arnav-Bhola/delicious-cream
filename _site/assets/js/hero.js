window.addEventListener("scroll", callFun);


const imgContainer = document.querySelector('.heroImage').style
const initialWidth = imgContainer.width

function callFun() {
    const content = document.querySelector(".heroImage").getBoundingClientRect()
    const initialHeight = content.height;
    const finalHeight = initialHeight * 0.7;
    const factor = (initialHeight - finalHeight) / 30;
    let result = content.bottom / factor;
    

    if (result < 60) {
        result = 60
    }
    // console.log(result);
    imgContainer.width = result + '%'
}
