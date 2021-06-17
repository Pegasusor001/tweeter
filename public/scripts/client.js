$(document).ready(function () {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  
  const loadTweets = function() {
    $.ajax(' http://localhost:8080/tweets', { method: 'GET' })
    .then(function(data){
      console.log(data[data.length - 1])
      console.log(data);
      renderTweets(data);
    })
  }
  
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      let newTweet = createTweetElement(tweet)
      $('.new-tweet').after(newTweet);
    }

  }
  
  const createTweetElement = function(tweet) {
    const timePassed = timeago.format(tweet.created_at); 
    let newTweet = $(`
      <section class='post-tweet'>
        <div class='user-infor'>
          <i class="fas fa-child"></i>
          <p class='user-name'>${escape(tweet.user.name)}</p>
          <a class='user-link'>${escape(tweet.user.handle)}</a>
        </div>

        <div class='tweet-content'>${escape(tweet.content.text)}</div>
        
        <div class='footnotes'>
          <footer class='date'>${escape(timePassed)}</footer>
          <footer class='user-tags'>
            <i class="icon-tag fas fa-tag"></i>
            <i class="icon-tag fas fa-share-square"></i>
            <i class="icon-tag fas fa-heart"></i>
          </footer>
        </div>

      </section>`)
    return newTweet;
  }

  loadTweets();
  $("form").on("submit", function (event) {
    event.preventDefault();
    inputValue = $('#tweet-text').val().length;
    if (inputValue === 0) {
      $('.error-message')
      .html("<p class='error'>Please enter something!</p>")
      .slideDown()

    } else if (inputValue > 140) {
      $('.error-message')
      .html("Too many words!")
      .slideDown()

    } else {
      $.ajax({
        url: '/tweets',
        method: "POST",
        data: $(this).serialize()
      })
      .then(() => {
        $('#tweet-text').val('');
        $('#tweet-text').trigger('input');
        return $.ajax(' http://localhost:8080/tweets', { method: 'GET' })
      })
      .then((tweets) => {
        const lasttweet = tweets.pop();
        let newTweet = createTweetElement(lasttweet)
        $('.new-tweet').after(newTweet);
      })
      .catch((error) => {
        alert('there is an error')
      })
    } 
  });

})


