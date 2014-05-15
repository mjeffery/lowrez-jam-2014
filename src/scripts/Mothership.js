(function(exports) {
	function Mothership(game, x, y) {
		Phaser.Sprite.call(this, game, x, y, 'mothership');

		this.anchor.setTo(0.5, 0.5);

		this.animations.add('closed', [0]);
		this.animations.add('opening', [1, 2, 3, 4, 5], Mothership.HATCH_RATE);
		this.animations.add('closing', [5, 4, 3, 2, 1], Mothership.HATCH_RATE);
		this.animations.play('closed', [5]);

		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.setSize(6, 6, 1, 1);
	}	

	_.extend(Mothership, {
		HATCH_RATE: 1,
		preload: function(load) {
			load.spritesheet('mothership', 'assets/spritesheet/mothership.png', 8, 8, 6);
		}
	});

	Mothership.prototype = Object.create(Phaser.Sprite.prototype);
	Mothership.prototype.constructor = Mothership;

	_.extend(Mothership.prototype, {

	});

	exports.Mothership = Mothership;
})(this);