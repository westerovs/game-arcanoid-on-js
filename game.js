/* eslint-disable comma-dangle */
/* eslint-disable no-multiple-empty-lines */

const game = {
    ctx: null,
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
            this.ctx.drawImage(this.sprites.ball, 0, 0);
            this.ctx.drawImage(this.sprites.platform, 0, 0);
        });
    },
    start: function() {
        this.init();
        this.preload(() => this.run());
    }
};

window.addEventListener('load', () => {
    game.start();
});












