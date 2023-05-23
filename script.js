let snakee;
window.onload = () => {
    const canvas = document.createElement('canvas');
    // Je récupère le contexte du canvas et je dessine en 2D
    const context = canvas.getContext('2d');
    const delay = 1000;
    const canvasWidth = 900;
    const canvasHeight = 600;
    const blockSize = 30;
    let applee;

    const init = () => {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = '1px solid';
        document.body.appendChild(canvas);
        snakee = new Snake([[6,4], [5,4], [4,4]], 'right');
        applee = new Apple([10,10]);
        RefreshCanvas();
    };

    const RefreshCanvas = () => {
        context.clearRect(0, 0, canvas.width, canvas.height)
        snakee.draw();
        snakee.advance();
        applee.draw();
        setTimeout(RefreshCanvas, delay);
    }

    const drawBlock = (context, position) => {
        const xCoord = position[0] * blockSize;
        const yCoord = position[1] * blockSize;
        context.fillRect(xCoord, yCoord, blockSize, blockSize);
    }

    function Snake(body, direction) {
        this.body = body;
        this.direction = direction;
        this.draw = function () {
            context.save();
            context.fillStyle= '#ff0000';
            for(let i = 0; i < this.body.length; i++) {
                drawBlock(context, this.body[i]);
            }
            context.restore();
        }
        this.advance = function () {
            const nextPosition = this.body[0].slice();
            switch(this.direction){
                case 'left':
                    nextPosition[0]--;
                    break;
                case 'up':
                    nextPosition[1]--;
                    break;
                case 'down':
                    nextPosition[1]++;
                    break;
                case 'right':
                    nextPosition[0]++;
                    break;
                default :
                    throw('Direction erronée');
            };
            this.body.unshift(nextPosition);
            this.body.pop();
        }
        this.setDirection = function (newDirection) {
            let allowedDirections;
            
            switch(this.direction){
                case 'left':
                case 'right':
                    allowedDirections = ['up', 'down'];
                    break;
                case 'down':
                case 'up':
                    allowedDirections = ['right', 'left'];
                    break;
                default :
                    throw('Direction erronée');
            };

            if(allowedDirections.indexOf(newDirection) !== -1) {
                this.direction = newDirection;
            }
        }
    }

    function Apple (position) {
        this.position = position;
        this.draw = function () {
            context.save();
            context.fillStyle = '#33cc33';
            context.beginPath();
            const radius = blockSize / 2 ;
            const xCoord = position[0] * blockSize + radius;
            const yCoord = position[1] * blockSize + radius;
            context.arc(xCoord, yCoord, radius, Math.PI * 2, false);
            context.fill();
            context.restore();
        }
    }

    init();  
}

document.onkeydown = function handleKeyDown (event) {
    const key = event.key;
    let newDirection;
    switch(key){
        case 'ArrowUp' : 
            newDirection = 'up'
            break;
        case 'ArrowDown':
            newDirection = 'down'
            break;
        case 'ArrowRight':
            newDirection = 'right'
            break;
        case 'ArrowLeft':
            newDirection = 'left'
            break;
        default :
            return;
    }
    snakee.setDirection(newDirection);
}