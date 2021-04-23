/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  //////////////////////////////////////
  /////// HELPER FUNCTIONS /////////////
  //////////////////////////////////////

  // These helper functions will be moved to separate scripts with more time for best practises and readability

  // Cross Site Scripting function To ensure no malicious postings get through to ruin web page
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

    // Function to create tweets as an HTML element
    // escape function used in <p> tag to prevent malicious cross site scripting
    const createTweetElement = function(tweetObject) {
      const $tweet = $(`<article class="tweet">
      <header>
      <div class="tweet-header">
        <div>
          <img src="${tweetObject.user.avatars}" alt="user-avatar">
          <span>${tweetObject.user.name}</span>
        </div>
        <span>${tweetObject.user.handle}</span>
      </div>
      <p class="tweet-message">${escape(tweetObject.content.text)}</p>
    </header>
    
    </div>  <footer class="tweet-footer">
  
      <span>${timeago.format(tweetObject.created_at)}</span>
  
      <div class="footer-icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
      </article>
      `);
      return $tweet;
    }
  
    //Renders all tweets from database using createTweetElement
    const renderTweets = function(tweets) {
      // We must empty the container each time to avoid duplication
      $('#tweets-container').empty();
      for (const tweet of tweets) {
        $('#tweets-container').prepend(createTweetElement(tweet));
      }
    }
  
    // Loading tweets
    const loadTweets = function() {
      $
        .ajax('/tweets')
        .then(function(tweets) {
          renderTweets(tweets);
        }).catch(function(error) {
          console.error(error);
        })
    }

  ///////////////////////////////////
  /// CLIENT SUBMISSION WITH AJAX ///
  ///////////////////////////////////
  

  // Submitting Tweets from form submission
  $('form').on('submit', function(event) {
    //Ensures page doesn't refresh by default
    event.preventDefault();

    let charCount = $('.tweet-post').val().length;

    // If statements checking for valid post submissions. May move to another script
    if (charCount === 0) {
      // Sliding up in case back to back errors
      $('.validation-text').slideUp();

      // CSS hardcoded in here. Use jQuery addClass/removeClass features and put in stylesheet
      // To add boxes and a more elegant looking error message.
      $('.validation-text').html('🛑 CANNOT SEND AN EMPTY TWEET 🛑')
        .css('color', 'red')
        .slideDown(500);

    } else if (charCount > 140) {
      $('.validation-text').slideUp();
      
      $('.validation-text')
        .html('🛑 SEND LESS THAN 140 CHARACTERS 🛑')
        .css('color', 'red')
        .slideDown(500);

    } else {
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
