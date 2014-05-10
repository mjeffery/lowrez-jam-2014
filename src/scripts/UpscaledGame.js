(function(exports) {
	function UpscaledGame() {
		Phaser.Game.apply(this, arguments);
	}

	UpscaledGame.prototype = Object.create(Phaser.Game.prototype);
	UpscaledGame.prototype.constructor = UpscaledGame;

	function override(object, key, fn) {
		var __super = object[key];
		object[key] = function() {
			var oldSuper = this.__super;
			this.__super = __super;
			fn.apply(this, arguments);
			this.__super = oldSuper;
		}
	}

	override(UpscaledGame.prototype, 'boot', function() {
		this.__super();

		var canvas = document.getElementById('canvas'); // TODO make this an argument?
		
		var ctx = this.upscaledContext = canvas.getContext('2d'); 
	 	ctx.imageSmoothingEnabled = false;
		ctx.webkitImageSmoothingEnabled = false;
		ctx.mozImageSmoothingEnabled = false;
		ctx.oImageSmoothingEnabled = false;
	});

	override(UpscaledGame.prototype, 'update', function(time) {
		this.__super(time);
		
		this.upscaledContext.drawImage(this.canvas, 0, 0, 256, 256); //TODO make upscale size an argument
	});

	exports.UpscaledGame = UpscaledGame;
})(this);