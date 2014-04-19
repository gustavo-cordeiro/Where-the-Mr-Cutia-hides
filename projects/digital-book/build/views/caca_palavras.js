var cols = 17, rows = 15;
var tempWord = [];
var tempId = [];
var sort_letters = ['B','D','E','F','G','H','I','J','K','L','M','Q','R','S','T','U','V','X','Z'];
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

var selectionX = 0;
var selectionY = 0;
var referenceTd = [];
var wordList = [
	{
		'word':'agua',
		'row':6,
		'col':8,
		'type':'v',
		'visible':true
	},
	{
		'word':'subterraneo',
		'row':13,
		'col':1,
		'type':'h',
		'visible':true
	},
	{
		'word':'permeavel',
		'row':6,
		'col':5,
		'type':'v',
		'visible':true
	},
	{
		'word':'evaporacao',
		'row':11,
		'col':3,
		'type':'h',
		'visible':true
	},
	{
		'word':'toxica',
		'row':4,
		'col':7,
		'type':'h',
		'visible':true
	},
	{
		'word':'nascente',
		'row':3,
		'col':2,
		'type':'v',
		'visible':true
	},
	{
		'word':'assoreamento',
		'row':2,
		'col':6,
		'type':'h',
		'visible':true
	},
	{
		'word':'agrotoxicos',
		'row':5,
		'col':16,
		'type':'v',
		'visible':true
	},
	{
		'word':'trixter',
		'row':4,
		'col':14,
		'type':'v',
		'visible':false
	}
];

$(document).ready(function() {

	document.addEventListener("deviceready", onDeviceReady, true);
	//Disable text selection
	$("html").disableSelection();
	
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
	//Create reference to TD's
	/reference_td();
	//Show list
	show_list();
	
	document.getElementById('divEvents').addEventListener('touchstart', mouse_down, false);
	//mouse_down();
	document.getElementById('divEvents').addEventListener('touchmove', mouse_move, false);
	//mouse_move();
	document.getElementsByTagName('html')[0].addEventListener('touchend', mouse_up, false);
	//mouse_up();
	animation();
});

/**
 * Evento de dispositivo pronto para uso.
 */
function onDeviceReady() {
	
}
	 
/**
 * Mouse Down
 * */
function mouse_up(e){
	e.preventDefault();
	
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
				
				break
			}
		}
		
	}
	//Empy the arrays
	tempId = [];
	tempWord = [];
}

/**
 * Mouse Down
 * */
function mouse_down(e){
	e.preventDefault();
	var touch = e.touches[0] || e.changedTouches[0];
	// === MOUSEDOWN
	var x;
	var y;
	x = touch.clientX;
	y = touch.clientY;
	mouseClickDown = true;
	
	for(var i = 0; i < referenceTd.length; i++){
		//If your click point between the offset and size of the object.
		if(x > referenceTd[i]['offset']['left'] && x < referenceTd[i]['offset']['left'] + 20 &&
		   y > referenceTd[i]['offset']['top'] && y < referenceTd[i]['offset']['top'] + 20){
				$('#selection_find_word').css('display', 'block');
				$('#selection_find_word').css('top', referenceTd[i]['offset']['top']);
				$('#selection_find_word').css('left', referenceTd[i]['offset']['left']);
				break;
		}
	}
}

/**
 * Mouse Move
 * */
function mouse_move(e){
	e.preventDefault();
	
	//dump(e.touches[0]);
	/**
	 * Gets position X and Y to touchscreen event.
	 * <p>
	 * 	if you test in desktop you have to comment the code below
	 * </p>
	 */
	var touch = e.touches[0] || e.changedTouches[0];		
	window.pointerX = touch.pageX;
	window.pointerY = touch.pageY;
	
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
			angulo = -1;
		} else if(quadrant == 2 || quadrant == 3) {
			angulo = 95;
		}
		
		new_width = Math.abs(Math.round(Math.pow(Math.pow(c1,2) + Math.pow(c2,2),0.5)));
		if(quadrant == 1) {
			$('#selection_find_word').css('display', 'block');
			$('#selection_find_word').attr('data-angle', angulo);
			$('#selection_find_word').css('width', new_width);
			$('#selection_find_word').css({ rotate: angulo+'deg' });
		}		
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
			$('#container_words_game').append('<h2 class="'+ obj['word'] +'">' + obj['word'] + '<h2>');
		}
	}
}

/**
 * Create reference to TD contains ID and Offset.
 * */
function reference_td(){
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
	if(obj['type'] == 'v') {
		for(i = 0; i < obj['word'].length; i++){
			var new_rows = parseInt(obj['row']) + i;
			$("#col_" + new_rows + '_' + obj['col']).html('<span>'+ obj['word'][i].toUpperCase() +'</span>');
		}
	} else {
		for(i = 0; i < obj['word'].length; i++){
			var new_cols = parseInt(obj['col']) + i;
			$("#col_" + obj['row'] + '_' + new_cols).html('<span>'+ obj['word'][i].toUpperCase() +'</span>');
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