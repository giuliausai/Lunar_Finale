var mainScene = {

  preload: function () {
      this.game.load.image('player', 'assets/player.png');
      this.game.load.image('wall', 'assets/wall.png');
      this.game.load.image('coin', 'assets/coin.png');
      this.game.load.image('enemy', 'assets/enemy.png');
  },

  create: function () {
    var me = this;

    // Get the dimensions of the tile we are using
    me.tileWidth = me.game.cache.getImage('wall').width;
    me.tileHeight = me.game.cache.getImage('wall').height;

    //Set the background colour to blue
    me.game.stage.backgroundColor = '479cde';

    //Enable the Arcade physics system
    me.game.physics.startSystem(Phaser.Physics.ARCADE);

    //Add a platforms group to hold all of our tiles, and create a bunch of them
    me.platforms = me.game.add.group();
    me.platforms.enableBody = true;
    me.platforms.createMultiple(250, 'wall');

    me.timer = game.time.events.loop(2000, me.addPlatform, me);

    me.spacing = 300;

    //Create the inital on screen platforms
    me.initPlatforms();
  },

  update: function () {

  },

  addTile: function(x, y){
    var me = this;

    //Get a tile that is not currently on screen
    var tile = me.platforms.getFirstDead();

    //Reset it to the specified coordinates
    tile.reset(x, y);
    tile.body.velocity.y = 150; 
    tile.body.immovable = true;

    //When the tile leaves the screen, kill it
    tile.checkWorldBounds = true;
    tile.outOfBoundsKill = true;    
},

addPlatform: function(y){
    var me = this;

    //If no y position is supplied, render it just outside of the screen
    if( typeof(y) == "undefined" ){
        y = -me.tileHeight;
    }

    // Work out how many tiles we need to fit across the whole screen
    var tilesNeeded = Math.ceil(me.game.world.width / me.tileWidth);

    //Add a hole randomly somewhere
    var hole = Math.floor(Math.random() * (tilesNeeded - 3)) + 1;

    //Keep creating tiles next to each other until we have an entire row
    //Don't add tiles where the random hole is
    for (var i = 0; i < tilesNeeded; i++){
        if (i != hole && i != hole + 1){
            this.addTile(i * me.tileWidth, y); 
        }           
    }
  },

  initPlatforms: function(){

    var me = this,
        bottom = me.game.world.height - me.tileHeight,
        top = me.tileHeight;

    //Keep creating platforms until they reach (near) the top of the screen
    for(var y = bottom; y > top - me.tileHeight; y = y - me.spacing){
        me.addPlatform(y);
    }

}

};

// var config = {
//   type: Phaser.AUTO,
//   width: 800,
//   height: 600,
//   scene: mainScene
// };

// var game = new Phaser.Game(config);

var game = new Phaser.Game(375, 667, Phaser.AUTO, 'phaser-example', mainScene);