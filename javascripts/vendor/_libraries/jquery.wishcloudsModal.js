;(function($, undefined){ 

	jQuery.fn.wishcloudsModal = function(settings){ 
    
    $(this).addClass('initialized')

		this.each(function(){ 

			var $this 	= $(this), 
				options = $.extend({}, $.fn.wishcloudsModal.defaults, settings, $this.data());

			$this.on('click', function(event){ 
				event.preventDefault();

				var modal 			= $this.data('modal'), 
					modal_id 		= '#' + modal, 
					container 		= $('.modal-container', modal_id), 
					close 			= $('<a href="#close" class="modal-close button close round" id="' + modal + '-close" title="Close">&times;</a>'), 
					overlay 		= $('<div class="modal-overlay" id="' + modal + '-overlay" />');

				// Add class to <html> & <body> to prevent scrolling
				$('html, body').addClass('modal-open');


				// Add modal background/overlay, trigger modal container (This uses CSS3 to slide/fade in)
        $(modal_id).find('div.modal-overlay').remove();
				$(modal_id).append(overlay).fadeTo(options.speed, 1.0).addClass('modal-visible');


				// Add "close" button, if set in options
				if ( options.closebutton === 'true' )
					container.prepend(close);


				// Set overlay color, and fade in
				overlay.css({ 
					'backgroundColor' : options.background, 
				}).fadeTo(options.speed, (options.opacity / 100) );


				// Close modal on click
				$(document).on('click', '.modal-overlay, .modal-close', function(event){ 
					event.preventDefault();

					var id = $(this).attr('id');

					if( $(event.target).is('.modal-overlay') ){ 
						id = id.replace('-overlay', '');
					} else { 
						id = id.replace('-close', '');
					}

					close_modal( id );
				});

			});


			function close_modal(id){ 
        alert("closing modal")
				$('#' + id + '-overlay').fadeOut(options.speed, function(){ 
					$(this).remove();
				});

				$('#' + id).fadeOut(options.speed, function(event){ 
					$('#' + id + '-close').remove();
				}).removeClass('modal-visible');

				if ( ! $('.modal-visible').length)
					$('html, body').removeClass('modal-open');
			}


		}); // return
	};

	$.fn.wishcloudsModal.defaults = { 
		background		: null, 
		opacity 		: '70', 
		closebutton		: 'true', 
		speed 			: 250, 
	};


	$.wishcloudsModal = function(elem, options){ 
		return $(elem).wishcloudsModal(elem, options);
	};

})(jQuery);
