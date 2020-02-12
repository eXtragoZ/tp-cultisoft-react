function drawMainStem() {
    const paths = document.querySelectorAll('.main-stem');

    for (const path of paths) {
        const length = path.getTotalLength();
        path.style.transition = 'none';
        path.style.strokeDasharray = length + ' ' + length;
        path.style.strokeDashoffset = length;
        path.getBoundingClientRect();
        path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 4s 0s ease-in-out';
        path.style.strokeDashoffset = '0';
    }
}

function drawStems() {
    const paths = document.querySelectorAll('.outer-stems');
    for (const path of paths) {
        const length = path.getTotalLength();
        path.style.transition = 'none';
        path.style.strokeDasharray = length + ' ' + length;
        path.style.strokeDashoffset = length;
        path.getBoundingClientRect();
        path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 3s 1s ease-in-out';
        path.style.strokeDashoffset = '0';
    }
}

function drawLeaves() {
    const paths = document.querySelectorAll('.leaves path');
    for (const path of paths) {
        const length = path.getTotalLength();
        path.style.transition = 'none';
        path.style.strokeDasharray = length + ' ' + length;
        path.style.strokeDashoffset = length;
        path.getBoundingClientRect();
        path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 4s 2.5s ease-in-out';
        path.style.strokeDashoffset = '0';
    }
}


function drawPlant() {
    drawMainStem();
    drawStems();
    drawLeaves();
}

export default drawPlant;

