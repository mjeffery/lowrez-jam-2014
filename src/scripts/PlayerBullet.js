(function(exports) {
	function PlayerBullet(game, x, y) {
		Phaser.Sprite.call(this, game, x, y, 'player-bullet');

		this.animations.add('blink', [0, 1], 8, true);
		this.animations.play('blink');

		game.physics.enable(this, Phaser.Physics.ARCADE);
	}	

	_.extend(PlayerBullet, {
		preload: function(load) {
			load.spritesheet('player-bullet', 'assets/spritesheet/player bullet.png', 1, 1);
		}
	});

	PlayerBullet.prototype = Object.create(Phaser.Sprite.prototype);
	PlayerBullet.prototype.constructor = PlayerBullet;

	exports.PlayerBullet = PlayerBullet;
})(this);