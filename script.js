window.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '600px';
    canvas.style.border = '1px solid';
    document.body.appendChild(canvas);

    // Je récupère le contexte du canvas et je dessine en 2D
    const context = canvas.getContext('2d');
    // Je spécifie la couleur du contexte avec fillStyle
    context.fillStyle= '#ff0000';
    // Création d'un rectangle avec fillRect
    context.fillRect(30, 30, 100, 50);
}