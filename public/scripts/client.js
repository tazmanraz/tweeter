/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  // Submitting Tweets from form submission
  $('form').on('submit', function(event) {
    //Ensures page doesn't refresh by default
    event.preventDefault();

    let charCount = $('.tweet-post').val().length;
    if(tweetCharError(charCount)) {
      return;
    }
    else {
      $('.validation-text').css('color', 'black').slideUp();

      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $('form').serialize()

      // Adds to tweet page and resets all parameters in tweet submission box
      }).then(function() {
        $('.counter').val(140);
        $('.tweet-post').val('');
        loadTweets();
      }).catch(function(error) {
        console.error(error);
      })
    }
  })

  // Ensures initial tweets are loaded
  loadTweets();

});
