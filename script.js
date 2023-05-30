import {Apple} from './module/apple.js';
import { Snake } from './module/snake.js';
import { Drawing } from './module/drawing.js';

window.onload = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    let delay = 150;
    const canvasWidth = 900;
    const canvasHeight = 600;
    const blockSize = 30;
    const widthInBlock = canvasWidth / blockSize;
    const heighInBlock = canvasHeight / blockSize;
    const centreX = canvasWidth / 2;
    const centreY = canvasHeight / 2;
    let score = 0;
    let snakee;
    let applee;
    let timeout;

    const launch = () => {
        snakee = new Snake([[6,4], [5,4], [4,4]]);
        applee = new Apple();
        clearTimeout(timeout);
        RefreshCanvas();
    };

    const init = () => {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = '30px solid gray';
        canvas.style.display = 'block';
        canvas.style.margin = '50px auto';
        canvas.style.backgroundColor = '#ddd';
        document.body.appendChild(canvas);
        launch();
    };

    const speed = () => {
        delay /= 1.1;
    }

    const RefreshCanvas = () => {
        snakee.advance();
        if(snakee.checkCollision(widthInBlock, heighInBlock)){
            score = 0;
            Drawing.gameOver(context, centreX, centreY, delay);
        } else {
            if(snakee.isEatingApple(applee)) {
                score++;
                snakee.ateApple = true;
                if (score % 5 === 0){
                    speed();
                }
                do {
                    applee.setNewPosition(widthInBlock, heighInBlock);
                }
                while(applee.isOnSnake(snakee));
            }
            context.clearRect(0, 0, canvas.width, canvas.height);
            Drawing.drawScore(context, centreX, centreY, score);
            Drawing.drawSnake(context, blockSize, snakee);
            Drawing.drawApple(context, blockSize, applee);
            timeout = setTimeout(RefreshCanvas, delay);
        }   
    }

    init();  

    document.onkeydown = (event) => {
        const key = event.key;
        let newDirection;
        switch(key){
            case 'ArrowUp' : 
                event.preventDefault();
                newDirection = 'up';
                break;
            case 'ArrowDown':
                event.preventDefault();
                newDirection = 'down';
                break;
            case 'ArrowRight':
                newDirection = 'right';
                break;
            case 'ArrowLeft':
                newDirection = 'left';
                break;
            case ' ':
                launch();
                return;
            default :
                return;
        }
        snakee.setDirection(newDirection);
    }
}

