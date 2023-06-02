export class Drawing {
    static gameOver(context, centreX, centreY, delay) {
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
