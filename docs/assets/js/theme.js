$(document).ready(function() {
  // Get started!

  /*
   * Include function
   */

  $(function() {
    var includes = $('[data-include]');
    jQuery.each(includes, function() {
      var file = 'partials/' + $(this).data('include') + '.html';
      $(this).load(file);
    });
  });

  /*
   * To up button
   */

  setTimeout(() => {
    $('.UpButton').on('click', function() {
      debugger;
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });
  }, 1000);

  /*
   * Replace all SVG images with inline SVG
   */

  $('img.svg').each(function() {
    var $img = $(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    $.get(
      imgURL,
      function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = $(data).find('svg');

        // Add replaced image's ID to the new SVG
        if (typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
        if (
          !$svg.attr('viewBox') &&
          $svg.attr('height') &&
          $svg.attr('width')
        ) {
          $svg.attr(
            'viewBox',
            '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width')
          );
        }

        // Replace image with new SVG
        $img.replaceWith($svg);
      },
      'xml'
    );
  });

  /*
   * Menu background
   */

  $(window).scroll(function() {
    $(window).scrollTop() > 50
      ? $('.Pinatedo-menu').addClass('Pinatedo-menu-dark')
      : $('.Pinatedo-menu').removeClass('Pinatedo-menu-dark');
  });

  /*
   * Servicios elements
   */

  $('.servicios-container a').each(function() {
    $(this).on('click', function() {
      debugger;
      var element = $(this);
      var imageSrc = element.data('image');
      $('.service-image').attr('src', `/assets/img/${imageSrc}.jpg`);
    });
  });

  /*
   * Content for modals
   */

  $('.openPopup').on('click', function() {
    var dataURL = $(this).data('content');
    $('.modal-body').load(dataURL, function() {
      $('#TallerModal').modal({ show: true });
      // Load images for Palmira
      $('#carouselPalmira').on('slide.bs.carousel', function() {
        $('.videoElement').each(function() {
          debugger;
          var link = $(this).attr('src');
          $(this)
            .removeAttr('src')
            .attr('src', link);
        });
      });
    });
  });

  // End Script
});
