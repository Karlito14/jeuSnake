let snakee;
let applee;
window.onload = () => {
    const canvas = document.createElement('canvas');
    // Je récupère le contexte du canvas et je dessine en 2D
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
    let timeout;

    const gameOver = () => {
        delay = 150
        context.save();
        context.font = 'bold 70px sans-serif';
        context.fillStyle = 'black';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText('Game Over', centreX, centreY - 180);
        context.font = 'bold 30px sans-serif';
        context.fillText('Appuyer sur \'Espace\' pour rejouer', centreX, centreY - 120);
        context.restore();
    };

    const launch = () => {
        snakee = new Snake([[6,4], [5,4], [4,4]], 'right');
        applee = new Apple([10,10]);
        clearTimeout(timeout);
        RefreshCanvas();
    };

    const drawScore = () => {
        context.save();
        context.font = 'bold 200px sans-serif';
        context.fillStyle = 'gray';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(score.toString(), centreX, centreY);
        context.restore();
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
        if(snakee.checkCollision()){
            score = 0;
            gameOver();
        } else {
            if(snakee.isEatingApple(applee)) {
                score++;
                snakee.ateApple = true;
                if (score % 5 === 0){
                    speed();
                }
                do {
                    applee.setNewPosition();
                }
                while(applee.isOnSnake(snakee));
            }
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawScore();
            snakee.draw();
            applee.draw();
            timeout = setTimeout(RefreshCanvas, delay);
        }   
    }

    const drawBlock = (context, position) => {
        const xCoord = position[0] * blockSize;
        const yCoord = position[1] * blockSize;
        context.fillRect(xCoord, yCoord, blockSize, blockSize);
    }

    function Snake(body, direction) {
        this.body = body;
        this.direction = direction;
        this.ateApple = false;
        this.draw = function () {
            context.save();
            context.fillStyle= '#ff0000';
            for(let i = 0; i < this.body.length; i++) {
                drawBlock(context, this.body[i]);
            }
            context.restore();
        };
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
            if(!this.ateApple) {
                this.body.pop();
            } else {
                this.ateApple = false;
            }
        };
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
        };
        this.checkCollision = function() {
            let wallCollision = false;
            let snakeCollision = false;
            const headSnake = this.body[0];
            const restSnake = this.body.slice(1);
            const headSnakeX = headSnake[0];
            const headSnakeY = headSnake[1];
            const minWallX = 0;
            const minWallY = 0;
            const maxWallX = widthInBlock - 1;
            const maxWallY = heighInBlock - 1;
            const isNotBetweenHorizontalWalls = headSnakeX < minWallX || headSnakeX > maxWallX;
            const isNotBetweenVerticalWalls = headSnakeY < minWallY || headSnakeY > maxWallY;

            if(isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
                wallCollision = true;
            }

            for(let i = 0; i < restSnake.length; i++) {
                if(headSnakeX === restSnake[i][0] && headSnakeY === restSnake[i][1]){
                    snakeCollision = true;
                }
            }

            return wallCollision || snakeCollision;
        };
        this.isEatingApple = function(apple) {
            const headSnake = this.body[0];
            if(headSnake[0] === apple.position[0] && headSnake[1] === apple.position[1]) {
                return true;
            } else {
                return false;
            }
        };
    }

    function Apple (position) {
        this.position = position;
        this.draw = function () {
            context.save();
            context.fillStyle = '#33cc33';
            context.beginPath();
            const radius = blockSize / 2 ;
            const xCoord = this.position[0] * blockSize + radius;
            const yCoord = this.position[1] * blockSize + radius;
            context.arc(xCoord, yCoord, radius, Math.PI * 2, false);
            context.fill();
            context.restore();
        };
        this.setNewPosition = function() {
            const newX = Math.round(Math.random() * (widthInBlock - 1));
            const newY = Math.round(Math.random() * (heighInBlock - 1));
            this.position = [newX, newY];
        };
        this.isOnSnake = function(snake) {
            let isOnSnake = false;

            for(let i = 0; i < snake.body.length; i++) {
                if(this.position[0] === snake.body[i][0] && this.position[1] === snake.body[i][1]){
                    isOnSnake = true;
                }
            };
            return isOnSnake;
        }
    }

    init();  

    document.onkeydown = function handleKeyDown (event) {
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

