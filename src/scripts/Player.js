(function(exports) {
	function Player(game, x, y) {
		Phaser.Sprite.call(this, game, x, y, 'player');

		this.animations.add('stand', [0]);
		this.animations.play('stand');

		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.setSize(3, 6, 0, 2);
		this.body.acceleration.y = Player.Gravity; 

		this.grounded = false;
		this.canVariableJump = false;

		var input = this.game.input.keyboard,
			keys = this.keys = input.createCursorKeys();

		_.extend(keys, {
			jump: input.addKey(Phaser.Keyboard.Z),
			shoot: input.addKey(Phaser.Keyboard.X) 
		});

		input.addKeyCapture(_.values(keys));
	}

	_.extend(Player, {
		Speed: {
			Walk: 9,
		},
		Jump: {
			Speed: -30,
			Duration: 150
		},
		Gravity: 60,
		preload: function(load) {
			load.spritesheet('player', 'assets/spritesheet/player.png', 4, 8);
		}
	});

	Player.prototype = Object.create(Phaser.Sprite.prototype);
	Player.prototype.constructor = Player;

	_.extend(Player.prototype, {
		update: function() {
			var keys = this.keys,
				grounded = this.grounded = this.body.blocked.down;

			if(keys.left.isDown) {
				this.body.velocity.x = -Player.Speed.Walk;
				this.facing = Phaser.LEFT;
			}
			else if(keys.right.isDown) {
				this.body.velocity.x = Player.Speed.Walk;
				this.facing = Phaser.RIGHT;
			}
			else {
				this.body.velocity.x = 0;
			}

			// jump logic 
			if(grounded && keys.jump.justPressed(5)) {
				this.body.velocity.y = Player.Jump.Speed;
				this.canVariableJump = true;
			}

			if(this.canVariableJump && keys.jump.justPressed(Player.Jump.Duration))
				this.body.velocity.y = Player.Jump.Speed;
			
			if(keys.jump.isUp) 
				this.canVariableJump = false;
		}
	});

	exports.Player = Player;
})(this);