/* eslint-disable comma-dangle */
/* eslint-disable no-multiple-empty-lines */


const game = {
    start: function() {
        this.ctx = document.getElementById('mycanvas').getContext('2d');
        const background = new Image();
        background.src = 'img/background.png';
        window.requestAnimationFrame(() => {
            this.ctx.drawImage(background, 0, 0);
        });
    }
};

window.addEventListener('load', () => {
    game.start();
});












