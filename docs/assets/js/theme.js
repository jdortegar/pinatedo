$(document).ready(function() {
  // Get started!

  /* 1. Visualizing things on Hover - See next part for action on click */
  // $('#stars li')
  //   .on('mouseover', function() {
  //     var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on

  //     // Now highlight all the stars that's not after the current hovered star
  //     $(this)
  //       .parent()
  //       .children('li.star')
  //       .each(function(e) {
  //         if (e < onStar) {
  //           $(this).addClass('hover');
  //         } else {
  //           $(this).removeClass('hover');
  //         }
  //       });
  //   })
  //   .on('mouseout', function() {
  //     $(this)
  //       .parent()
  //       .children('li.star')
  //       .each(function(e) {
  //         $(this).removeClass('hover');
  //       });
  //   });

  /* 2. Action to perform on click */
  // $('#stars li').on('click', function(e) {
  //   e.stopPropagation();
  //   var onStar = parseInt($(this).data('value'), 10); // The star currently selected
  //   var stars = $(this)
  //     .parent()
  //     .children('li.star');

  //   for (i = 0; i < stars.length; i++) {
  //     $(stars[i]).removeClass('selected');
  //   }

  //   for (i = 0; i < onStar; i++) {
  //     $(stars[i]).addClass('selected');
  //   }
  // });

  //Get the button:
  var mybutton = $('#myUpBtn');
  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function() {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.show();
    } else {
      mybutton.hide();
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  mybutton.on('click', function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  });

  // expand list
  $('.most-popular-choice-element').each(function() {
    var _this = this;
    $(_this)
      .find('.expand-triger')
      .on('click', function() {
        $(_this)
          .find('.list-body')
          .toggle();
      });
  });

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

  $('.most-popular-list li')
    .not('.most-popular-list li:first-child')
    .each(function() {
      var _this = this;
      $(_this).hover(
        function() {
          console.log('over');
          $(_this).addClass('active');
          $('.most-popular-list li:first-child').removeClass('active');
        },
        function() {
          console.log('over');
          $(_this).removeClass('active');
          $('.most-popular-list li:first-child').addClass('active');
        }
      );
    });

  $('.most-popular-choice-list li').each(function() {
    var _this = this;
    $(this).click(function(e) {
      window.open(
        $(_this)
          .find('.link-section a')
          .attr('href'),
        '_blank'
      );
      $(this)
        .find('a')
        .click(function(e) {
          e.stopPropagation();
        });

      return false;
    });
  });

  // End Script
});
