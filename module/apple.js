export class Apple {
    constructor(position = [10, 10]){
        this.position = position;
    }
    
    setNewPosition (widthInBlock, heighInBlock) {
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
