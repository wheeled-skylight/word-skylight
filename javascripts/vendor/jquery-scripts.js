jQuery(document).ready(function($){

	// mobile prevent scroll with sign in modal
	$('#login-button_').on('click', function(){
		$(document).bind('touchmove', function(e) {
	  		e.preventDefault();
		});
	});

	$(document).on('click', '.modal-overlay, .modal-close', function(){ 
		$(document).unbind('touchmove');
	});

	// cancel mobile login
	$("#cancel-mobile-login").click(function() {
		$(document).unbind('touchmove');
		$('.modal-close').click();
		Backbone.history.navigate("home", {trigger: true});
	});

  // Instantiate signing in spinner
  WishClouds.References.Utils.instantiate_spinner("signing-in-spinner")

  $('#sign-in-email-submit').live('click', function() {
    email = $('#userEmail').val()
    password = $('#password').val()
    hashed_password = md5(password)
    payload = {'email':email,'password': hashed_password}
    url = WishClouds.References.Constants.api + '/login/password?api-key=' + WishClouds.References.Constants.api_key
    //$("span[data-modal='modal-signing-in']").click()
    $('.signing-in-message-overlay').show()
    signing_in_message_text()
    $.ajax(url, {
      type: 'POST',
      async: true,
      contentType: 'application/json',
      data: JSON.stringify(payload),
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("AJAX Error: " + textStatus);
        return console.log(jqXHR);
      },
      success: function(data, textStatus, jqXHR) {},
      complete: function(xhr, status) {
        $('#modal-signing-in .close').click()
        var account_id, data;
        if (status === "error") {
          console.log('ERROR logging in!');
          $('.signing-in-message-overlay').hide()
          return $('.oops').show()
        } else {
          data = JSON.parse(xhr.responseText);
          account_id = data.account_id;
          $.cookie('accountId', account_id);
          WishClouds.session();
          $('#userEmail').val('')
          $('#password').val('')
          WishClouds.References.Utils.hide_modal_overlay()
          Backbone.history.navigate('/home', true);
          WishClouds.References.Views.HeaderView.render();
          // $('#modal-signing-in .close').click()
          $('.signing-in-message-overlay').hide()
          WishClouds.References.Utils.on_sale_toggle();
        }
      }
    });

  });

	// sale toggle
	//$('.on-sale-li .toggle').click(function(){
		//$('.on-sale-li .toggle').toggleClass('on');
	//});

	// sign-in-form toggle
	$('.show-sign-in-form').click(function(){
		$('.sign-in-form').toggleClass('hide');
		$('html, body').animate({
	        scrollTop: $('#sign-in-form-position').offset().top
	    }, 'slow');
    if (!$('.sign-in-form').hasClass('hide')) {
      $('#userEmail').val('')
      $('#password').val('')
      $('.oops').hide()
    }
	});

	// position switcher for mobile
	$('.has-touch input, .has-touch textarea').focus(function(){
		$('.header-outer').css('position', 'absolute');
		// $('#login-modal').css('position', 'absolute');
	});

	$('.has-touch input, .has-touch textarea').blur(function(){
		$('.header-outer').css('position', 'fixed');
		// $('#login-modal').css('position', 'fixed');
	});

  $("#delete-remove-cloud-btn").click(function() {
    $('#delete-remove-cloud-btn').addClass('active')
    WishClouds.References.Views.WishesIndex.delete_cloud()
  });

  $('.modal-overlay').live('click', '.modal-overlay, .modal-close', function(event){ 
    if (Backbone.history.fragment == "" || Backbone.history.fragment == "home") {
      trigger_youtube_video('pauseVideo')
    }
  });

  $('#modal-video-01-close').live('click', function(event) {
    // trigger_youtube_video('pauseVideo')
    $("#modal-video-01 iframe").attr("src", $("#modal-video-01 iframe").attr("src"));
  });

  	// feedback buttons
    //$(function() {
      //var $buttons = $('button.feedback, .button.feedback')

		//$($buttons).live('click', function(){
			//$(this).addClass('active');
		//});

		//$('.save-mix').live('click', function(){
			//$($buttons).removeClass('active');
		//});

		//$('#save-new-wish-mix').live('click', function(){
			//if ($('#input-new-wish-mix').val() != ''){
				//$(this).addClass('active');
			//} else {
				//$(this).removeClass('active');
			//}
		//});
	//});

	// charCount settings
	$("#short-bio").charCount({
		allowed: 500,
		warning: 50,
		counterText: ' Characters Remaining'
	});

	// sort tastemakers isotope with select menu
	$(function() {
	    var $container = $('#grid-one'),
	        $select = $('#select-filter select');

	    $container.isotope({
	        itemSelector: '.isotope-item'
	    });

	    $select.change(function() {
	        var filters = $(this).val();

	        $container.isotope({
	            filter: filters
	        });
	    });
	});

	// mobile description toggle
	// ----------------------------------------
	$('.description-toggle').live('click', function(){
		$('.description').toggleClass('description-height');
		$(this).children('div:last-child').toggleClass('hide');
	});

	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.scrollup').fadeIn();
		} else {
			$('.scrollup').fadeOut();
    	}
    });


	$('div.modal-overlay').live('click', function(event)   {
	// Stop the click event from bubbling through the modal overlays
	event.stopImmediatePropagation()
	open_modals = $('div.modal-visible')
	// Close the top most modal
	$(open_modals[open_modals.length - 1]).find('a.modal-close').click()
	});

	$('.scrollup').live('click',function(event){
		$("html, body").animate({ scrollTop: 0 }, 200);
	});

  // Share button JavaScript
  $('a.share-button').live('click', function(event)  {
    event.preventDefault();
    var shareURL = $(this).data("share-url");
    if ($(this).hasClass('facebook')){
      var fbShareUrl = "http://www.facebook.com/share.php?u=" + encodeURIComponent(shareURL);
      WishClouds.References.Utils.center_pop_up(fbShareUrl, 'Facebook Share', 400, 270);
    } else if($(this).hasClass('twitter')){
      // do nothing
    }else if($(this).hasClass('pinterest')){
        window.open($(this).attr('href'), '_blank', 'width=600,height=300');
    }
  });

  $(document).live('click', function(event){ 
		if( $(event.target).parents().index( $('.mix-menu' ) == -1 ) )
			$('.mix-menu li.active').removeClass('active');
      $($('ul.mix-menu li')[0]).removeClass('active');
	});

	$('input:checkbox', '.mix-menu').live('click', function(event){

    if (!$(this).hasClass('hot-store-checkbox')) {

      var $this 		= $(this), 
			  type 		= $(this).attr('id').split('-')[0], 
			  checkbox	= $('input[id^="' + type + '"]').not('[id$="toggle"]'), 
			  checked 	= $('input[id^="' + type + '"]:checked').not('[id$="toggle"]'), 
			  toggle 		= $('input[id$="toggle"]'), 
			  searchBtn 	= $('#' + type + '-search');

		  // Is this Checkbox the "toggle" checkbox?
		  if( $this.is('[id$="toggle"]') ){ 
			  if( this.checked ){ 
				  checkbox.prop('checked', true).parent().addClass('checked');
				  searchBtn.removeClass('disabled');
			  }else{ 
				  checkbox.prop('checked', false).parent().removeClass('checked');
				  searchBtn.addClass('disabled');
			  }

		  }else{ 
			  // Uncheck "toggle" checkbox if all checkboxes are not selected
			  if(checkbox.length == checked.length ){ 
				  toggle.prop('checked', true).parent().addClass('checked');
			  }else{ 
				  toggle.prop('checked', false).parent().removeClass('checked');
			  }

			  // Hide Button if checkboxes are not checked
			  if( ! checkbox.is(':checked') ){ 
				  searchBtn.addClass('disabled');
			  } else{ 
				  searchBtn.removeClass('disabled');
			  }
        element = event.target
        $this.parent().toggleClass('checked');
		  }
	
    } 

  });

	$('li', '.mix-menu').live('click', function(event){
	//	event.preventDefault();
		event.stopPropagation();

		var $firstChildren 		= $(this), 
			$firstParent 		= $firstChildren.parent('ul'), 
			$secondParent 		= $('ul:nth-child(2)', $firstChildren), 
			$secondChildren 	= $('li', $secondParent);

		if( $firstChildren.hasClass( 'price-slider' ) )
			return false;

		if( $firstParent.hasClass('mix-menu') && $firstChildren.hasClass('active')){ 
			$firstChildren.removeClass('active');
			$secondChildren.removeClass('active');
			$('.on-sale-li').removeClass('deactivated');

		}else{ 
			$firstChildren.addClass('active');
			//$('li:first', $secondParent).addClass('active');

			$(this).addClass('active').siblings().removeClass('active');
			$('.on-sale-li').removeClass('deactivated');
		}

		if ( $('.mix-feed-li').hasClass('active') ){
			$('.on-sale-li').addClass('deactivated');
		}
	});

	$(document).click(function(event) {
		$('.on-sale-li').removeClass('deactivated');
	});


  // Is this still being used?!?!
  // $('div.modal-overlay').live('click', function(event) {
  //   $('#modal-product-overlay').remove();
  // });

	// $('.has-no-touch select').each(function(){ 
	// 	var $this 	= $(this), 
	// 		search 	= ($this.attr('data-search') == 'false') ? true : false;

	// 	$this.chosen({ 
	// 		'disable_search' : search, 
	// 	});
	// });

	$('a[data-modal]').wishcloudsModal();

	$('.disabled, [disabled]').on('click', function(event){ 
		event.preventDefault();
	});

  // Notification Menu Interaction JavaScript
  $('.share', '.notification-message').live('click', function(event){ 
		event.preventDefault();

		$(this).parent().stop().animate({ 'left' : '100%'}, 250);
	});

	$('.dismiss', '.notification-message').live('click', function(event){ 
		event.preventDefault();

		$(this).closest('li').stop().animate({ 'right' : '100%'}, 500, function(){ 
			$(this).remove();
		});
	});

	$('.cancel', '.notification-share').live('click', function(event){ 
		event.preventDefault();

		$(this).parent().siblings('.notification-message').stop().animate({ 'left' : '0'}, 200);
	});

	$('.dropdown-title', '.menu-notifications').live('click', function(event){ 
		event.preventDefault();

		var $ul = $(this).next('ul');

		$ul.animate({ scrollTop: $('li:first-child', $ul).position().top }, 300 );
	});

	// $(window).on('load', function(event){ 
	// 	sizeNotificationMenu();

	// }).on('resize', function(event){ 
	// 	sizeNotificationMenu();

	// });

	// $(window).on({
	// 	load: function(event){
	// 		sizeNotificationMenu();
	// 	},
	// 	resize: function(event){
	// 		sizeNotificationMenu();
	// 	}
	// });

	$(window).on('load resize', function(){
		sizeNotificationMenu();
	});

	$('html').on('mouseenter', '.header', function(){
		sizeNotificationMenu();
	});

  $('#FBLogin').live('click', function()   {
    WishClouds.References.Views.HeaderView.loginFB();
  });

});

function sizeNotificationMenu(){ 
	var listCount 			= $('> div > ul', '.menu-notifications').length, 
		$headerHeight 		= $('.header').outerHeight(), 
		$headerTitleBar 	= $('.dropdown-title').outerHeight(), 

		menuHeight = ( $(window).outerHeight() - $headerHeight ) - ($headerTitleBar * listCount), 
		notificationHeight = (menuHeight / listCount) - 20;

	$('.menu-notifications ul').css({ 'maxHeight' : notificationHeight });
}

function trigger_horizontal_menu_js() {
    $('.mix-menu .sub-menu').each(function(){ 
		  var $this 			= $(this), 
			  children 		= $('ul', $this), 
			  extraSpace 		= 0, 
			  containerWidth 	= 0;
		  if( $this.hasClass( 'has-image' ) )
			  containerWidth = 100;
		  $('ul', $this).each(function(){ 
			var $this 	= $(this);
			containerWidth += $this.outerWidth(true, true);
			$this.parents('.sub-menu').css({'width' : containerWidth + 20});
			$this.parents('.sub-menu-wrapper').css({'width' : containerWidth + 20});

			$this.parents('.featured-mixes-li .sub-menu').css({'width' : containerWidth});
			$this.parents('.featured-mixes-li .sub-menu-wrapper').css({'width' : containerWidth});
		  });
	  });
  }

function instantiate_price_slider_js(price_from, price_to) {
  $('.price-slider-values .from').html( '$' + price_from );
  if (price_to > 500) {
    $('.price-slider-values .to').html( '$500+' );
  } else {
    $('.price-slider-values .to').html( '$' + price_to );
  }
  $('#price-slider').slider({ 
    range 	: true, 
    min 	: 1, 
    max 	: 501, 
    step 	: 1, 
    values 	: [price_from, price_to],
    slide 	: function(event, ui){
      WishClouds.References.Views.Filters.price_from = ui.values[0]
      if (ui.values[1] == 501) {
        WishClouds.References.Views.Filters.price_to = 9999999
      } else {
        WishClouds.References.Views.Filters.price_to = ui.values[1]
      }
      $('#price_from').val( ui.values[0] );
      $('#price_to').val( ui.values[1] );
      $('.price-slider-values .from').html( '$' + ui.values[0] );
      $('.price-slider-values .to').html( '$' + ui.values[1] );
      if( ui.values[1] > 500 ){
        $('#price_to').val( '9999999' );
        $('.price-slider-values .to').html( '$500+' );
      }
    }
  });

	$(document).ready(function(){
		$("#div1").show();
	});

	$(".toggleLinks").click(function() {
		$(".toggleLinks").removeClass('active');
		$(this).addClass('active');
		$(".toggleDivs").hide();
		$("#div" + $(this).data("divindex")).fadeIn();
		return false;
	});

}


function skrollr_init() {

  /*skrollr.init({
	  forceHeight: false,
	  smoothScrolling: true,
	  smoothScrollingDuration: 200
  });*/

  if (!touch_device){
		skrollr.init({
			forceHeight: false,
			smoothScrolling: true,
			smoothScrollingDuration: 200
		});
	};
}

function home_slider(context) {

	if (!touch_device){
		$(context).find('#slider-main').flexslider({
			animation: 'fade',
			controlNav: false,
			directionNav: true,
			pauseOnAction: true,
			slideshow: true,
			slideshowSpeed: 9000
		});
	} else {
		$(context).find('#slider-main').flexslider({
			animation: 'slide',
			// animationLoop: false,
			controlNav: false,
			directionNav: true,
			pauseOnAction: true,
			slideshow: true,
			slideshowSpeed: 9000,
			start: function(slider) {
				slider.flexAnimate(-1);
				slider.flexAnimate(0);
			}
		});
	};

}


function tastemaker_slider(context) {

	if (!touch_device){
		$(context).find('#slider-tastemakers').flexslider({
			animation: 'fade',
			controlNav: false,
			directionNav: true,
			pauseOnAction: true,
			slideshow: true,
			slideshowSpeed: 7000
		});
	} else {
		$(context).find('#slider-tastemakers').flexslider({
			animation: 'slide',
			// animationLoop: false,
			controlNav: false,
			directionNav: true,
			pauseOnAction: true,
			slideshow: true,
			slideshowSpeed: 7000,
			start: function(slider) {
				slider.flexAnimate(-1);
				slider.flexAnimate(0);
			}
		});
	};

}

function inject_youtube_video() {
  // Load the IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  tag.src = "http://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // Replace the 'ytplayer' element with an <iframe> and
  // YouTube player after the API code downloads.
  var player;
    function onYouTubePlayerAPIReady() {
		player = new YT.Player('ytplayer', {
			height: '480',
			width: '853',
			videoId: 'G0kONuUoDw0',
			playerVars: {rel: 0}
		});
	}
}

function tastemaker_isotope() {

  $('#grid-one').isotope({
		itemSelector: '.isotope-item',
		animationEngine	: 'best-available',
		masonry: {
			columnWidth: 285,
			gutterWidth: 20
		}
	});

}

function trigger_youtube_video(action) {
  var iframe = document.getElementsByTagName('iframe')[2].contentWindow
  iframe.postMessage('{"event":"command","func":"' + action + '","args":""}', '*');
}

function feed_skrollr() {

  $('#carousel-feed').flexslider({
		animation: 'slide',
		animationLoop: true,
		controlNav: false,
		directionNav: true,
		itemWidth: 1000,
		minItems: 2.33,
    	// maxItems: 9,
    	slideshow: true,
		slideshowSpeed: 7000
	});
}

/*function also_saved_by_page_slider() {

	$('#carousel-page-saved-by').flexslider({
		animation: 'slide',
		animationLoop: true,
		controlNav: false,
		directionNav: true,
		itemWidth: 168,
		minItems: 2,
		maxItems: 6,
		slideshow: true,
		slideshowSpeed: 7000
	});

}*/

function signing_in_message_text() {

	var count = 1;

	function transition() {

	    if(count == 1) {
	        $('#signing-in-message-text').html('Hang in there!');
	         count = 2;

	    } else if(count == 2) {
	        $('#signing-in-message-text').html('Good stuff coming!');
	         count = 3;

	    } else if(count == 3) {
	        $('#signing-in-message-text').html('Signing In');
	        count = 1;
	    }

	}
	setInterval(transition, 3000);
}
