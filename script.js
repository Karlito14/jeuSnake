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

    class Drawing {
        static gameOver(context, centreX, centreY) {
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

        static drawScore(context, centreX, centreY, score) {
            context.save();
            context.font = 'bold 200px sans-serif';
            context.fillStyle = 'gray';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(score.toString(), centreX, centreY);
            context.restore();
        };

        static drawBlock (context, position, blockSize) {
            const [xCoord, yCoord] = position;
            context.fillRect(xCoord * blockSize, yCoord * blockSize, blockSize, blockSize);
        };

        static drawSnake (context, blockSize, snake) {
            context.save();
            context.fillStyle= '#ff0000';
            for(let block of snake.body) {
                this.drawBlock(context, block, blockSize);
            }
            context.restore();
        };

        static drawApple (context, blockSize, apple) {
            context.save();
            context.fillStyle = '#33cc33';
            context.beginPath();
            const radius = blockSize / 2 ;
            const xCoord = apple.position[0] * blockSize + radius;
            const yCoord = apple.position[1] * blockSize + radius;
            context.arc(xCoord, yCoord, radius, Math.PI * 2, false);
            context.fill();
            context.restore();
        };
    }

    class Snake {

        constructor(body, direction = 'right') {
            this.body = body;
            this.direction = direction;
            this.ateApple = false;
        }
        
        advance () {
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
        setDirection (newDirection) {
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
        checkCollision () {
            let wallCollision = false;
            let snakeCollision = false;
            const [headSnake, ...restSnake] = this.body;
            const [headSnakeX, headSnakeY] = headSnake;
            const minWallX = 0;
            const minWallY = 0;
            const maxWallX = widthInBlock - 1;
            const maxWallY = heighInBlock - 1;
            const isNotBetweenHorizontalWalls = headSnakeX < minWallX || headSnakeX > maxWallX;
            const isNotBetweenVerticalWalls = headSnakeY < minWallY || headSnakeY > maxWallY;

            if(isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
                wallCollision = true;
            }

            for(let rest of restSnake) {
                if(headSnakeX === rest[0] && headSnakeY === rest[1]){
                    snakeCollision = true;
                }
            }

            return wallCollision || snakeCollision;
        };
        isEatingApple (apple) {
            const headSnake = this.body[0];
            if(headSnake[0] === apple.position[0] && headSnake[1] === apple.position[1]) {
                return true;
            } else {
                return false;
            }
        };     
    }

    class Apple {
        constructor(position = [10, 10]){
            this.position = position;
        }
        
        setNewPosition () {
            const newX = Math.round(Math.random() * (widthInBlock - 1));
            const newY = Math.round(Math.random() * (heighInBlock - 1));
            this.position = [newX, newY];
        };
        isOnSnake (snake) {
            let isOnSnake = false;

            for(let body of snake.body) {
                if(this.position[0] === body[0] && this.position[1] === body[1]){
                    isOnSnake = true;
                }
            };
            return isOnSnake;
        }
    } 

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
        if(snakee.checkCollision()){
            score = 0;
            Drawing.gameOver(context, centreX, centreY);
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

