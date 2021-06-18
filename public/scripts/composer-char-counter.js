$(document).ready(function(){

  $("#tweet-text").on('input', function() {
    const count = 140 - $('#tweet-text').val().length;
    $('.counter').text(count);
    
    if (count < 0){
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'black');
    }

    $('.error-message')
    .html("")
    .slideUp();
    
  });
  

})

