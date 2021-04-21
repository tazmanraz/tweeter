/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {
  
  // Database of existing tweets
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

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

  renderTweets(data);

});
