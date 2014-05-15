(function(exports) {
	function Fighter(game, x, y) {
		Phaser.Sprite.call(this, game, x, y, 'fighter');

		this.anchor.setTo(0.5, 0.5);

		this.animations.add('up', [0]);
		this.animations.add('left', [1]);
		this.animations.add('down', [2]);
		this.animations.add('right', [3]);
		
		this.direction = Phaser.UP;
		this.animations.play('up');

		this.target = null;

		var reticle = this.reticle = new SmallReticle(game);
		this.addChild(reticle);
	}

	_.extend(Fighter, {
		preload: function(load) {
			load.spritesheet('fighter', 'assets/spritesheet/fighter.png', 4, 4);
		}
	});

	Fighter.prototype = Object.create(Phaser.Sprite.prototype);
	Fighter.prototype.constructor = Fighter;

	_.extend(Fighter.prototype, {
	});

	exports.Fighter = Fighter;
})(this);