(function(exports) {
	function Preload() {}

	Preload.prototype = {
		preload: function() {
			var x = -134,
				y = 12,
				add = this.add,
				load = this.load;

			add.sprite(x, y, 'loading-bar-bg');

			var loadingBar = add.sprite(x, y, 'loading-bar');
			load.setPreloadSprite(loadingBar);

			load.bitmapFont('minecraftia', 'assets/font/minecraftia.png', 'assets/font/minecraftia.xml');
			// Preload content here

			load.onLoadComplete.addOnce(this.onLoadComplete, this);					
		},
		create: function() {
			this.stage.backgroundColor = '#000000';
		},
		onLoadComplete: function() {
			this.state.start('game');
		}
	};

	exports.Preload = Preload;
})(this);