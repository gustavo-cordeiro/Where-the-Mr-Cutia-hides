var numPages = $('section').length;
var currentPage = 1;
var currentText = 0;
var mode = 1; //Display mode: 0: student; 1: teacher; 2: parents

$(document).ready(function() {
    document.addEventListener("deviceready", onDeviceReady, true);

    var totalSize = 0;
    var scale = $(window).height() / 1024;
    var size = Math.floor(600 * scale);

    //Sets the scale of the page.
    $('body').css('font-size', scale + 'em');

    //Sets real size in px.
    $('.page').each(function() {
        $(this).css('width', size + 'px');
        totalSize += size;
    });

    $('.default-width-center').each(function() {
        $(this).css('width', size + 'px');
    });

    $('#page-containner').css('width', totalSize + 'px');

    window.bookAnimation = new BookAnimationController($(window).height() / 1024, onAnimationsLoaded);
    window.bookAnimation.init();

    window.mobileControl= new TouchControl();
    window.ontouchstart = window.onmousedown = window.mobileControl.press;
    window.ontouchend   = window.onmouseup = window.mobileControl.unpress;
    window.ontouchmove  = window.onmousemove = window.mobileControl.motion;


    var check = false;
    (function(a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
            check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    if (check)
        $('#page-navigation').remove();
});

function onAnimationsLoaded() {
    $("#page-navigation").show();
    $("#main").show();
    $("#loading").hide();

    if (window.location.hash.indexOf('-', 0) >= 0) {
        currentPage = parseInt(window.location.hash.split('-')[1])
        $("#page-containner").css("margin-left", -((currentPage - 1) * $("#main").width()));
    }

    checkMode();

    //Button next page.
    $("#btn-next").parent().click(function() {
        //Checks if the current page has a "text-transition" div.
        var div = $("#page-" + currentPage + " div.text-transition > div");
        if (currentText < div.length - 1 && div.length > 0) {
            $("#page-" + currentPage + " div.text-transition").animate({
                "margin-left": -(++currentText * $('#main').width())
            });
        } else {
            nextPage();
        }
    });

    //Button previous page.
    $("#btn-prev").parent().click(function() {
        //Checks if the current page has a "text-transition" div.
        var div = $("#page-" + currentPage + " div.text-transition > div");
        if (currentText > 0 && div.length > 0) {
            $("#page-" + currentPage + " div.text-transition").animate({
                "margin-left": -(--currentText * $('#main').width())
            });
        } else {
            previousPage();
        }
    });

    //Button teacher's mode (if available).
    $("#btn_teacher").click(function() {
        $("#page-" + currentPage + " .mode_teacher").slideToggle("slow");
    });

    //Button parent's mode (if available).
    $("#btn_parents").click(function() {
        $("#page-" + currentPage + " .mode_parents").slideToggle("slow");
    });

    //Button for closing mode's windows (if available).
    $(".mode_teacher_close, .mode_parents_close").click(function() {
        $(this).parent().slideToggle("slow");
    });

    //Buttom for moving text on mode's windows up.
    $(".mode_multipage .mode_teacher_up, .mode_multipage .mode_parents_up").click(function() {
        var divs = $(this).siblings("div");
        var size = divs.outerHeight();
        var count = divs.length - 1;
        var first = divs.first();
        var margin = parseInt(first.css("marginTop")) + size;
        if (margin > 0)
            margin = 0;
        first.animate({"margin-top": margin});
    });

    //Buttom for moving text on mode's windows down.
    $(".mode_multipage .mode_teacher_down, .mode_multipage .mode_parents_down").click(function() {
        var divs = $(this).siblings("div");
        var size = divs.outerHeight();
        var count = divs.length - 1;
        var first = divs.first();
        var margin = parseInt(first.css("marginTop")) - size;
        if (margin >= -(size * count))
            first.animate({"margin-top": margin});
    });

    $(window).resize(function() {
        //If there's a resize event, the page will be realoded.
        $("#page-navigation").hide();
        $("#main").hide();
        document.location.reload();
    });
}

function onDeviceReady() {
    navigator.accelerometer.watchAcceleration(window.bookAnimation.moveShip, function() {
        alert("Error: it's not possible to activate accelerometer.");
    }, {frequency: 50});
}

function nextPage() {
    currentPage = currentPage + 1 > numPages ? numPages : currentPage + 1;
    //When going to the next page, the current text page is always 0 (the first one).
    currentText = 0;

    scrollPageTo(currentPage);
}

function previousPage() {
    currentPage = (currentPage - 1 < 1 ? 1 : currentPage - 1);
    //When going to the previous page, the current text page is always the length (the last one).
    currentText = $("#page-" + currentPage + " div.text-transition > div").length - 1;
    if (currentText < 0)
        currentText = 0;

    scrollPageTo(currentPage);
}

function scrollPageTo(to) {
    //Scrolls the page.
    $("#page-containner").animate({
        "margin-left": -((to - 1) * $('#main').width())
    }, function() {
        window.location.hash = $('section:nth-child(' + to + ')').attr('id');
    });

    //Scrolls the text inside the page, if there's any.
    $("#page-" + currentPage + " div.text-transition").css("margin-left", -(currentText * $('#main').width()));

    checkMode();
}

function checkMode() {

    //Call function find-word
    //Create reference
    if (currentPage === 12)
        setTimeout(reference_td, 2000);

    //Checks if, for the given mode, there's a compatible article.
    if (mode === 1 && $("#page-" + currentPage + " .mode_teacher").length > 0) { //Teacher.
        $("#btn_teacher").slideDown();
        $("#btn_parents").slideUp();
    } else if (mode === 2 && $("#page-" + currentPage + " .mode_parents").length > 0) { //Parents.
        $("#btn_teacher").slideUp();
        $("#btn_parents").slideDown();
    } else {
        $("#btn_teacher").slideUp();
        $("#btn_parents").slideUp();
    }
}

function TouchControl() {

    var motion = {
        x: 0,
        y: 0,
        setByEvent: function(event) {
            this.x = event.clientX ? event.clientX : event.changedTouches[0].pageX;
            this.y = event.clientX ? event.clientX : event.changedTouches[0].pageX;
        }
    };
    var pressed = false;

    var startPoint = {x: 0, y: 0};

    this.press = function(event) {
        pressed = true;
        motion.setByEvent(event);
        startPoint.x = motion.x;
        startPoint.y = motion.y;

    };

    this.unpress = function() {
        pressed = false;
        startPoint.x = 0;
        startPoint.y = 0;
    };

    this.motion = function(event) {
        if (pressed) {
            motion.setByEvent(event);
            if (startPoint.x - motion.x > 50) {
                pressed = false;
                nextPage();
            }
            else if (startPoint.x - motion.x < -50) {
                pressed = false;
                previousPage();
            }
        }
    };
}