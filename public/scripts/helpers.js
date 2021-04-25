// Cross Site Scripting function To ensure no malicious submissions get through to ruin web page
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
    .then(function (tweets) {
      renderTweets(tweets);
    }).catch(function (error) {
      console.error(error);
    })
}

// Checks if tweets are of valid character lengths on submission
const tweetCharError = function(chars) {

  //let charCount = $('.tweet-post').val().length;

  // If statements checking for valid post submissions. May move to another script
  if (chars === 0) {
    // Sliding up in case back to back errors
    $('.validation-text').slideUp();

    $('.validation-text')
      .html('🛑 CANNOT SEND AN EMPTY TWEET 🛑')
      .addClass('error-message')
      .slideDown(500);
      
    return true;
  } else if (chars > 140) {
    $('.validation-text').slideUp();

    $('.validation-text')
      .html('🛑 SEND LESS THAN 140 CHARACTERS 🛑')
      .addClass('error-message')
      .slideDown(500);
    
    return true;
  }
  return false;
}
