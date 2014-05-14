!function(a){function b(a,b,c){function d(){c.apply(this,arguments)}Phaser.Group.call(this,a),_.isFunction(c)||console.log("constructor required"),d.prototype=Object.create(c.prototype);for(var e=0;b>e;e++){var f=new d(a,0,0);this.add(f),f.kill()}}b.prototype=Object.create(Phaser.Group.prototype),b.prototype.constructor=b,_.extend(b.prototype,{obtain:function(a,b){var c=this.getFirstDead();return c.reset(a,b),c},size:function(){var a=0;return this.forEach(function(){a++}),a}}),a.Pool=b}(this),function(a){function b(a,c,d){Phaser.Sprite.call(this,a,c,d,"player"),this.animations.add("up",[1]),this.animations.add("down",[0]),this.animations.add("right",[3]),this.animations.add("left",[2]),this.animations.add("firing-down",[4,8],b.BlinkRate,!0),this.animations.add("firing-up",[5,9],b.BlinkRate,!0),this.animations.add("firing-left",[6,10],b.BlinkRate,!0),this.animations.add("firing-right",[7,11],b.BlinkRate,!0),this.animations.play("up"),this.direction=Phaser.UP,this.isShooting=!1,this.prev={direction:Phaser.NONE,isShooting:!1},a.physics.enable(this,Phaser.Physics.ARCADE),this.body.setSize(3,3),this.body.bounce.setTo(.5,.5),this.body.drag.setTo(.5,.5);var e=this.game.input.keyboard,f=this.keys=e.createCursorKeys();_.extend(f,{shoot:e.addKey(Phaser.Keyboard.X),boost:e.addKey(Phaser.Keyboard.Z)}),f.boost.onDown.add(this.burst,this),e.addKeyCapture(_.values(f));var g=this.lasers={};g[Phaser.UP]=a.make.tileSprite(1,-32,1,32,"player-laser"),g[Phaser.DOWN]=a.make.tileSprite(1,3,1,32,"player-laser"),g[Phaser.LEFT]=a.make.tileSprite(-32,1,32,1,"player-laser"),g[Phaser.RIGHT]=a.make.tileSprite(3,1,32,1,"player-laser"),_.forEach(g,function(a){this.addChild(a),a.alpha=.5,a.visible=!1},this)}_.extend(b,{Boost:5,Burst:10,BlinkRate:6,preload:function(a){a.spritesheet("player","assets/player.a05c139f.png",4,4,12),a.image("player-laser","assets/player laser.ebf029bb.png"),a.audio("player-jump",["assets/jump.ec8f3229.mp3","assets/jump.aaf83c6f.ogg"]),a.audio("player-shoot",["assets/player shoot.60339f1b.mp3","assets/player shoot.0f65a963.ogg"])}}),b.prototype=Object.create(Phaser.Sprite.prototype),b.prototype.constructor=b,_.extend(b.prototype,{update:function(){this.prev.direction=this.direction,this.prev.isShooting=this.isShooting;var a=this.keys;a.left.isDown&&(this.direction=Phaser.LEFT),a.down.isDown&&(this.direction=Phaser.DOWN),a.right.isDown&&(this.direction=Phaser.RIGHT),a.up.isDown&&(this.direction=Phaser.UP),this.isShooting=a.shoot.isDown,this.isBoosting=a.boost.isDown;var c="";switch(this.direction){case Phaser.LEFT:c="left";break;case Phaser.RIGHT:c="right";break;case Phaser.UP:c="up";break;case Phaser.DOWN:c="down"}this.prev.isShooting&&(this.lasers[this.prev.direction].visible=!1),this.isShooting?(this.animations.play("firing-"+c),this.lasers[this.direction].visible=!0):this.animations.play(c);var d=this.body.acceleration;if(this.isBoosting)switch(this.direction){case Phaser.LEFT:d.setTo(-b.Boost,0);break;case Phaser.RIGHT:d.setTo(b.Boost,0);break;case Phaser.UP:d.setTo(0,-b.Boost);break;case Phaser.DOWN:d.setTo(0,b.Boost)}else d.setTo(0,0)},burst:function(){var a=this.body.velocity;switch(this.direction){case Phaser.LEFT:a.x-=b.Burst;break;case Phaser.RIGHT:a.x+=b.Burst;break;case Phaser.UP:a.y-=b.Burst;break;case Phaser.DOWN:a.y+=b.Burst}}}),a.Player=b}(this),function(a){function b(){}_.extend(b,{preload:function(a){a.image("test-tiles-green","assets/test tiles green.9be13b98.png"),a.tilemap("green-test-arena","assets/green test arena.22ce4dd6.json",void 0,Phaser.Tilemap.TILED_JSON)}}),b.prototype={create:function(){this.game.physics.startSystem(Phaser.Physics.ARCADE);var a=this.map=this.add.tilemap("green-test-arena");a.addTilesetImage("test tiles green","test-tiles-green",4,4),a.setCollision([3,4,11,12]);var b=this.layer=a.createLayer("terrain");b.resizeWorld();var c=this.player=this.add.existing(new Player(this.game,12,20));this.game.camera.follow(c)},update:function(){var a=this.game.physics,b=this.player,c=this.layer;a.arcade.collide(b,c)}},a.Game=b}(this),function(a){function b(){}b.prototype={preload:function(){this.load.image("loading-bar","assets/loading bar.f44b1a70.png"),this.load.image("loading-bag-bg","assets/loading bar bg.1fe86dc8.png")},create:function(){this.game.scale.scaleFactor.setTo(4,4),this.state.start("preload")}},a.Boot=b}(this),function(a){function b(){}b.prototype={preload:function(){var a=-134,b=12,c=this.add,d=this.load;c.sprite(a,b,"loading-bar-bg");var e=c.sprite(a,b,"loading-bar");d.setPreloadSprite(e),d.bitmapFont("minecraftia","assets/minecraftia.d0c5b06a.png","assets/minecraftia.ddf29ec1.xml"),Game.preload(d),Player.preload(d),d.onLoadComplete.addOnce(this.onLoadComplete,this)},create:function(){this.stage.backgroundColor="#000000"},onLoadComplete:function(){this.state.start("game")}},a.Preload=b}(this),function(a){function b(){Phaser.Game.apply(this,arguments)}function c(a,b,c){var d=a[b];a[b]=function(){var a=this.__super;this.__super=d,c.apply(this,arguments),this.__super=a}}b.prototype=Object.create(Phaser.Game.prototype),b.prototype.constructor=b,c(b.prototype,"boot",function(){this.__super();var a=document.getElementById("canvas"),b=this.upscaledContext=a.getContext("2d");b.imageSmoothingEnabled=!1,b.webkitImageSmoothingEnabled=!1,b.mozImageSmoothingEnabled=!1,b.oImageSmoothingEnabled=!1}),c(b.prototype,"update",function(a){this.__super(a),this.upscaledContext.drawImage(this.canvas,0,0,256,256)}),a.UpscaledGame=b}(this);var game=new UpscaledGame(32,32,Phaser.AUTO,"game-container");game.state.add("boot",Boot),game.state.add("preload",Preload),game.state.add("game",Game),game.state.start("boot"),game.antialias=!1;