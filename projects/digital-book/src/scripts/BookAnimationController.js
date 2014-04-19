function BookAnimationController(scale, callback) {
      /**
       * Crate the stage for trixter. 
       * @type @exp;PIXI@call;Stage
       */
      var stage;

      /**
       * The canvas instace.
       * @type type
       */
      var coverView;
      /**
       * create a renderer instance
       * @type @exp;PIXI@call;autoDetectRenderer
       */
      var renderer;

      /**
       * create an empty container
       * @type @exp;PIXI@call;DisplayObjectContainer
       */
      var containner;

      /**
       * The data of the bone;
       * @type @exp;PIXI@call;BOndeData
       */
      var shipData;

      /**
       * Array of Spine animations in canvas;
       * @type Array
       */
      var animations;

      /**
       * Animations than need the mouseup event to be called when the stage receives a mouseup.
       * @type Array
       */
      var callMouseUpAnimations;

      /**
       * Start the Animation.
       * @returns {undefined}
       */
      this.init = function() {
          var assetsToLoader = ["../content/animations/cover/skeleton.json", "../content/animations/cover/animation.json",
	            "../content/animations/page2/animation.json", "../content/animations/page2/boy.json", 
	            "../content/animations/page2/girl.json", "../content/animations/page2/fish.json", 
	            "../content/animations/page3/page3.json", "../content/animations/page3/skeleton.json",
	            "../content/animations/page4/skeleton.json", "../content/animations/page4/animation.json",
	            "../content/animations/page5/skeleton.json", "../content/animations/page5/animation.json",
	            "../content/animations/page6/skeleton.json", "../content/animations/page6/animation.json",
	            "../content/animations/page7/skeleton.json", "../content/animations/page7/animation.json",
	            "../content/animations/page8/skeleton.json", "../content/animations/page8/animation.json",
	            "../content/animations/page10/skeleton.json", "../content/animations/page10/animation.json",
	            "../content/animations/page11/skeleton.json", "../content/animations/page11/animation.json",
	            "../content/animations/page12/skeleton.json", "../content/animations/page12/animation.json",
	            "../content/animations/page13/skeleton.json", "../content/animations/page13/animation.json"
	      ];

          var loader = new PIXI.AssetLoader(assetsToLoader);
          loader.onComplete = onAssetsLoaded;
          loader.load();

          stage = new PIXI.Stage(0x66FF99, true);
          
          coverView = $('#animation');

          renderer = new PIXI.CanvasRenderer($('#main').width(), $('#main').height(), coverView[0], true);

          callMouseUpAnimations = new Array();
          animations = new Array();
          
          animations.push = function(spine, defaultAnimation, loop) {
        	  loop = (loop === undefined ? true : loop);
	          containner.addChild(spine);
	          spine.state.setAnimationByName(defaultAnimation, loop);
	          return Array.prototype.push.call(this, {'spine': spine, 'animation': defaultAnimation, 'loop': loop});
          };

          animations.update = function() {
        	  var limit = 0;
        	  for (i = 0; i < this.length; i++) {
	        	  limit = this[i].spine.position.x - Math.abs(containner.position.x);
	
	        	  if (limit < 0 || limit > renderer.width)
	        		  this[i].spine.state.clearAnimation();
	        	  else if (this[i].spine.state.current === null)
	        		  this[i].spine.state.setAnimationByName(this[i].animation, this[i].loop);
        	  }
          };

          containner = new PIXI.DisplayObjectContainer();
          containner.position.x = 0;
          containner.position.y = 0;
          stage.addChild(containner);
      };

      /**
       * Listener to asstes load.
       * @returns {undefined}
       */
      var onAssetsLoaded = function() {
            var spine = new PIXI.Spine("../content/animations/cover/skeleton.json");
            var pageWidth = $('#main').width();
            //Set to page scale;
            spine.scale.x = spine.scale.y = scale;
            //Get the size in layout;
            spine.position.x = (510 / 2 + 46) * scale;
            spine.position.y = (311 + 484 / 2) * scale;
            //Set the current Animation
            animations.push(spine, "Intro");

            spine = new PIXI.Spine("../content/animations/page2/fish.json");
            //Set to page scale;
            spine.scale.x = spine.scale.y = scale;
            //Get the size in layout;
            spine.position.x = pageWidth + (492 / 2 + 61) * scale;
            spine.position.y = (292 / 2 + 265) * scale;
            //Set the current Animation
            animations.push(spine, "Page2");

            spine = new PIXI.Spine("../content/animations/page2/boy.json");
            //Set to page scale;
            spine.scale.x = spine.scale.y = scale;
            //Get the size in layout;
            spine.position.x = pageWidth + (492 / 2 + 61) * scale;
            spine.position.y = (292 / 2 + 265) * scale;
            //Sets the current Animation            
            animations.push(spine, 'Idle');
            //Sets interaction.
            spine.interactive = true;
            spine.hitArea = new PIXI.Rectangle(-220, -220, 250, 350);
            spine.click = spine.tap = function() {
            	if (this.state.current.name === "Idle") this.state.setAnimationByName('Boy', true);
            };

            spine = new PIXI.Spine("../content/animations/page2/girl.json");
            //Set to page scale;
            spine.scale.x = spine.scale.y = scale;
            //Get the size in layout;
            spine.position.x = pageWidth + (492 / 2 + 61) * scale;
            spine.position.y = (292 / 2 + 265) * scale;
            //Set the current Animation
            animations.push(spine, 'Page2');

            spine = new PIXI.Spine("../content/animations/page3/skeleton.json");
            //Set to page scale;
            spine.scale.x = spine.scale.y = scale;
            //Get the size in layout;
            spine.position.x = pageWidth * 2 + (600 / 2) * scale;
            spine.position.y = (618 / 2) * scale;
            //Set the current Animation
            animations.push(spine, "animation");

            var mask = new PIXI.Graphics();
            containner.addChild(mask);
            mask.position.x = spine.position.x;
            mask.position.y = spine.position.y;
            mask.clear();
            mask.lineStyle(5, 0x16f1ff, 1);
            mask.beginFill(0x8bc5ff, 0.4);
            mask.moveTo((-600 / 2) * scale, (-618 / 2) * scale);
            mask.lineTo((600 / 2) * scale, (-618 / 2) * scale);
            mask.lineTo((600 / 2) * scale, (618 / 2) * scale);
            mask.lineTo(-(600 / 2) * scale, (618 / 2) * scale);
            mask.lineTo(-(600 / 2) * scale, -(618 / 2) * scale);
            spine.mask = mask;

            shipData = spine.skeleton.data.bones[4];

            spine = new PIXI.Spine("../content/animations/page4/skeleton.json");
            //Set to page scale;
            spine.scale.x = spine.scale.y = scale;
            //Get the size in layout;
            spine.position.x = pageWidth * 3 + (498 / 2 + 57) * scale;
            spine.position.y = (370 / 2 + 267) * scale;
            //Set the current Animation
            animations.push(spine, "PlanetDrip");
            //Sets interaction.
            spine.interactive = true;
            spine.hitArea = new PIXI.Rectangle(-230, -160, 340, 300);
            spine.click = spine.tap = function() {
            	if (this.state.current.name === "PlanetDrip") this.state.setAnimationByName('PlanetClosed', true);
            };
           
            spine = new PIXI.Spine("../content/animations/page5/skeleton.json");
            //Set to page scale;
            spine.scale.x = spine.scale.y = scale;
            //Get the size in layout;
            spine.position.x = pageWidth * 4 + (600 / 2) * scale;
            spine.position.y = (671 / 2 + 354) * scale;
            //Set the current Animation
            animations.push(spine, "p05_BoyIdle");
            spine.stateData.setMixByName("p05_BoyIdle", 'p05_BoyIWater', 5);
            //Sets interaction.
            spine.interactive = true;
            spine.hitArea = new PIXI.Rectangle(0, -500, 500, 500);
            spine.click = spine.tap = function() {
                if (this.state.current.name === "p05_BoyIdle") this.state.setAnimationByName('p05_BoyIWater', false);
            };

            spine = new PIXI.Spine("../content/animations/page6/skeleton.json");
            //Set to page scale;
            spine.scale.x = spine.scale.y = scale;
            //Get the size in layout;
            spine.position.x = pageWidth * 6 - 180;
            spine.position.y = (547 / 2 + 530) * scale;
            //Set the current Animation loop
            spine.stateData.setMixByName("AnimaGirl", 'AnimaPeixe', 2);
            spine.state.addAnimationByName("AnimaGirl", true);
            spine.state.addAnimationByName('AnimaPeixe', true);
            spine.state.addAnimationByName("AnimaGirl", true);
            spine.state.update = function(delta) {
                  this.currentTime += delta;
                  this.previousTime += delta;
                  this.mixTime += delta;
                  if (this.queue.length > 0) {
                        var entry = this.queue[0];
                        if (this.currentTime >= entry.delay) {
                              this._setAnimation(entry.animation, entry.loop);
                              this.queue.push(entry);
                              this.queue.shift();
                        }
                  }
                  
            };
            containner.addChild(spine);
            
            spine = new PIXI.Spine("../content/animations/page7/skeleton.json");
            //Set to page scale;
            spine.scale.x = spine.scale.y = scale;
            //Get the size in layout;
            spine.position.x = pageWidth * 7 + (345/2 - 330) * scale;
            spine.position.y = (681 / 2 + 550) * scale;
            animations.push(spine, "Idle");
            //Sets interaction.
            spine.interactive = true;
            spine.hitArea = new PIXI.Rectangle(-130, -250, 250, 340);
            spine.mousedown = spine.touchstart = function() {
            	this.state.setAnimationByName('DogAnim', true);
            };
            spine.mouseout = function() {
            	this.mouseup();
            };
            spine.mouseup = spine.touchend = function() {
            	this.state.setAnimationByName('Idle', true);
            };
            callMouseUpAnimations[0] = spine;
            
            spine = new PIXI.Spine("../content/animations/page8/skeleton.json");
            //Set to page scale;
            spine.scale.x = spine.scale.y = scale;
            //Get the size in layout;
            spine.position.x = pageWidth * 7 + (600/2) * scale;
            spine.position.y = (662 / 2 + 324) * scale;
            animations.push(spine, "animation");
            mask = new PIXI.Graphics();
            containner.addChild(mask);
            mask.position.x = spine.position.x;
            mask.position.y = spine.position.y;
            mask.clear();
            mask.lineStyle(5, 0x16f1ff, 1);
            mask.beginFill(0x8bc5ff, 0.4);
            mask.moveTo((-600 / 2) * scale, (-740 / 2) * scale);
            mask.lineTo((600 / 2)  * scale, (-740 / 2) * scale);
            mask.lineTo((600 / 2)  * scale, (740 / 2)  * scale);
            mask.lineTo(-(600 / 2) * scale, (740 / 2)  * scale);
            mask.lineTo(-(600 / 2) * scale, (-740 / 2) * scale);
            spine.mask = mask;
           
            spine = new PIXI.Spine("../content/animations/page10/skeleton.json");
            //Set to page scale;
            spine.scale.x = spine.scale.y = scale;
            //Get the size in layout;
            spine.position.x =  pageWidth * 10 - (620/2)*scale;
            spine.position.y =  (316/2) * scale;
            animations.push(spine, "animation");
            
            spine = new PIXI.Spine("../content/animations/page11/skeleton.json");
            //Set to page scale;
            spine.scale.x = spine.scale.y = scale;
            //Get the size in layout;
            spine.position.x =  pageWidth * 11 - (600/2)*scale;
            spine.position.y =  (450/2 + 568) * scale;
            animations.push(spine, "animation", false);
            
            //MouseUp stage event, used to change animations that depends
            //on a combination of mousedown/mouseup.
            stage.mouseup = stage.touchend = function() {
        		for (var i = 0; i < callMouseUpAnimations.length; i++) {
        			callMouseUpAnimations[i].mouseup();
        		}
            };
            
            spine = new PIXI.Spine("../content/animations/page12/skeleton.json");
            //Set to page scale;
            spine.scale.x = spine.scale.y = scale;
            //Get the size in layout;
            spine.position.x =  pageWidth * 12 - (600/2)*scale - 20;
            spine.position.y =  (450/2 + 228) * scale;
            animations.push(spine, "animation", false);
           
            spine = new PIXI.Spine("../content/animations/page13/skeleton.json");
            //Set to page scale;
            spine.scale.x = spine.scale.y = scale;
            //Get the size in layout;
            spine.position.x =  pageWidth * 13 - (600/2)*scale;
            spine.position.y =  (404/2 + 626) * scale;
            animations.push(spine, "animation");
            
            //MouseUp stage event, used to change animations that depends
            //on a combination of mousedown/mouseup.
            stage.mouseup = stage.touchend = function() {
                for (var i = 0; i < callMouseUpAnimations.length; i++) {
                    callMouseUpAnimations[i].mouseup();
                }
            };
            
            animate();
            
            if (callback != null) callback();
      };

      /**
       * The cycle animation.
       * @returns {undefined}
       */
      var animate = function() {
            // render the stage
            containner.position.x = parseFloat($('#page-containner').css('margin-left'));
            animations.update();
            requestAnimFrame(animate);
            renderer.render(stage);
      };

      /**
       * Set the Ship position.
       * @param {number} acceleration
       * @returns {undefined}
       */
      this.moveShip = function(acceleration) {
            shipData.x += 20 * -acceleration.x;
            if (shipData.x < -(600 / 2) * scale)
                  shipData.x = -(600 / 2) * scale;
            else if (shipData.x > (600 / 2) * scale)
                  shipData.x = (600 / 2) * scale;
            $('#page-3 h1').html(acceleration.x);
      };
}