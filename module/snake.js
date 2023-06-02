export class Snake {

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

        if(allowedDirections.includes(newDirection)) {
            this.direction = newDirection;
        }
    };
    checkCollision (widthInBlock, heighInBlock) {
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
