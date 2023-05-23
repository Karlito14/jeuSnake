window.onload = () => {
    const canvas = document.createElement('canvas');
    // Je récupère le contexte du canvas et je dessine en 2D
    const context = canvas.getContext('2d');
    const delay = 200;
    const canvasWidth = 900;
    const canvasHeight = 600;
    const blockSize = 30;
    let snakee;

    const init = () => {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = '1px solid';
        document.body.appendChild(canvas);
        snakee = new Snake([[6,4], [5,4], [4,4]]);
        mooveCanvas();
    };

    const mooveCanvas = () => {
        context.clearRect(0, 0, canvas.width, canvas.height)
        snakee.draw();
        snakee.advance();
        setTimeout(mooveCanvas, delay);
    }

    const drawBlock = (context, position) => {
        const xCoord = position[0] * blockSize;
        const yCoord = position[1] * blockSize;
        context.fillRect(xCoord, yCoord, blockSize, blockSize);
    }

    function Snake(body) {
        this.body = body;
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
            nextPosition[0]++;
            this.body.unshift(nextPosition);
            this.body.pop();
        }
    }

    init();
    
}