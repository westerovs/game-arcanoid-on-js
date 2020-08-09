/* eslint-disable comma-dangle */
/* eslint-disable no-multiple-empty-lines */
// let test = 'game started';

window.addEventListener('load', () => {
    game.start();
});

const KEYS = {
    LEFT: 37,
    RIGHT: 39,
};

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
    setEvents() {
        window.addEventListener('keydown', event => {
            this.platform.start(event.keyCode);
        });
        window.addEventListener('keyup', event => {
            this.platform.stop(event.keyCode);
        });
    },
    init: function() {
        this.ctx = document.getElementById('mycanvas').getContext('2d');
        this.setEvents();
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
    update() {
        this.platform.move();
    },
    run: function() {
        window.requestAnimationFrame(() => {
            // console.log(test);
            this.update();
            this.render();
            this.run();
        });
    },
    render: function () {
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
        this.renderBlocks();
    },
    renderBlocks: function() {
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
    dx: 0,
    velocity: 6,
    move() {
        // если платформа движется
        if (this.dx) {
            this.x += this.dx;
            game.ball.x += this.dx;
        }
    },
    start(direction) {
        if (direction === KEYS.LEFT) {
            this.dx = -this.velocity;
        }
        if (direction === KEYS.RIGHT) {
            this.dx = this.velocity;
        }
    },
    stop(direction) {
        if (direction === KEYS.LEFT) {
            this.dx = 0;
        }
        if (direction === KEYS.RIGHT) {
            this.dx = 0;
        }
    }
};










