// This javascript function updates the character count dynamically using jQuery.
// Counter will change red after it goes over 140 characters

$(document).ready(function() {
  $('.tweet-post').on('input', function() {
    const textCount = $(this).val().length;
    const counter = $(this).parent().find(".counter");
    counter.text(140 - textCount);

    if (textCount > 140) {
      counter.css('color', 'red');
    } else {
      counter.css('color', 'black')
    }
  })
});

