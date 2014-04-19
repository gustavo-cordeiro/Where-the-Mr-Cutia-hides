var cols = 17, rows = 15;
var tempWord = [];
var tempId = [];
var sort_letters = ['B','D','E','F','G','H','I','J','K','L','M','Q','R','S','T','V','X','Z'];
var mouseClickDown = false;
/**
 * Set the animation request.
 * @type @exp;window@pro;webkitRequestAnimationFrame@exp;window@pro;requestAnimationFrame|@exp;window@pro;oRequestAnimationFrame@exp;window@pro;mozRequestAnimationFrame@exp;window@pro;webkitRequestAnimationFrame@exp;window@pro;requestAnimationFrame|@exp;window@pro;msRequestAnimationFrame@exp;window@pro;oRequestAnimationFrame@exp;window@pro;mozRequestAnimationFrame@exp;window@pro;webkitRequestAnimationFrame@exp;window@pro;requestAnimationFrame|@exp;window@pro;requestAnimationFrame|@exp;window@pro;mozRequestAnimationFrame@exp;window@pro;webkitRequestAnimationFrame@exp;window@pro;requestAnimationFrame
 */
window.requestAnimFrame = function(){
    return (
        window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();

var new_width;
var pointerX;
var pointerY;
var angulo;
var count_words = 0;
var selectionX = 0;
var selectionY = 0;
var referenceTd = [];
var wordList = [
	{
		'word':'agua',
		'description':'',
		'row':6,
		'col':8,
		'type':'v',
        'checked':true,
		'visible':false
	},
	{
		'word':'subterraneo',
		'description':'que está ou fica embaixo da terra.',
		'row':13,
		'col':1,
		'type':'h',
        'checked':false,
		'visible':true
	},
	{
		'word':'permeavel',
		'description':'que se pode penetrar, transpassar.',
		'row':6,
		'col':5,
		'type':'v',
        'checked':false,
		'visible':true
	},
	{
		'word':'evaporacao',
		'description':'quando um líquido transforma-se em vapor.',
		'row':11,
		'col':3,
		'type':'h',
        'checked':false,
		'visible':true
	},
	{
		'word':'toxica',
		'description':'substâmcia venenosa, prejudicial à saúde, que intoxica; veneno.',
		'row':4,
		'col':7,
		'type':'h',
        'checked':false,
		'visible':true
	},
	{
		'word':'nascente',
		'description':'local em que um curso de água aflora para a superficie.',
		'row':3,
		'col':2,
		'type':'v',
        'checked':false,
		'visible':true
	},
	{
		'word':'assoreamento',
		'description':'diminuição da profundidade de curso de água, por acúmulo de area, resíduos ou detritos. Pode causar a redução da correnteza e a morte dos rios.',
		'row':2,
		'col':6,
		'type':'h',
        'checked':false,
		'visible':true
	},
	{
		'word':'agrotoxicos',
		'description':'produto usado para eliminar pragas ou doenças que atacam as plantações.',
		'row':5,
		'col':16,
		'type':'v',
        'checked':false,
		'visible':true
	},
	{
		'word':'trixter',
		'description':'',
		'row':4,
		'col':14,
		'type':'v',
        'checked':false,
		'visible':false
	}
];

$(document).ready(function() {
	
	document.addEventListener("deviceready", onDeviceReady, true);
	//Disable text selection
	$("html").disableSelection();
	
	//Restat game
	$("#btn-page12-restart").click(function () {
		restart_game_find_word();
	});
	
	init_find_word();
	
});

/**
 * Restart game
 * */
function restart_game_find_word() {
	$("#container_find_word_win").delay(300).fadeOut("slow");
	$("#container_find_word").delay(300).fadeIn("slow");
	$("#container_find_word #table-game").empty();
	$("#container_words_game").empty();
	init_find_word();
	setTimeout(reference_td,1500);
}

/**
 * Evento de dispositivo pronto para uso.
 */
function onDeviceReady() {
}

/**
 * INIT
 * */
function init_find_word(){

	referenceTd = [];
	count_words = 0;
	selectionX = 0;
	selectionY = 0;
	
	//Create simple table.
	for(i = 1; i <= rows; i++){
		//Open tr
		$("#container_find_word table").append('<tr id="row_'+ i +'">');		 
		for(j = 1; j <= cols; j++){
			$('#container_find_word table #row_'+i).append('<td id="col_'+ i +'_'+ j +'" data-row="' + i + '" data-col="' + j + '" class="mouse-out" onclick=""><span>@</span></td>');
		}
		//Close tr
		$("#container_find_word table").append("</tr>");
	}
	
	//Create words
	create_word();
	//Create Latters	
	random_latter();
	//Disply block in table
	$("#container_find_word table").css('display', 'block');
	//Show list
	show_list();
	
	console.dir(count_words);
	mouse_down();
	mouse_move();
	mouse_up();
	animation();
}

/**
 * Mouse Down
 * */
function mouse_up(){
	$("html").mouseup(function (e){
		var offset;
		var angle;
		var sele_width = $('#selection_find_word').width();	
		var width;
		var height;
		var text;
		var wordCheck = '';

		mouseClickDown = false;
	
		/**
		 * Checks intersection to select and words in td
		 * */
		angle = $('#selection_find_word').attr('data-angle');
		offset = $('#selection_find_word').offset();
		
		//Capture the letters to create a word
		if(angle > 80 && angle < 100 || angle > 265 && angle < 275){
			for(var i = 0; i < referenceTd.length; i++) {
				width = $("#"+referenceTd[i]['id']).width();
				height = $("#"+referenceTd[i]['id']).height();
				text = $("#"+referenceTd[i]['id']).text();
				
				if((
						 offset.left + 15 > referenceTd[i]['offset']['left'] &&
						 offset.left + 15 < referenceTd[i]['offset']['left'] + width
					 )
					 &&
					 ((
						offset.top + 15 > referenceTd[i]['offset']['top'] &&
						offset.top + 15 < referenceTd[i]['offset']['top'] + height
					 )
					 || 
					 (
						offset.top + 15 < referenceTd[i]['offset']['top'] + height &&
						offset.top + sele_width > referenceTd[i]['offset']['top']
					 ))
				  ) {
					//Add letter in the tempWord list
					tempWord.push(text);
					//Add ID in the tempId list
					tempId.push(referenceTd[i]['id']);
				}
			}
		} else if(angle > -5 && angle < 5 || angle > 175 && angle < 185) {
			for(i = 0; i < referenceTd.length; i++) {
				width = $("#"+referenceTd[i]['id']).width();
				height = $("#"+referenceTd[i]['id']).height();
				text = $("#"+referenceTd[i]['id']).text();
				if((
						 offset.top + 15 > referenceTd[i]['offset']['top'] &&
						 offset.top + 15 < referenceTd[i]['offset']['top'] + height
					 )
					 &&
					 ((
						offset.left + 15 > referenceTd[i]['offset']['left'] &&
						offset.left + 15 < referenceTd[i]['offset']['left'] + width
					 )
					 || 
					 (
						offset.left + 15 < referenceTd[i]['offset']['left'] + width &&
						offset.left + sele_width > referenceTd[i]['offset']['left']
					 ))
				  ) {
					//Add letter in the tempWord list
					tempWord.push(text);
					//Add ID in the tempId list
					tempId.push(referenceTd[i]['id']);
				}
			}
		}
		
		$('#selection_find_word').css('display', 'none');
		$('#selection_find_word').css('width',20);
		$('#selection_find_word').css({ rotate:'0deg' });;
		var word = '';
		
		//Create the word to search.
		for(i = 0; i < tempWord.length; i++) {
			wordCheck += tempWord[i].toLowerCase();
		}
		
		//check exist word in list
		if(wordCheck == 'trixter') {//If the word id foud Trixter, appears every words.
			var obj;
			var c;
			count_words = 0;
			for(w = 0; w < wordList.length; w++){
				obj = wordList[w];
				
				if(obj['type'] == 'v') {
					for(i = 0; i < obj['word'].length; i++) {
						c = obj['row'] + i;
						$("#col_"+ c + "_" + obj['col']).removeClass();
						$("#col_"+ c + "_" + obj['col']).addClass('correct-word');

						$("."+obj['word']).css('text-decoration', 'line-through');
						$("."+obj['word']).css('color', '#0a3f43');
					}
				} else {
					for(i = 0; i < obj['word'].length; i++) {
						c = obj['col'] + i;
						$("#col_"+ obj['row'] + "_" + c).removeClass();
						$("#col_"+ obj['row'] + "_" + c).addClass('correct-word');

						$("."+obj['word']).css('text-decoration', 'line-through');
						$("."+obj['word']).css('color', '#0a3f43');
					}
				}
			}
		} else {//if any word.
			for(i = 0; i < wordList.length; i++){
				if(wordList[i]['word'] == wordCheck){
					for(r = 0; r < tempId.length ;r++){
						
						$("#"+tempId[r]).removeClass();
						$("#"+tempId[r]).addClass('correct-word');
					}
					
					$("."+wordCheck).css('text-decoration', 'line-through');
					$("."+wordCheck).css('color', '#0a3f43');

					count_words--;
					break
				}
			}
			
		}
		
		if(count_words == 0){
			find_words_win();
		}
		//Empy the arrays
		tempId = [];
		tempWord = [];
	});
}

/**
 * find_words_win
 * */
function find_words_win() {
	$("#container_find_word").delay(700).fadeOut("slow");
	$("#container_find_word_win").delay(700).fadeIn("slow");
}

/**
 * Mouse Down
 * */
function mouse_down(){
	// === MOUSEDOWN
	var x;
	var y;
	$("#divEvents").mousedown(function (e){
		x = e.clientX;
		y = e.clientY;
		mouseClickDown = true;
		
		for(var i = 0; i < referenceTd.length; i++){
			//If your click point between the offset and size of the object.
			if(x > referenceTd[i]['offset']['left'] && x < referenceTd[i]['offset']['left'] + 23 &&
			   y > referenceTd[i]['offset']['top'] && y < referenceTd[i]['offset']['top'] + 20){
					$('#selection_find_word').css('display', 'block');
					$('#selection_find_word').css('top', referenceTd[i]['offset']['top']);
					$('#selection_find_word').css('left', referenceTd[i]['offset']['left']);
					break;
			}
		}
	});
}

/**
 * Mouse Move
 * */
function mouse_move(){
	$("#divEvents").mousemove(function (e){
		/**
		 * Gets position X and Y to touchscreen event.
		 * <p>
		 * 	if you test in desktop you have to comment the code below
		 * </p>
		 */
//		var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];		
//		pointerX = touch.pageX;
//		pointerY = touch.pageY;
			
	    /**
	     * Gets position X and Y to mouvemove event.
		 * <p>
		 * 	if you test in android you have to comment the code below
		 * </p>
	     * */
		window.pointerX = e.clientX;
		window.pointerY = e.clientY;		
	});
}

/**
 * Creates animation selection and rotation.
 * */
function animation() {
	if(window.mouseClickDown) {
		var quadrant;
		var tan;
		var position_cental = $('#selection_find_word').offset();
		var c1, c2;
		
		window.mobileControl.unpress();
		
		c1 = Math.abs(window.pointerX - position_cental.left - 15);
		c2 = Math.abs(window.pointerY - position_cental.top - 15);
		
		if(pointerX > position_cental.left){
			if(pointerY < position_cental.top)
				quadrant = 0;
			else quadrant = 1;
		}
		else{
			if(pointerY > position_cental.top)
				quadrant = 2;
			else quadrant = 3;
		}
		
		angulo = Math.round((180 * Math.atan2(c1, c2)*-1)/Math.PI + 90);
		
		if(quadrant == 0){
			angulo = 0;
		} else if(quadrant == 2 || quadrant == 3) {
			angulo = 90;
		}
		
		console.dir(angulo);
		new_width = Math.abs(Math.round(Math.pow(Math.pow(c1,2) + Math.pow(c2,2),0.5)));
		
		$('#selection_find_word').css('display', 'block');
		$('#selection_find_word').attr('data-angle', angulo);
		if(quadrant == 1){
			$('#selection_find_word').css('width', new_width);
		}
		$('#selection_find_word').css({ rotate: angulo+'deg' });
	}
	
	window.requestAnimFrame(animation);
}

/**
 * Display the words on the screen
 * */
function show_list() {
	var obj;
	for(w = 0; w < wordList.length; w++){
		obj = wordList[w];
		if(obj['visible']) {
			$('#container_words_game').append('<li><strong class="'+ obj['word'] +'">' + obj['word'] + ':</strong> '+ obj['description'] +'</li>');
		}
	}
}

/**
 * Create reference to TD contains ID and Offset.
 * is called whenever a page of word search is open.
 * */
function reference_td(){
	referenceTd = [];
	var obj;
	var offset;
	for(i = 1; i <= rows; i++){		
		for(j = 1; j <= cols; j++){
			offset = $('#col_' + i + '_' + j).offset();
			obj = {
					'id':'col_' + i + '_' + j,
					'offset':{
						'top':offset.top,
						'left':offset.left
					}
			};
			referenceTd.push(obj);
		}
	}
}

/**
 * Create all words in table.
 * */
function create_word(){
	for(w = 0; w < wordList.length; w++){
		construct_word(wordList[w]);
	}
}

/**
 * Construct word.
 * @param obj Array Item contain {word, row = Initial row, col = Initial col, type = v/h}
 * */
function construct_word(obj){
	if(obj['visible'])
		count_words++;
		
	if(obj['type'] == 'v') {
		for(i = 0; i < obj['word'].length; i++){
			var new_rows = parseInt(obj['row']) + i;
			$("#col_" + new_rows + '_' + obj['col']).html('<span>'+ obj['word'][i].toUpperCase() +'</span>');
			
			//Define selected word.
			if(obj['checked'])
				$("#col_" + new_rows + '_' + obj['col']).addClass('correct-word');
		}
	} else {
		for(i = 0; i < obj['word'].length; i++){
			var new_cols = parseInt(obj['col']) + i;
			$("#col_" + obj['row'] + '_' + new_cols).html('<span>'+ obj['word'][i].toUpperCase() +'</span>');
			
			//Define selected word.
			if(obj['checked'])
				$("#col_" + obj['row'] + '_' + new_cols).addClass('correct-word');
		}
	}	
}

/**
 * Create random latters to game
 * */
function random_latter(){
	var letter;
	for(i = 1; i <= rows; i++){//Lines
		for(j = 1; j <= cols; j++){//Cols
			if($('#col_'+i+'_'+j).text() == '@'){
				letter = Math.round(Math.random() * (sort_letters.length - 1));
				$('#col_'+i+'_'+j).html('<span>'+ sort_letters[letter] + '</span>');
			}
		}
	}
}
