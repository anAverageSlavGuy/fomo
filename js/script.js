var quotes = ["I fear others have more rewarding opportunities than me.",
			  "I get worried when I observe my friends are having fun without me.",
			  "I'm overloaded of anxiety when I don't know what my friends are up to.",
			  "If I'm not able to understand my friends in jokes, I feel as I'm lost in an ocean.",
			  "Sometimes, I wonder if it's an obligation to spend time knowing what is going on.",
			  "When I have good time it is important for me to share the details online to not to fall in oblivion.",
			  "When I'm ousted from a planned get-together it bothers me.",
			  "When I go on vacation, for me is an obsession to keep tabs on what my friends are doing."];

var words = ["Opportunity", "Observe", "Overload", "Ocean", "Obligation", "Oblivion", "Oust", "Obsession"];
var word_index = 0;
var animation_left_active = false;
var animation_right_active = false;
var audio = document.getElementById('audio');
var volume_interval;
var arrow_transition = 500;
var presentation_timer;
var presentation_interval = 7000;
var animation_interval = 7000;
var music_stop_timeout = 10000;

var survey_indicator = ["0.8vw", "5.4vw", "9.9vw", "14.5vw", "19vw"];

var win = $(window);
var winH = win.height();   // Get the window height.
var winW = win.width();

$(document).ready(function () {
	currentWord();

    $(".main").fadeTo( 1500, 1, function() {
    // Animation complete.
    });


    $( ".findout-btn" ).on( "click", function( event ) {
    	musicPlay();
  		$(".home").fadeOut( 1000, 0, function() {
  			$(".content").fadeTo( 1500, 1);
  			$(".next").fadeTo( 1500, 1);
  			$(".poster").fadeOut( 500 );
  			$(".navbar").fadeTo( 500, 0 );
  			$(".logo-word").fadeIn( 500 );
  			$(".audio-reminder").css("display", "flex").hide().fadeIn(500, function(){
  				setTimeout(function(){ 
  					$(".audio-reminder").fadeOut(500);
  						startAutomaticPresentation(presentation_interval);
  				}, 3000);
  			});
  		});
    });


  	$(".arrow-word-left").hover(function(){

  		let _word = this;
  		if (animation_left_active) {return;}
    	animation_left_active = true;
	    $('.arrow-icon-left').fadeOut( arrow_transition, function(){});
	    $(_word).fadeTo( arrow_transition, 1, function(){
	    	animation_left_active = false;
	    });

	}, function(){

		$(this).fadeTo( arrow_transition, 0, function(){});
		$('.arrow-icon-left').fadeIn( arrow_transition, function(){
			animation_left_active = false;
		});

	});



	$(".arrow-word-right").hover(function(){

  		let _word = this;
  		if (animation_right_active) {return;}
    	animation_right_active = true;
	    $('.arrow-icon-right').fadeOut( arrow_transition, function(){});
	    $(_word).fadeTo( arrow_transition, 1, function(){
	    	animation_right_active = false;
	    });

	}, function(){

		$(this).fadeTo( arrow_transition, 0, function(){});
		$('.arrow-icon-right').fadeIn( arrow_transition, function(){});

	});



	$( ".arrow-word-left" ).on( "click", function( event ) {
		previousWord();
	});

	$( ".arrow-word-right" ).on( "click", function( event ) {
		nextWord();
	});

	$( ".audio-reminder" ).on( "click", function( event ) {
		$(".audio-reminder").fadeOut(500);
	});

	$( ".allphoto-link" ).on( "click", function( event ) {
		$(".navbar").fadeTo( 1000, 1 );
		//$( ".audio-mute" ).fadeOut(500);
		$(".main").fadeOut(500, function(){
			$(".allphoto").fadeIn(500);
			$(".about").fadeOut(500);
			$("html, body").animate({ scrollTop: 0 }, "slow");

		});	
	});

	$( ".about-link" ).on( "click", function( event ) {
		//$(".navbar").fadeTo( 1000, 0 );
		//$("body").css("background", "white");
		//$(".about").css("color", "#101012");

		//$( ".audio-mute" ).fadeOut(500);
		$(".main").fadeOut(500, function(){
			$("html, body").animate({ scrollTop: 0 }, "slow");
			$(".logo").css("filter", "invert(1)");
			$(".audio-mute").css("filter", "invert(1)");
			$(".about").fadeIn(500);
			$(".test").css("display", "flex").hide().fadeIn(500);
		});	
	});

	$( ".logo" ).on( "click", function( event ) {
		location.reload();
	});

	$( ".audio-mute" ).on( "click", function( event ) {
		var isMuted = $(".audio-mute").hasClass("muted");
		if(isMuted){
			musicUnmute();
			$(".audio-mute").removeClass("muted");
			$(".audio-mute img").prop("src", "img/volume_w.png");
			console.log("Unmute");
			
		} else {
			musicMute();
			$(".audio-mute").addClass("muted");
			$(".audio-mute img").prop("src", "img/mute_w.png");
			console.log("Mute");	
		}
		
	});

	setTimeout(function(){ 
		var img = document.getElementById("poster");
		function loaded() {
		  $(".splash").fadeOut(1000);
		}
		if (img.complete) {
		  loaded()
		} else {
		  img.addEventListener('load', loaded)
		  img.addEventListener('error', function() {
		      console.log('error loading img')
		  })
		}
	}, 1000);


    $(window).on("scroll", function () {
    	if($(".about").is(":visible")){
	    	console.log($(this).scrollTop());
	    	console.log("pos: ");
	    	var pos = $(".test").position();
	    	
	    	var test_scroll = pos.top - (winH / 2.8);
	    	console.log(test_scroll);
	        if ($(this).scrollTop() > test_scroll ) {
	            $('.vertical-active').css("top", "10.5vh");
	            $('.vertical-menu').css("filter", "invert(1)");
	            $(".logo").css("filter", "invert(0)");
	            $(".audio-mute").css("filter", "invert(0)");
	            /*if($(".test").is(":hidden")){
	            	$(".test").css("display", "flex").hide().fadeIn(500);

	            }*/
	            
	        } else {
	            $('.vertical-active').css("top", "-2.5vh");
	            $('.vertical-menu').css("filter", "invert(0)");
	            $(".logo").css("filter", "invert(1)");
	            $(".audio-mute").css("filter", "invert(1)");
	        }
    	}
    }).on("resize", function(){ // If the user resizes the window
       winH = $(this).height(); // you'll need the new height value
    });

    $( ".bounce-about" ).on( "click", function( event ) {
		/*$('.vertical-active').css("top", "-2.5vh");
		$('.vertical-menu').css("filter", "invert(0)");
		$(".logo").css("filter", "invert(1)");*/
		window.scrollTo(0, 0);
	});

	$( ".bounce-test" ).on( "click", function( event ) {
		/*$('.vertical-active').css("top", "10.5vh");
		$('.vertical-menu').css("filter", "invert(1)");
		$(".logo").css("filter", "invert(0)");*/
		var pos = $(".test").position();
		window.scrollTo(0, pos.top);
	});

	$( ".start-btn" ).on( "click", function( event ) {
		//$(".findout").fadeOut(500);

		$(".slide-content, .main").fadeOut(500, function(){
			$(".survey").css("display", "flex").hide().fadeIn(500, function(){
				$(".logo").css("filter", "invert(1)");
				$(".audio-mute").css("filter", "invert(1)");
			});			
		});
	});

	$("input[name=switch]").change( function(){
  		console.log($(this).attr("id")+" changed");
  		var checkbox_id = $(this).attr("id");
  		var indicator_id = checkbox_id.split("_")[0];
  		var indicator_pos = Number(checkbox_id.split("_")[1])-1;
  		$("#indicator_"+indicator_id).css("transform", "translate3d("+survey_indicator[indicator_pos]+", 0, 0)");
	});

	$( ".survey-result" ).on( "click", function( event ) {
		var all_answers = [];
		all_answers.push(Number(($($("#one input[type='radio']:checked")[0]).attr("id")).split("_")[1]));
		all_answers.push(Number(($($("#two input[type='radio']:checked")[0]).attr("id")).split("_")[1]));
		all_answers.push(Number(($($("#three input[type='radio']:checked")[0]).attr("id")).split("_")[1]));
		all_answers.push(Number(($($("#four input[type='radio']:checked")[0]).attr("id")).split("_")[1]));
		all_answers.push(Number(($($("#five input[type='radio']:checked")[0]).attr("id")).split("_")[1]));
		all_answers.push(Number(($($("#six input[type='radio']:checked")[0]).attr("id")).split("_")[1]));
		all_answers.push(Number(($($("#seven input[type='radio']:checked")[0]).attr("id")).split("_")[1]));
		all_answers.push(Number(($($("#eight input[type='radio']:checked")[0]).attr("id")).split("_")[1]));
		all_answers.push(Number(($($("#nine input[type='radio']:checked")[0]).attr("id")).split("_")[1]));
		all_answers.push(Number(($($("#ten input[type='radio']:checked")[0]).attr("id")).split("_")[1]));
		
		var value = all_answers.reduce((a, b) => a + b, 0);
		setTestResult(value);
		$(".findout").fadeOut(500);
		$(".survey").fadeOut(500, function(){
			$(".result").css("display", "flex").hide().fadeIn(500, function(){
				$(".logo").css("filter", "invert(0)");
				$(".audio-mute").css("filter", "invert(0)");
			});
		});
	});

});


function vw(v) {
  return (v * winW) / 100;
}

//document.addEventListener('click', musicPlay);
function musicPlay() {
	volume_interval = setInterval(function(){ 
		if(audio.volume <= 0.5){
			console.log(audio.volume)
			audio.volume += 0.005;
		} else {
			clearInterval(volume_interval);
		}
	}, 20);
	audio.volume = 0.1; 
    audio.play();
}

function musicStop() {
	volume_interval = setInterval(function(){ 
		if(audio.volume <= 0.01){
			clearInterval(volume_interval);
			audio.pause();
			audio.currentTime = 0;
		} else {
			console.log(audio.volume)
			audio.volume -= 0.005;
		}
	}, 20); 
}

function musicMute() {
	audio.volume = 0; 
}

function musicUnmute() {
	audio.volume = 0.5; 
}

function previousWord(){
	word_index = word_index-1;
	currentWord();
	if(presentation_timer != undefined){ presentation_timer.reset(presentation_interval); }
}

function nextWord(){
	if(word_index == (words.length-1)){
		console.log('Mostro animazioni');
		presentation_timer.stop();
		$(".content").fadeOut( 500 );
		$(".logo-word").fadeOut( 500 );
		$(".content").fadeOut( 1000, 0, function() {
			
			//$(".navbar").fadeIn( 1500 );
			$(".animation").fadeTo( 1500, 1 , function(){
				setTimeout(function(){ 

  					$(".animation-text").fadeOut(1000, function(){
  						$(".animation-text").html("With social networks this phenomenon is much frequent, <br> almost everyone can suffer from FOMO, even if slightly.");
  						$(".animation-text").fadeIn(1000);
  					});
  					
  					setTimeout(function(){ 

  						console.log('Mostro animazione 1');
  						$(".animation-text").fadeOut(1000, function(){
  							$("#anim-static").fadeOut(1500);
  							$("#anim-dynamic1").fadeIn(1000, function(){
  								var vid = document.getElementById("anim-dynamic1");
  								console.log("play animazione 1");
  								vid.play();
  							});
	  						$(".animation-text").html("Now you know the name of that feeling.");
	  						$(".animation-text").fadeIn(1000);
  						});

  						setTimeout(function(){ 

  							console.log('Mostro animazione 2');
	  						$(".animation-text").fadeOut(1000, function(){
	  							$("#anim-dynamic1").fadeOut(1000);
	  							$("#anim-dynamic2").fadeIn(1000);
	  							$("#anim-dynamic2").fadeIn(500, function(){
  									var vid = document.getElementById("anim-dynamic2");
  									console.log("play animazione 2");
  									vid.play();
  								});
		  						$(".animation-text").html("Remember you're not alone, we're all inside the circle.");
		  						$(".animation-text").fadeIn(1000);
		  						setTimeout(function(){ 
		  							//console.log('Mostro menu finale');
		  							//$(".menufin").css("display", "grid").hide().fadeTo(1000, 1);
		  							$(".slide-bottom").show().animate({bottom:'0.5vw', opacity: 1}, 1500);
		  						}, animation_interval - 1500);
	  						});

  						}, animation_interval - 1500);

  					}, animation_interval);

  				}, animation_interval - 1500);


				/**/

			});

		});
	} else {
		if(presentation_timer != undefined){ presentation_timer.reset(presentation_interval); }
		word_index = word_index+1;
		currentWord();
		
	}
	
}

function currentWord(){
	

	if(word_index == 1) {
		var prev_word = 0;
		//$(".prev").fadeTo( 1000, 1);
		$(".prev").css({'pointer-events': 'auto', 'opacity': 1});
	} else if(word_index == 0) {
		var prev_word = (words.length-1);
		//$(".prev").fadeTo( 1000, 0);
		$(".prev").css({'pointer-events': 'none', 'opacity': 0});
	} else {
		var prev_word = word_index-1;
		//$(".prev").fadeTo( 1000, 1);
		$(".prev").css({'pointer-events': 'auto', 'opacity': 1});
	}

	$(".arrow-word-left").html("."+words[prev_word].toUpperCase());



	if(word_index < (words.length-1)) {
		var next_word = word_index+1;
		$(".arrow-word-right").html("."+words[next_word].toUpperCase());
	} else if(word_index == (words.length-1)) {
		var next_word = 0;
		$(".arrow-word-right").html("THE NAME");
	} else {
		var next_word = word_index+1;
		$(".arrow-word-right").html("."+words[next_word].toUpperCase());
	}

	if(word_index < 0) {
		word_index = (words.length-1);
	} else if(word_index > (words.length-1)) {
		word_index = 0;
	} 
	console.log('index: '+word_index +' - '+ words[word_index]);
	$(".quote").addClass("transparent_quote");
	$("#phrase_"+word_index).removeClass("transparent_quote").fadeIn(1000);
	/*$(".phrase").fadeOut(1000);
	
	$(".phrase").html('<span>&#8220;'+quotes[word_index]+'&#8221;</span>');
	$(".phrase").fadeIn(500);*/
	
	//var photo_uri = "https://via.placeholder.com/1444x900/161719/FFFFFF/?text="+words[word_index].toUpperCase();
	$(".photo_img").addClass("transparent_img");
	$("#photo_"+word_index).removeClass("transparent_img").fadeIn(1000);

	//$('.photo').fadeIn(2000);
	var logo_word = words[word_index].substring(1);
	$(".logo-word").html(logo_word.toUpperCase());

}


function startAutomaticPresentation(delay){
	presentation_timer = new Timer(function() {
		console.log("automatic nextword");
    	nextWord();
	}, delay);
  		
  	presentation_interval = delay;
}

function Timer(fn, t) {
    var timerObj = setInterval(fn, t);

    this.stop = function() {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    }

    // start timer using current settings (if it's not already running)
    this.start = function() {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        return this;
    }

    // start with new or original interval, stop current interval
    this.reset = function(newT = t) {
        t = newT;
        return this.stop().start();
    }
}

function setTestResult(val){
	$("#survey-value").html(val+" / 50");
	var title = "";
	var descr = "";
	if(val >= 10 && val <= 20){
		title = "LOW PROBABILITY THAT YOU MAY SUFFER FROM FOMO";
		descr = `Based on the answers you have given, it appears that you are not at FOMO risk.`
	} else if(val > 20 && val <= 30){
		title = "MODERATE PROBABILITY THAT YOU MAY SUFFER FROM FOMO";
		descr = `The results obtained show that you may be at moderate risk of FOMO.<br>
		Pay attention to what may appear to be specific symptoms.`;
	} else if(val > 30 && val <= 40){
		title = "HIGH PROBABILITY THAT YOU MAY SUFFER FROM FOMO";
		descr = `The test result notes that there is a high probability that you are suffering<br> 
              	from FOMO. Monitor the symptoms and, if you have the perception that they<br>
              	are getting worse, consider the possibility of a consultation.`;
	} else if(val > 40 && val <= 50){
		title = "VERY HIGH PROBABILITY THAT YOU MAY SUFFER FROM FOMO";
		descr = `The test result reveals that there is a high probability that you are suffering from FOMO.<br> 
				Monitor the symptoms and, if you have the perception that they are getting worse,<br> 
				consider the possibility of a consultation.`;
	}

	$("#survey-title").html(title);
	$("#survey-descr").html(descr);

}