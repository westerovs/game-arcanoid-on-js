/* eslint-disable comma-dangle */
/* eslint-disable no-multiple-empty-lines */

window.addEventListener('load', () => {
    game.start();
});


const game = {
    ctx: null,
    ball: null,
    platform: null,
    blocks: [],
    rows: 4,
    cols: 8,
    sprites: {
        background: null,
        ball: null,
        platform: null,
        block: null,
    },
    init: function() {
        this.ctx = document.getElementById('mycanvas').getContext('2d');
    },
    preload(callback) {
        let loaded = 0;
        let requered = Object.keys(this.sprites).length;

        const onImageLoad = () => {
            ++loaded;
            if (loaded >= requered) {
                callback();
            }
        };

        for (let key in this.sprites) {
            this.sprites[key] = new Image();
            this.sprites[key].src = `img/${key}.png`;
            this.sprites[key].addEventListener('load', onImageLoad);
        }
    },
    create() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.blocks.push({
                    x: 64 * col + 65,
                    y: 24 * row + 35
                });
            }
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
                this.ball.height // масштаб
            );
            this.ctx.drawImage(this.sprites.platform, this.platform.x, this.platform.y);
            this.renderBlock();
        });
    },
    renderBlock: function() {
        for (const item of this.blocks) {
            this.ctx.drawImage(this.sprites.block, item.x, item.y);
        }
    },
    start: function() {
        this.init();
        this.preload(() => {
            this.create();
            this.run();
        });
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










