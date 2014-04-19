// Save the current preferences
var startRulerUnits = app.preferences.rulerUnits;
var startTypeUnits = app.preferences.typeUnits;
var startDisplayDialogs = app.displayDialogs;

// Set Photoshop to use pixels and display no dialogs
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;
app.displayDialogs = DialogModes.NO;

var basePath = new File($.fileName).path;
var layerNum = app.activeDocument.layers.length;
var fileName = decodeURI(activeDocument.name).replace(".psd","");
var usePx = confirm('Click in Yes to use PX unit, or We are use EM unit (base font-size: 16px).');
var cssLog;

if(usePx)
	cssLog = '.'+ fileName +'{display:inline-block; overflow:hidden; background-repeat: no-repeat;background-image:url('+fileName+'.png);}\n \n';
else
	cssLog = '.'+ fileName +'{display:inline-block; overflow:hidden; background-repeat: no-repeat;background-image:url('+fileName+'.png); background-size: '+parseInt((app.activeDocument.width/16)*1000)/1000+'em '+parseInt((app.activeDocument.height/16)*1000)/1000+'em; font-size: 1em;}\n \n';
	
var x = 0;
var y = 0;
var w = 0;
var h = 0;
for (var i =1; i<=layerNum; i++){
    if(activeDocument.layers[layerNum-i].visible){
        app.activeDocument.activeLayer = activeDocument.layers[layerNum-i];
		
		x = app.activeDocument.activeLayer.bounds[0].value;
		y = app.activeDocument.activeLayer.bounds[1].value;
		
		w = app.activeDocument.activeLayer.bounds[2].value - x;
		h = app.activeDocument.activeLayer.bounds[3].value - y;
		
		if(usePx){
			cssLog += '.' + app.activeDocument.activeLayer.name + '{ ';
			cssLog += 'width:' + w + 'px; ';
			cssLog += 'height:'+ h + 'px; ';
			cssLog += 'background-position: -' + x + 'px -' + y + 'px;';
			cssLog += '}\n';
		}
		else{
			cssLog += '.' + app.activeDocument.activeLayer.name + '{ ';
			cssLog += 'width:' + parseInt((w/16)*1000)/1000 + 'em; ';
			cssLog += 'height:'+ parseInt((h/16)*1000)/1000 + 'em; ';
			cssLog += 'background-position: -' + parseInt((x/16)*1000)/1000 + 'em -' + parseInt((y/16)*1000)/1000 + 'em;';
			cssLog += '}\n';
		}
    }
};

// Detect line feed type
if ($.os.search(/windows/i) != -1) {
    fileLineFeed = "Windows"
} else {
    fileLineFeed = "Macintosh"
}

// Export to txt file
function writeFile(info) {
    try     {
        var css = new File(basePath + "/" + fileName  + ".css");
        css.remove();
        css.open('a');
        css.lineFeed = fileLineFeed;
        css.write(info);
        css.close()

        var png = new File(basePath + "/" + fileName  + ".png");
        if(png.exists) 
        png.remove();
        
        var pngSaveOptions = new PNGSaveOptions(); 
        activeDocument.saveAs(png, pngSaveOptions, true, Extension.LOWERCASE); 
     }
     catch(e){
		alert(e);
	 }
}

// Reset the application preferences
app.preferences.rulerUnits = startRulerUnits;
app.preferences.typeUnits = startTypeUnits;
app.displayDialogs = startDisplayDialogs;

writeFile(cssLog);

// Show results
if ( basePath == null ) {
        alert ("Export aborted", "Canceled");
} else {
    alert("Exported finished", "Success!");
}