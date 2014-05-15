(function(exports) {
	function SmallReticle(game) {
		Phaser.Sprite.call(this, game, 0, 0, 'small-reticle');
		
		this.anchor.setTo(0.5, 0.5);

		this.animations.add('start-up', [5, 6, 7, 3], SmallReticle.ANIM_RATE);
		this.animations.add('loop', [3, 4, 0, 1, 2], SmallReticle.ANIM_RATE, true);
		
		this.events.onAnimationComplete.add(this.onAnimationComplete, this);
		this.visible = false;
		this.alpha = .5;
	}

	_.extend(SmallReticle, {
		ANIM_RATE: 8,
		preload: function(load) {
			load.spritesheet('small-reticle', 'assets/spritesheet/small reticle.png', 8, 8);
		}
	});

	SmallReticle.prototype = Object.create(Phaser.Sprite.prototype);
	SmallReticle.prototype.constructor = SmallReticle;

	_.extend(SmallReticle.prototype, {
		start: function() {
			this.visible = true;
			this.animations.play('start-up');
		},
		stop: function() {
			this.animations.stop();
			this.visible = false;
		},
		onAnimationComplete: function(sprite, anim) {
			this.animations.play('loop');
		}
	});

	exports.SmallReticle = SmallReticle;
})(this);