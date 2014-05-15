(function(exports) {
	function Player(game, x, y) {
		Phaser.Sprite.call(this, game, x, y, 'player');

		this.animations.add('up', [1]);
		this.animations.add('down', [0]);
		this.animations.add('right', [3]);
		this.animations.add('left', [2]);
		this.animations.add('firing-down', [4, 8], Player.BlinkRate, true);
		this.animations.add('firing-up', [5, 9], Player.BlinkRate, true);
		this.animations.add('firing-left', [6, 10], Player.BlinkRate, true);
		this.animations.add('firing-right', [7, 11], Player.BlinkRate, true);

		this.animations.play('up');
		
		this.direction = Phaser.UP;
		this.isShooting = false;
		this.prev = {
			direction: Phaser.NONE,
			isShooting: false
		}

		// physics
		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.setSize(3,3);
		this.body.bounce.setTo(0.5, 0.5);
		this.body.drag.setTo(0.5, 0.5);

		// input
		var input = this.game.input.keyboard,
			keys = this.keys = input.createCursorKeys();

		_.extend(keys, {
			shoot: input.addKey(Phaser.Keyboard.X),
			boost: input.addKey(Phaser.Keyboard.Z)
		});

		keys.boost.onDown.add(this.burst, this);

		input.addKeyCapture(_.values(keys));

		//set up the lasers
		var lasers = this.lasers = {};

		lasers[Phaser.UP] = game.make.tileSprite(1, -32, 1, 32, 'player-laser');
		lasers[Phaser.DOWN] = game.make.tileSprite(1, 3, 1, 32, 'player-laser');
		lasers[Phaser.LEFT] = game.make.tileSprite(-32, 1, 32, 1, 'player-laser');
		lasers[Phaser.RIGHT] = game.make.tileSprite(3, 1, 32, 1, 'player-laser');

		_.forEach(lasers, function(laser) {
			this.addChild(laser);
			laser.alpha = 0.5;
			laser.visible = false;
		}, this);

	}

	_.extend(Player, {
		Boost: 5,
		Burst: 10,
		BlinkRate: 6,
		preload: function(load) {
			load.spritesheet('player', 'assets/spritesheet/player.png', 4, 4, 12);
			load.image('player-laser', 'assets/img/player laser.png');

			load.audio('player-jump', ['assets/audio/jump.mp3', 'assets/audio/jump.ogg']);
			load.audio('player-shoot', ['assets/audio/player shoot.mp3', 'assets/audio/player shoot.ogg']);
		}
	});

	Player.prototype = Object.create(Phaser.Sprite.prototype);
	Player.prototype.constructor = Player;

	_.extend(Player.prototype, {
		update: function() {
			this.prev.direction = this.direction,
 			this.prev.isShooting = this.isShooting;

			var keys = this.keys;
			if(keys.left.isDown) this.direction = Phaser.LEFT;
			if(keys.down.isDown) this.direction = Phaser.DOWN;
			if(keys.right.isDown) this.direction = Phaser.RIGHT;
			if(keys.up.isDown) this.direction = Phaser.UP;

			this.isShooting = keys.shoot.isDown;
			this.isBoosting = keys.boost.isDown;

			var anim = '';
			switch(this.direction) {
				case Phaser.LEFT: anim = 'left'; break;
				case Phaser.RIGHT: anim = 'right'; break;
				case Phaser.UP: anim = 'up'; break;
				case Phaser.DOWN: anim = 'down'; break;
			}

			if(this.prev.isShooting)
				this.lasers[this.prev.direction].visible = false;

			if(this.isShooting) { 
				this.animations.play('firing-' + anim);
				this.lasers[this.direction].visible = true;
			}
			else  
				this.animations.play(anim);

			var accel = this.body.acceleration;
			if(this.isBoosting) {
				switch(this.direction) {
					case Phaser.LEFT:  accel.setTo(-Player.Boost, 0);  break;
					case Phaser.RIGHT: accel.setTo(Player.Boost, 0);   break;
					case Phaser.UP:    accel.setTo(0, -Player.Boost); break;
					case Phaser.DOWN:  accel.setTo(0, Player.Boost);   break;
				}
			}
			else {
				accel.setTo(0, 0);
			}

		},

		burst: function() {
			var vel = this.body.velocity;
			switch(this.direction) {
				case Phaser.LEFT:  vel.x -= Player.Burst; break; 
				case Phaser.RIGHT: vel.x += Player.Burst; break; 
				case Phaser.UP:    vel.y -= Player.Burst; break;
				case Phaser.DOWN:  vel.y += Player.Burst; break; 
			}
		},

		hitWithLaser: function(object, callback, context) {
			if(!this.isShooting) return;

			if(object.type === Phaser.SPRITE) {
				if(this.testLaser(object)) 
					callback.call(context, object);
			}
			else if (object.type === Phaser.GROUP) {
				for(var i = 0, len = object.children.length; i < len; i++)
					this.hitWithLaser(object.children[i], callback, context);
			}
		},

		testLaser: function(object) {
			if(!this.isShooting) return false;

			var bounds = this.lasers[this.direction].getBounds();
			return Phaser.Rectangle.intersects(bounds, object.getBounds());
		}
	});

	exports.Player = Player;
})(this);