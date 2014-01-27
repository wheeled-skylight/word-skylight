$(function(){ 

	carousel();
	profileHover();
	launchProfile();
	isotopeFilter();

});


function profileHover(){ 

	var speedIn 	= 100, 
		speedOut 	= 250, 
		distance 	= '45px';

	$('.grid-profile').on({ 
		mouseenter: function(event){ 
			$('.profile-panel', this).stop(true, true).animate({ 'bottom' : '+='+ distance }, speedIn);
		}, mouseleave: function(event){ 
			$('.profile-panel', this).stop(true, true).animate({ 'bottom' : '-='+ distance }, speedOut);
		}
	});

}


function carousel(){ 

	var carousel = $('#carousel').waterwheelCarousel({ 
		separation			: 250, 
		opacityMultiplier 	: 1.0
	});

	$('.carousel-nav#prev').on('click', function(event){
		event.preventDefault();
		carousel.prev();
	});

	$('.carousel-nav#next').on('click', function(event){ 
		event.preventDefault();
		carousel.next();
	});

}


function isotopeFilter(){ 

	$('#grid-filter-items').isotope({ 
		itemSelector	: '.isotope-item', 
		animationEngine	: 'best-available', 
		filter			: '*', 
		layoutMode		: 'fitRows', 
		animationOptions: { 
			duration	: 500, 
			easing		: 'linear', 
			queue		: false, 
		}, 
	});

	$('#filter a').on('click', function(event){ 
		event.preventDefault();

		var $this		= $(this), 
			$selector	= $this.attr('data-class');

		if($this.hasClass('selected'))
			return false;

		runIsotope($selector);
	});

}


function runIsotope(selector){ 

	$('#filter a[data-class="'+ selector +'"]').addClass('selected').parent().siblings().find('a.selected').removeClass('selected');

	$('#grid-filter-items').isotope({
		filter : selector
	});
	
}


function launchProfile(){ 

	$('.profile-bio').on('click', function(event){ 
		event.preventDefault();

		var fadeIn	= 500,
			fadeOut	= 400;

		var $this 			= $(this).parents('.profile-panel'), 
			$name 			= $this.find('.name').text(), 
			$title 			= $this.find('.title').text(), 
			$description 	= $this.find('.description').text(), 
			$link 			= $this.siblings('a'),
			$image 			= $link.find('img'), 
			$follow 		= $this.find('.profile-follow');

		lightbox = '<div class="lightbox clearfix">' + 
			'<a href="#close" class="close">&times</a>' + 
			'<div class="lightbox-information">' + 
				'<div class="lightbox-image"><img src="' + $image.attr('src') + '" /></div>' + 
				'<p class="name"><span class="intro">Biography for</span>' + $name + '</p>' + 
				'<p>' + $description + '</p>' + 
			'</div>' + 
			'<div class="lightbox-buttons">' + 
				'<a href="' + $follow.attr('href') + '" class="button">Follow</a><hr />' + 
				'<a href="' + $link.attr('href') + '" class="link">View Wishclouds</a>' + 
			'</div>' + 
		'</div>';

		$('body').append( lightbox + '<div class="overlay" />');

		$('.lightbox, .overlay').fadeIn(fadeIn);

		$('.overlay').css({
			'width' : '100%', 
			'height' : $(document).height()
		});

		$('.close, .overlay').on('click', function(event){ 
			event.preventDefault();

			$('.lightbox, .overlay').fadeOut(fadeOut, function(event){ 
				$(this).remove();
			});
		});
	});

}