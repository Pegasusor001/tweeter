$(document).ready(function(){

  $("#tweet-text").on('input', function() {
    const count = 140 - $('#tweet-text').val().length;
    $('.counter').text(count);
    
    if (count < 0){
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'black');
    }
  });
  

  const timePassed = timeago.format(1623625371661);
  $('.date').text(timePassed);

})

