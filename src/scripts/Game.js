(function(exports) {
	function Game() {}

	_.extend(Game, {
		preload: function(load) {
			load.image('test-tiles-green', 'assets/img/test tiles green.png');
			load.tilemap('green-test-level', 'assets/tilemap/green test level.json', undefined, Phaser.Tilemap.TILED_JSON);
		}
	});

	Game.prototype = {
		create: function() {
			this.game.physics.startSystem(Phaser.Physics.ARCADE);

			var map = this.map = this.add.tilemap('green-test-level');
			map.addTilesetImage('Green Tiles', 'test-tiles-green', 4, 4);
			map.setCollision(2);

			var layer = this.layer = map.createLayer('terrain');
			layer.resizeWorld();

			var player = this.player = this.add.existing(new Player(this.game, 12, 20));
			this.game.camera.follow(player);
		},
		
		update: function() {
			var physics = this.game.physics,
				player = this.player,
				world = this.layer;

			physics.arcade.collide(player, world);
		}
	}

	exports.Game = Game;	
})(this);