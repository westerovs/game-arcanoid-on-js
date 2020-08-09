/* eslint-disable comma-dangle */
/* eslint-disable no-multiple-empty-lines */

window.addEventListener('load', () => {
    game.start();
});


const game = {
    ctx: null,
    ball: null,
    platform: null,
    sprites: {
        background: null,
        ball: null,
        platform: null
    },
    init: function() {
        this.ctx = document.getElementById('mycanvas').getContext('2d');
    },
    preload: function (callback) {
        let loaded = 0;
        let requered = Object.keys(this.sprites).length;

        for (let key in this.sprites) {
            this.sprites[key] = new Image();
            this.sprites[key].src = `img/${key}.png`;

            this.sprites[key].addEventListener('load', () => {
                ++loaded;

                if (loaded >= requered) {
                    callback();
                }
            });
        }
    },
    run: function() {
        this.render();
    },
    render: function() {
        window.requestAnimationFrame(() => {
            this.ctx.drawImage(this.sprites.background, 0, 0);
            this.ctx.drawImage(
                this.sprites.ball,
                0, // позиция смещения img
                0, // позиция смещения img
                this.ball.width,
                this.ball.height,
                this.ball.x,
                this.ball.y,
                this.ball.width, // масштаб
                this.ball.height, // масштаб
            );
            this.ctx.drawImage(this.sprites.platform, this.platform.x, this.platform.y);
        });
    },
    start: function() {
        this.init();
        this.preload(() => this.run());
    }
};

game.ball = {
    x: 320,
    y: 280,
    width: 20,
    height: 20,
};

game.platform = {
    x: 280,
    y: 300,
};










