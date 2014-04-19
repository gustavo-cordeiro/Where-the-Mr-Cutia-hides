const POINTS = 10;//Quantidade de pontos ganha quando pegar o lixo
const MOD_POINTS = 100;//Valor usado pra fazer o update da dificuldade
var assets;
var score = 0;
var lbl_score;
var lbl_fps;
var element;
var stage
var grant;
var el_html;
var w, h, middle_x, middle_h;
var fps_rate = 40;
var trash, barrier;
var barrier_type;//1 = Cima, 2 = Baixo

//para cria��o de itens em tela
var seconds;
var count_trash = 0;
var trash_width = 33, trash_height = 51;
var trash_rate = 2;
var count_barrier = 0;
var barrier_width = 50, barrier_height = 100;
var barrier_rate = 2;
var level_checks;//Varivael para verificar se almenta dificuldade do jogo
var level_checks_count;

//Variaveis para almentar dificuldade do jogos.
var inclement_down = 0, inclement_left = 0, inclement_back1 = 1, inclement_back2 = 2;

//BackGround
var back1, back2;
var back1_width = 1008, back1_height = 487;
var back2_width = 256, back2_height = 66;

//Velocidade de caida e recuo
var down_rate = 3;//Taxa da queda do player
var left_rate = 3;//Taxa do retrocesso do player
var up_rate;//Taxa da subida do player, apenas implementado caso clicado no bot�o de para cima
var right_rate;//Taxa do avan�o do player, apenas implementado caso clicado no bot�o de para direita
var bollean_up_rate = false;
var boolean_right_rate = false;

//Player
var sprite_player;
var player_ss;
var player_width = 244;
var player_height = 276;
var scale = 1;

//Botões para subir e ir para frente
var btn_up, btn_right;
var btn_up_width = 50;
var btn_up_height = 50;
var btn_right_width = 50;
var btn_right_height = 50;

var player = {
    'images':["../content/agua_play/player1.png"],
    'frames':{'width':player_width, 'height':player_height},
    'animations':{'run':[0,11]}
};

$(document).ready(function() {
	document.addEventListener("deviceready", onDeviceReady, true);
	//Disable text selection
	$("html").disableSelection();
	key_down();
	init();
});

/**
 * Evento de dispositivo pronto para uso.
 */
function onDeviceReady() {
}

/**
 * Evento de teclado para testar melhor no navegador.
 * */
function key_down(){
	//Para enquanto a tecla estiver pressionada
	$('html, body').keydown(function(e){
	    var code = (e.keyCode ? e.keyCode : e.which);
	    if(code == 87)//Tecla W
	    	handlerUpClick(e);
	    
	    if(code == 68)//Tcla D
	    	handlerRightClick(e);
	    	
	});
	
	//Quando a telca for solta
	$('html, body').keyup(function(e){
	    var code = (e.keyCode ? e.keyCode : e.which);
	    if(code == 87)//Tecla W
	    	handlerUpNotClick(e);
	    
	    if(code == 68)//Tcla D
	    	handlerRightNotClick(e);
	    	
	});
}

/**
 * Animation player 
 **/
function init() {
	
	//Habilita loader
	$("#loader_agua_play").addClass('loader_agua_play');
	
	//Pega referencia do canvas
    element = document.getElementById("canvas_agua_play");
    
    //Recupera largura e altura do canvas
    element.width = window.w = $("#container_agua_play").width();
    element.height = window.h = $("#container_agua_play").height();
    
    //almenta dificuldade do jogo
    level_checks = false;
    level_checks_count = 0;
    //Tela do canvas, onde sera renderizado
    window.stage = new createjs.Stage(element);
    // ===== Evendos do bot�o    	
		window.btn_up = document.getElementById("btn_up_agua_play");
		window.btn_right = document.getElementById("btn_right_agua_play");
		window.el_html = document.getElementsByTagName('html')[0];
		
		//Adciona eventos nos bot�es
		window.btn_up.addEventListener("touchstart", handlerUpClick);
		window.btn_up.addEventListener("touchend", handlerUpNotClick);
		
		//Adciona eventos nos bot�es
		window.btn_right.addEventListener("touchstart", handlerRightClick);
		window.btn_right.addEventListener("touchend", handlerRightNotClick);
    // =====
    //Cria spriteShit do player
    window.sprite_player = new createjs.SpriteSheet(player);
    
    //Cria anima��o do personagem.
    window.player_ss = new createjs.BitmapAnimation(window.sprite_player);
        
    //Acha meio da tela para posicionar o player
    window.middle_x = window.w/2;
    window.middle_x = window.middle_x - (window.player_width * window.scale)/2;
   
    window.middle_y = window.h/2;
    window.middle_y = window.middle_y - (window.player_height * window.scale)/2;
    
    //inicia na posi��o
    //Posisiona personagem
    //Escala a imagem.
    window.player_ss.gotoAndPlay('run');
    window.player_ss.x = middle_x;
    window.player_ss.y = middle_y;
    window.player_ss.scaleX = window.player_ss.scaleY = scale;
    
    //Cria texto de score na tela
    lbl_score = new createjs.Text('Pontuação: ' + score, 'bold 18px Verdana', '#000');
    lbl_score.x = 20;
    lbl_score.y = 20;
    
    //FPS
    lbl_fps = new createjs.Text('FPS: ', 'bold 18px Verdana', '#000');
    lbl_fps.x = 300;
    lbl_fps.y = 20;
    
	/**
     * Carregar� todos as imagens usada, enquanto isso, aparecera um load na tela.     * 
     */
	    assets = [];
	    
	    var array_assets = [
		    {src:"../content/agua_play/player1.png", id:'player'},
		    {src:"../content/agua_play/back1.png", id:'back1'},
		    {src:"../content/agua_play/back2.png", id:'back2'},
		    {src:"../content/agua_play/lata01.png", id:'trash'},
		    {src:"../content/agua_play/barrier.png", id:'barrier'},
		    {src:"../content/agua_play/up.png", id:'btnUp'},
		    {src:"../content/agua_play/right.png", id:'btnRight'}
	    ];
	    
	    loader = new createjs.LoadQueue(false);
	    loader.onFileLoad = handleFileLoad;//Fun��o que ira salvar os itens em um array depois de carregados.
	    loader.onComplete = handleComplete;//Fun��o que sera enviada quadno terminar de carregar.
	    loader.loadManifest(array_assets);//Array contendo os itens a serem carregados.
	/** ==== */
}

/**
 * Salva os itens carregados no array assets.
 * */
function handleFileLoad(event) {
	assets.push(event.item);
}

/**
 * Fun��o carregada quando termianr de carregar.
 * */
function handleComplete() {
	/**
	 * Percorre o array de assets
	 */
	for(var i=0;i<assets.length;i++) {
		var item = assets[i];
		var id = item.id;
		var result = loader.getResult(id);
		
		if (item.type == createjs.LoadQueue.IMAGE) {
			var bmp = new createjs.Bitmap(result);
		}
		
		switch (id) {
			case "barrier":
					window.barrier = new createjs.Shape();
					
					var b = window.barrier.graphics;
					b.beginBitmapFill(result);
					b.drawRect(0, 0, barrier_width * window.scale, barrier_height * window.scale);
					
					window.barrier.visible = false;
					window.barrier.scaleX = window.barrier.scaleY = window.scale;
				break;
			case "trash":
					window.trash = new createjs.Shape();
					
					var t = window.trash.graphics;
					t.beginBitmapFill(result);
					t.drawRect(0, 0, trash_width * window.scale, trash_height * window.scale);
					
					window.trash.visible = false;
					window.trash.scaleX = window.trash.scaleY = window.scale;
				break;
			case "back1":
					window.back1 = new createjs.Shape();
					
					var b1 = window.back1.graphics;
					b1.beginBitmapFill(result);
					b1.drawRect(0, 0, window.w * 4 * window.scale, window.h * window.scale);
					
					window.back1.y = 0;
					window.back1.scaleX = window.back1.scaleY = window.scale;
					
					//Create Cache
					window.back1.cache(0,0, window.w * 4 * window.scale, window.h * window.scale);
				break;
			case "back2":
					window.back2 = new createjs.Shape();
					//Para criar quadrado com imagens que sera repitida
					var b2 = back2.graphics;
					b2.beginBitmapFill(result);
					b2.drawRect(0, 0, back2_width * 6 * window.scale, back2_height * window.scale);
					
					window.back2.y = window.h - (back2_height * scale);
					window.back2.scaleX = window.back2.scaleY = scale;
					
					//Create Cache
					window.back2.cache(0,0,back2_width * 6 * window.scale, back2_height * window.scale);
				break;
		}
	}
	
	//Retira todas as classe de #loader
    $("#loader_agua_play").removeClass();
    
    if (player_ss == null) {
        console.dir("Can not play. Grant sprite was not loaded.");
        return;
    }
    
    //Add todas as imagens no canvas
    stage.addChild(window.back1, window.player_ss, window.barrier, window.trash, window.back2, lbl_score, lbl_fps);
    
    createjs.Ticker.setFPS(window.fps_rate);
    createjs.Ticker.addEventListener("tick", game_loop);
}

/**
 * Game loop do jogos
 * <p>
 * Usado para posicionar elementos dentro do jogo
 * </p>
 * */
function game_loop(event) {
	var position_x = window.player_ss.x - window.left_rate - inclement_left ;
	var position_y = window.player_ss.y + window.down_rate + inclement_down;
	var position_barrier_x = 0;

	/**
	 * Caso tenha apertado no bot�o para direita
	 * */
		if(window.boolean_right_rate){
			position_x += window.right_rate;
		}

	/**
	 * Caso tenha apertado no bot�o para cima
	 * */
		if(window.boolean_up_rate){
			position_y -= window.up_rate;
		}
	
	/**
	 * Proibir player de passar do topo e pra frente
	 * */
		if(position_x + player_width > w){
			position_x = w - player_width;
		}
		
		if(position_y < 0) {
			position_y = 0;
		}
	
	/**
	 * Verifica colis�o player com barreira
	 * */
		if(
			position_x + player_width >= window.barrier.x &&
			position_x <= window.barrier.x + barrier_width * window.barrier.scaleX
		){
			if(window.barrier_type == 1){//Colis�o Acima
				if(
					position_y <= window.barrier.y + barrier_height * window.barrier.scaleY &&
					position_x + player_width/2 >= window.barrier.x
				) {//Colis�o em Y
					position_y = window.barrier.y + barrier_height * window.barrier.scaleY;
				}
				else if(
					position_y <= window.barrier.y + barrier_height * window.barrier.scaleY
				) {//Colis�o em X
					position_x = window.barrier.x - player_width;
				}
			}
			else if(window.barrier_type == 2){//Colis�o em baixo OK
				if(
					position_y + player_height >= window.barrier.y &&
					position_x + player_width/2 > window.barrier.x
				) {//Colis�o em Y
					position_y = window.barrier.y - player_height;
				}
				else if(
					position_y + player_height >= window.barrier.y
				) {//Colis�o em X
					position_x = window.barrier.x - player_width;
				}
			}
		}
	
	seconds = Math.round(createjs.Ticker.getTime()/1000);
	/**
	 * Verifica se o lixo tem que aparecer ou n�o
	 * */
		if(seconds % 2 == 0 && count_trash == 0){
			/**
			 * Posi��o inicial do lixo
			 * */
			window.trash.x = Math.floor((Math.random()*20)+w) - 20;
			window.trash.y = Math.floor((Math.random()* (h - 100))+1);
			
			window.trash.visible = true;
			count_trash = 1;
			trash_rate = Math.floor((Math.random()*4)+1);//Velocidade que o lixo vai se mover.
		}
		
		if(window.trash.visible){
			//Verifica se lixo ja saiu da tela ou jogador passou por ele.
			//Caso ja tenha saido da tela, window.trash.visible � definido como false
			if(window.trash.x + trash_width < 0) {
				window.trash.visible = false;
				count_trash = 0;
			}
			
			//Colis�o entre lixo e player
			if(
				position_x + player_width >= window.trash.x &&
				position_x < window.trash.x + trash_width &&
				position_y + player_height >= window.trash.y &&
				position_y < window.trash.y + trash_height
			) {
				window.score += POINTS;
				window.lbl_score.text = 'Pontuação: ' + window.score;
				window.trash.visible = false;
				if(window.score % MOD_POINTS == 0 && window.score != 0) {
					level_checks = true;
				}
				count_trash = 0;
			}
		}
	/**
	 * END TRASH
	 * */
	
	/**
	 * Verifica colis�o com barreira.
	 * */
		if(seconds % 10 == 0 && count_barrier == 0){
			
			window.barrier.x = Math.floor((Math.random()*20)+w) - 20;
			window.barrier.scaleX = Math.floor((Math.random() * 20) + 1);
			window.barrier.scaleY = Math.floor((Math.random() * 2) + 1);
			
			barrier_rate = Math.floor((Math.random()*4)+1);
			
			if((Math.random() * 2) + 1 < 2){//Aparece Encima
				window.barrier.y = 0;
				window.barrier_type = 1;
			}
			else {//Aparece Em baixo
				window.barrier.y = h - barrier_height * window.barrier.scaleY;
				window.barrier_type = 2;
			}
			
			window.barrier.visible = true;
			count_barrier = 1;
		}
		
		if(window.barrier.visible){
			//Verifica se a barreira ja saiu da tela ou jogador passou por ele.
			//Caso ja tenha saido da tela, window.barrier.visible � definido como false
			if(window.barrier.x + barrier_width * window.barrier.scaleX < 0) {
				window.barrier.visible = false;
				count_barrier = 0;
			}
		}
	/**
	 * END BARRIER
	 * */
	
	/**
	 * Verifica colis�o de barreira com Lixo
	 * */
		if(
			window.trash.x < window.barrier.x + barrier_width * window.barrier.scaleX &&
			window.trash.x + trash_width > window.barrier.x &&
			window.trash.y + trash_height >= window.barrier.y &&
			window.trash.y <= window.barrier.y + barrier_height * window.barrier.scaleY			
		){
			if(window.barrier_type == 1){//Colis�o Acima
				window.trash.y = window.barrier.y + trash_height*2 + barrier_height * window.barrier.scaleY	;
			}
			else if(window.barrier_type == 2){//Colis�o Abaixo
				window.trash.y = window.barrier.y - trash_height*2;
			}
		}
	
	/**
	 * verifica se vai subir a dificuldade
	 * */		
		if(level_checks){
			inclement_back1 += 0.2;
			inclement_back2 += 0.2;
			barrier_rate += 0.2;
			trash_rate += 0.2;
			inclement_left += 0.2;
			inclement_down += 0.2;			
			level_checks = false;
		}
	
	/**
	 * Movimenta paralax do oceano
	 * */
	window.back1.x = (window.back1.x - inclement_back1) % (window.w * window.scale);
	window.back2.x = (window.back2.x - inclement_back2) % (back2_width * window.scale);
	
	/**
	 * Atualiza movimento do player
	 * */
	window.player_ss.x = (position_x + (window.player_width * scale) < 0)?window.middle_x:position_x;
	window.player_ss.y = (position_y + (window.player_height * scale) > h + 30)?window.middle_y:position_y;
	
	/**
	 * Atualiza movimento do lixo
	 * */
	var position_trash_x = window.trash.x - window.trash_rate;
	window.trash.x = position_trash_x;
	
	/**
	 * Atualiza movimento da barreira
	 * */
	var position_barrier_x = window.barrier.x - window.barrier_rate;
	window.barrier.x = position_barrier_x;
		
	/**
	 * Atualiza texto de taxa de FPS
	 * */
	window.lbl_fps.text = "FPS: "+ Math.round(createjs.Ticker.getMeasuredFPS());
   
	stage.update(event);
}

// =============== Handler ===============
/**
 * Fun��o para quando clicar no bot�o para cima ^
 * */
function handlerUpClick(event){
	window.up_rate = 5 + inclement_down;
    window.boolean_up_rate = true;
    $("#btn_up_agua_play").removeClass();
    $("#btn_up_agua_play").addClass('hover');
}

/**
 * Fun��o para parar quando sair do bot�o ^
 * */
function handlerUpNotClick(event){
    window.boolean_up_rate = false;
    $("#btn_up_agua_play").removeClass();
    $("#btn_up_agua_play").addClass('normal');
}

/**
 * Fun��o para quando clicar no bot�o para direita >
 * */
function handlerRightClick(event){
    window.right_rate = 5 + inclement_left;
    window.boolean_right_rate = true;
    $("#btn_right_agua_play").removeClass();
    $("#btn_right_agua_play").addClass('hover');
}

/**
 * Fun��o para parar quando sair do bot�o >
 * */
function handlerRightNotClick(event){
    window.boolean_right_rate = false;
    $("#btn_right_agua_play").removeClass();
    $("#btn_right_agua_play").addClass('normal');
}
