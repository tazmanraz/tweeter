/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  // Cross Site Scripting - NOT FINISHED
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Submitting Tweets from form submission
  $('form').on('submit', function(event) {
    event.preventDefault()

    let charCount =  $('.tweet-post').val().length;
    
    // If statements checking for valid post submissions
    if (charCount === 0) {
      $('.validation-text').slideUp();

      $('.validation-text').html('Cannot send an empty tweet.')
      .css('color', 'red')

      .slideDown(500);
      //return false;
    } else if (charCount > 140) {
      $('.validation-text').slideUp();
      $('.validation-text')
      .html('Please use less than 140 characters')
      .css('color', 'red')

      .slideDown(500);

    } else {

      $('.validation-text').css('color', 'black').slideUp();
    
      // $('.validation-text').slideUp(500, function() { $(this).remove()})

    $.ajax({
      url:"/tweets",
      method:"POST",
      data: $('form').serialize() // should work with event.target.value - Test later for interest
    
    // Adding to page
    }).then(function(response) {
      $('.counter').val(140);
      $('.tweet-post').val('');
      loadTweets();
      //console.log(loadTweets())
    }).catch(function(error){
      //console.error(error);
    })
  }
  })
  
  // Function to create tweets
  const createTweetElement = function (tweetObject) {
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
    <hr>
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
      //console.error(error);
    })
  }

  loadTweets();

});
