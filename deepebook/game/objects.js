class Character {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
    }
}
var me = new Character(120, 230);

class Enemy {
  constructor() {
    this.alive = true;
    this.x = 0;
  }
}
var enemies = [];
for (var i = 0; i < 10; i++) {
    var new_enemy = new Enemy();
    enemies.push(new_enemy);
}

class Pulsar {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

var pulsars = [];

class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

var bullets = [];