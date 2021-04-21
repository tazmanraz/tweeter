/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {

  $('form').on('submit', function(event) {
    event.preventDefault();
    console.log($('form').serialize());
    $.ajax({
      url:"/tweets",
      method:"POST",
      data: $('form').serialize()
    }).then(function(response){
      console.log(response)
    })
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
    <p class="tweet-message">${tweetObject.content.text}</p>
    <hr>
  </header>

  <footer class="tweet-footer">

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
    for (const tweet of tweets) {
      $('#tweets-container').append(createTweetElement(tweet));
    }
  }

  // renderTweets(data);

});
