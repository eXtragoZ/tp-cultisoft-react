import React, { Component } from 'react';
import { ReactComponent as PlantSvg } from '../images/plant2.svg';

function drawStems() {
    const paths = document.querySelectorAll('#stems path') as any;
    for (const path of paths) {
        const length = path.getTotalLength();
        path.style.transition = 'none';
        path.style.strokeDasharray = length + ' ' + length;
        path.style.strokeDashoffset = length;
        path.getBoundingClientRect();
        path.style.transition = 'stroke-dashoffset 3s 0.5s ease-in-out';
        path.style.strokeDashoffset = '0';
    }
}

function drawLeaves() {
    const paths = document.querySelectorAll('#leaves path') as any;
    for (const path of paths) {
        const length = path.getTotalLength();
        path.style.transition = 'none';
        const target = path.style.transform;
        path.style.transform = target + ' scale(0)';
        path.getBoundingClientRect();
        path.style.transition = 'transform 4s 1.5s ease-in-out';
        path.style.transform = target;
    }
}

function drawPlant() {
    drawStems();
    drawLeaves();
}
class Plant2 extends Component<Props> {
    componentDidMount() {
        if (this.props.delay) {
            process.nextTick(drawPlant);
        } else {
            drawPlant();
        }
    }
    render() {
        return <PlantSvg className={ this.props.className } />;
    }
}

interface Props {
    className: string;
    delay?: boolean;
}

export default Plant2;
