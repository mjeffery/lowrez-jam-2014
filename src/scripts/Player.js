(function(exports) {
	function Player(game, x, y) {
		Phaser.Sprite.call(this, game, x, y, 'player');

		this.animations.add('stand', [0]);
		this.animations.play('stand');

		this.sounds = {
			jump: game.add.audio('player-jump'),
			shoot: game.add.audio('player-shoot')
		};

		// shooting
		var bullets = this.bullets = new Pool(game, 10, PlayerBullet);
		game.add.existing(bullets);

		// physics
		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.setSize(3, 6, 0, 2);
		this.body.acceleration.y = Player.Gravity; 

		this.grounded = false;
		this.canVariableJump = false;

		// input
		var input = this.game.input.keyboard,
			keys = this.keys = input.createCursorKeys();

		_.extend(keys, {
			jump: input.addKey(Phaser.Keyboard.Z),
			shoot: input.addKey(Phaser.Keyboard.X) 
		});

		input.addKeyCapture(_.values(keys));

		keys.shoot.onDown.add(this.shoot, this);
	}

	_.extend(Player, {
		Speed: {
			Walk: 9,
		},
		Jump: {
			Speed: -30,
			Duration: 150
		},
		Bullet: {
			Speed: 24
		},
		Gravity: 60,
		preload: function(load) {
			load.spritesheet('player', 'assets/spritesheet/player.png', 4, 8);
			load.audio('player-jump', ['assets/audio/jump.mp3', 'assets/audio/jump.ogg']);
			load.audio('player-shoot', ['assets/audio/player shoot.mp3', 'assets/audio/player shoot.ogg']);
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
				this.sounds.jump.play();
				this.body.velocity.y = Player.Jump.Speed;
				this.canVariableJump = true;
			}

			if(this.canVariableJump && keys.jump.justPressed(Player.Jump.Duration))
				this.body.velocity.y = Player.Jump.Speed;
			
			if(keys.jump.isUp) 
				this.canVariableJump = false;
		},

		shoot: function() {
			var x, y, vel;

			if(this.facing == Phaser.LEFT) {
				x = this.x;
				y = this.y + 3;
				vel = -Player.Bullet.Speed;
			}
			else {
				x = this.x + 3;
				y = this.y + 3;
				vel = Player.Bullet.Speed;
			}

			var bullet = this.bullets.obtain(x, y);
			bullet.body.velocity.x = vel;
		}
	});

	exports.Player = Player;
})(this);