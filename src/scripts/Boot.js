(function(exports) {
	function Boot() {}

	Boot.prototype = {
		preload: function() {
			this.load.image('loading-bar', 'assets/img/loading bar.png');
			this.load.image('loading-bag-bg', 'assets/img/loading bar bg.png');
		},
		create: function() {
			this.game.scale.scaleFactor.setTo(4, 4);
			this.state.start('preload');
		}
	}

	exports.Boot = Boot;
})(this);