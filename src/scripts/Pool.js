(function(exports) {
	function Pool(game, size, ctor) {
		Phaser.Group.call(this, game);

		if(!_.isFunction(ctor))
			console.log('constructor required');

		function Thunk() { ctor.apply(this, arguments); }
		Thunk.prototype = Object.create(ctor.prototype);

		for(var i = 0; i < size; i++) {
			var object = new Thunk(game, 0, 0);
			this.add(object);
			object.kill();
		}	
	}

	Pool.prototype = Object.create(Phaser.Group.prototype);
	Pool.prototype.constructor = Pool;

	_.extend(Pool.prototype, {
		obtain: function(x, y) {
			var object = this.getFirstDead(); 
			object.reset(x, y);
			
			return object;
		},
		size: function() {
			var count = 0;
			this.forEach(function() { count++ });

			return count;
		}
	});

	exports.Pool = Pool;
})(this);