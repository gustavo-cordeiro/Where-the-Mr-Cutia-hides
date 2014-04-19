/**
 * The Site Animation.
 * @returns {TrixterAnimation}
 */
function TrixterAnimation() {
      var count = 1;
      /**
       * Crate the stage for trixter. 
       * @type @exp;PIXI@call;Stage
       */
      var stage;

      /**
       * The canvas instace.
       * @type type
       */
      var view;
      /**
       * create a renderer instance
       * @type @exp;PIXI@call;autoDetectRenderer
       */
      var renderer;

      /**
       * create an empty container
       * @type @exp;PIXI@call;DisplayObjectContainer
       */
      var trixterContainer;

      /**
       * create an empty container
       * @type @exp;PIXI@call;DisplayObjectContainer
       */
      var middleContainer;

      /**
       * create an empty container
       * @type @exp;PIXI@call;DisplayObjectContainer
       */
      var staticPlataformesContainer;
      /**
       * The Bright Star sprite.
       * @type @exp;PIXI@call;Sprite
       */
      var brightStar;
     
      /**
       * The cloud sprite.
       * @type @exp;PIXI@call;Sprite
       */
      var clouds;
     
      /**
       * The space sprite.
       * @type @exp;PIXI@call;Sprite
       */
      var space;
      
      /*
       * The walker animation.
       * @type @exp;PIXI@call;MovieClip
       */
      var trixterWalker;

      /**
       * The jump sprite.
       * @type @exp;PIXI@call;Sprite
       */
      var trixterJump;

      /**
       * The idle sprite.
       * @type @exp;PIXI@call;Sprite
       */
      var trixterIdle;

      /**
       * Steps to make animation;
       * @type number
       */
      var step;

      /**
       * Last position
       * @type object
       */
      var lastTrixterPosition;

      /**
       * Timer Id
       * @type boolean
       */
      var timerID;
      
      /**
      
      /**
       * Start the Animation.
       * @returns {undefined}
       */
      this.init = function() {
            var assetsToLoader = ["../content/images/img/sprite/atlas.json"];

            var loader = new PIXI.AssetLoader(assetsToLoader);
            loader.onComplete = onAssetsLoaded;
            loader.load();

            step = 10;

            stage = new PIXI.Stage(0x66FF99);

            view = $('#back-animation');

            renderer = new PIXI.CanvasRenderer(view.width(), view.height(), view[0], true);

            middleContainer = new PIXI.DisplayObjectContainer();
            middleContainer.position.x = view.width() / 2 - $('.default-width-and-center').width() / 2;
            middleContainer.position.y = 0;
            stage.addChild(middleContainer);

            staticPlataformesContainer = new PIXI.DisplayObjectContainer();
            staticPlataformesContainer.position.x = 0;
            staticPlataformesContainer.position.y = 893;
            middleContainer.addChild(staticPlataformesContainer);

            trixterContainer = new PIXI.DisplayObjectContainer();
            trixterContainer.position.x = 0;
            trixterContainer.position.y = 135;
            middleContainer.addChild(trixterContainer);
            
            lastTrixterPosition = {
                  x: trixterContainer.position.x,
                  y: trixterContainer.position.y
            };
      };

      /**
       * Listener to asstes load.
       * @returns {undefined}
       */
      var onAssetsLoaded = function() {
            
            /*brightStar = new PIXI.TilingSprite(
                    PIXI.Texture.fromImage("../content/images/img/paralax/bright-star.png"),
                    801, 3478
            );
            stage.addChild(brightStar);

            clouds = new PIXI.TilingSprite(
                    PIXI.Texture.fromImage("../content/images/img/paralax/clouds.png"),
                    1024, view.height()
            );
            stage.addChild(clouds);
            clouds.position.x = middleContainer.position.x;
            
            /*space = new PIXI.TilingSprite(
                    PIXI.Texture.fromImage("../content/images/img/paralax/space.png"),
                    1024, view.height()
            );
            stage.addChild(space);
            space.position.x = middleContainer.position.x;*/

            setStaticsPlataformes();
            loadTrixterAnimation();

            //window.onscroll = go;
            go();
            // start animating
            requestAnimFrame(animate);
      };

      /**
       * The cycle animation.
       * @returns {undefined}
       */
      var animate = function() {
            // render the stage
            go();
            requestAnimFrame(animate);
            renderer.render(stage);
      };

      /**
       * Set the Trixter Animation;
       * @returns {undefined}
       */
      var loadTrixterAnimation = function() {
            var textures = [];
            for (var i = 1; i < 21; i++) {
                  textures.push(PIXI.Texture.fromFrame('walk-' + i));
            }
            trixterWalker = new PIXI.MovieClip(textures);
            trixterWalker.animationSpeed = (24 / 60);
            trixterContainer.addChild(trixterWalker);
            trixterWalker.play();
            trixterWalker.visible = false;

            trixterJump = PIXI.Sprite.fromFrame('jump');
            trixterContainer.addChild(trixterJump);

            trixterIdle = PIXI.Sprite.fromFrame('idle');
            trixterIdle.position.y = 17;
            trixterContainer.addChild(trixterIdle);
            trixterWalker.visible = trixterIdle;
      };

      /**
       * Set statics plataformes;
       * @returns {undefined}
       */
      var setStaticsPlataformes = function() {
            createStaticPlataformes('plataformer', 84, 0, 3);
            createStaticPlataformes('plataformer', 1, 291, 2);
            createStaticPlataformes('plataformer-pipe', 176, 278, 1);
            createStaticPlataformes('plataformer', 261, 291, 1);

            createStaticPlataformes('plataformer', 99, 626, 6);

            createStaticPlataformes('plataformer-bottom', 342, 835, 1);

            createStaticPlataformes('block', 22, 983, 4);

            createStaticPlataformes('plataformer', 15, 1332, 1);
            createStaticPlataformes('plataformer-bottom', 100, 1332, 1);
            createStaticPlataformes('plataformer', 186, 1332, 3);
            createStaticPlataformes('ladder', 104, 1366, 11, true);

            createStaticPlataformes('square', 100, 1715, 3);

            createStaticPlataformes('plataformer-bottom', 39, 1936, 1);

            createStaticPlataformes('square', 727, 1934, 2);

            createStaticPlataformes('plataformer-bottom', 60, 2226, 2);

            createStaticPlataformes('plataformer-bottom', 750, 2378, 1);

            createStaticPlataformes('bush', 298, 499, 1);
            createStaticPlataformes('bush', 286, 1232, 1);

            createStaticPlataformes('heart', 314, 1418, 4, false, 50);
            createStaticPlataformes('heart', 285, 1810, 3, false, 78);
            createStaticPlataformes('heart', 52, 1864, 1);
            createStaticPlataformes('heart', 115, 2146, 1);

            //After Cases.
            var marginTop = $('#contact').offset().top - staticPlataformesContainer.position.y;

            createStaticPlataformes('plataformer', 248, 13 + marginTop, 2);
            createStaticPlataformes('plataformer-pipe', 419, marginTop, 1);
            createStaticPlataformes('plataformer', 499, 13 + marginTop, 1);

            createStaticPlataformes('plataformer', 171, 814 + marginTop, 2);

            createStaticPlataformes('plataformer', 23, 1634 + marginTop, 1);
            createStaticPlataformes('plataformer-bottom', 109, 1634 + marginTop, 1);
            createStaticPlataformes('plataformer', 195, 1634 + marginTop, 1);
            createStaticPlataformes('plataformer-bottom', 281, 1634 + marginTop, 1);
            createStaticPlataformes('plataformer', 368, 1634 + marginTop, 6);
            createStaticPlataformes('ladder', 286, 1668 + marginTop, 4, true);
      };

      /**
       * Creat statics plataforms.
       * @param {string} plataformType - name of the frame;
       * @param {number} x - the x position;
       * @param {number} y - the y position;
       * @param {number} repeatNumber - Indicate repetition;
       * @param {boolean} repeatVertical - If repeat is if greater than 1, indicate the course.
       * @param {number} margin - If repeat is if greater than 1, indicate the margin between elements.
       * @returns {undefined}
       */
      var createStaticPlataformes = function(plataformType, x, y, repeatNumber, repeatVertical, margin) {
            margin = margin !== undefined ? margin : 0;

            var sprite;
            for (var i = 0; i < repeatNumber; i++) {
                  sprite = PIXI.Sprite.fromFrame(plataformType);

                  sprite.position.x = x;
                  sprite.position.y = y;

                  if (repeatVertical === true)
                        y += sprite.height + margin;
                  else
                        x += sprite.width + margin;

                  staticPlataformesContainer.addChild(sprite);
            }
            ;
      };

      var go = function() {
            var between = count;

            if (between < step * 62) {
                  trixterContainer.position.x = 64;
                  trixterContainer.position.y = between + 132;
            }
            else if (between < step * 82) {
                  trixterContainer.position.x = 64 + ((between + 132) - 755);
                  trixterContainer.position.y = 755;
            }
            else if (between < step * 115) {
                  trixterContainer.position.x = 395;
                  trixterContainer.position.y = between + Math.floor(Math.pow(((between - 755) / 636) * 25.2, 2));//y=(1180) - trixter.h(134);425;
            }
            else if (between < step * 126.4) {
                  trixterContainer.position.x = 395 - (269 * ((between - 1150) / 114));//99
                  trixterContainer.position.y = 1390;
            }
            else if (between < step * 132.1) {
                  trixterContainer.position.x = 395 - (269 * ((between - 1150) / 114));
                  trixterContainer.position.y = 1390;
            }
            else if (between < step * 147.1) {
                  trixterContainer.position.x = 22;
                  trixterContainer.position.y = 1748;
            }
            else if (between < step * 164.8) {
                  //Do animation.
            }
            else if (between < step * 184.8) {
                  trixterContainer.position.x = 430 - (242 * (1 - (1848 - between) / 200));//28
                  trixterContainer.position.y = 2090;
            }
            else if (between < step * 198.8) {
                  trixterContainer.position.x = 104;
                  trixterContainer.position.y = 2478 + (502 * (1 - (2478 - between) / 502));//1715+969-70-134
            }
            else if (between < step * 274.1) {
                  if (trixterContainer.position.x < 198)
                        trixterContainer.position.x = 198 - (94 * ((2069 - between) / 81));
                  else
                        trixterContainer.position.x = 198;
                  trixterContainer.position.y = 2478;
            }
            else if (between < step * 386) {
                  trixterContainer.position.x = 415;
                  trixterContainer.position.y = between + Math.floor(Math.pow((1 - (3860 - between) / 1119) * 24, 2));//371 + 134 + 96
            }
            
            setTrixterAnimation();
            
            lastTrixterPosition.x = trixterContainer.position.x;
            lastTrixterPosition.y = trixterContainer.position.y;
            count++;
      };

      var setTrixterAnimation = function() {
            if(timerID) clearTimeout(timerID);
            timerID = setTimeout( setTrixterAnimation , 100 );
                  
            
            //Set trixter side.
            trixterJump.visible = false;
            trixterIdle.visible = false;
            trixterWalker.visible = false;
            
            if (lastTrixterPosition.y !== trixterContainer.position.y)
                  trixterJump.visible = true;
            else {
                  if (lastTrixterPosition.x !== trixterContainer.position.x) {
                        trixterWalker.visible = true;
                        if (lastTrixterPosition.x < trixterContainer.position.x) {
                              trixterWalker.position.x = 0;
                              trixterWalker.scale.x = 1;
                        }
                        else if (lastTrixterPosition.x > trixterContainer.position.x) {
                              trixterWalker.position.x = trixterWalker.width;
                              trixterWalker.scale.x = -1;
                        }
                  } else
                        trixterIdle.visible = true;
            }
      };
}


