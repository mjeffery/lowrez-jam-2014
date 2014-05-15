(function(exports) {
	function Game() {}

	_.extend(Game, {
		preload: function(load) {
			load.image('test-tiles-green', 'assets/img/test tiles green.png');
			load.tilemap('green-test-arena', 'assets/tilemap/green test arena.json', undefined, Phaser.Tilemap.TILED_JSON);
		}
	});

	Game.prototype = {
		create: function() {
			this.game.physics.startSystem(Phaser.Physics.ARCADE);

			var map = this.map = this.add.tilemap('green-test-arena');
			map.addTilesetImage('test tiles green', 'test-tiles-green', 4, 4);
			map.setCollision([3, 4, 11, 12]);

			var layer = this.layer = map.createLayer('terrain');
			layer.resizeWorld();

			var mothership = this.mothership = this.add.existing(new Mothership(this.game, 32, 32));

			var player = this.player = this.add.existing(new Player(this.game, 12, 20));
			this.game.camera.follow(player);

			var enemies = this.enemies = this.add.group();
			for(var i = 0; i < 10; i++) {
				var x = this.world.randomX,
					y = this.world.randomY,
					fighter = new Fighter(this.game, x, y);

				enemies.add(fighter);
			}

		},
		
		update: function() {
			var physics = this.game.physics,
				player = this.player,
				world = this.layer;

			physics.arcade.collide(player, world);
		
			player.hitWithLaser(this.enemies, function(enemy) {
				if(enemy.reticle) enemy.reticle.start();
				// TODO some kind of target management
			})
		}

	}

	exports.Game = Game;	
})(this);