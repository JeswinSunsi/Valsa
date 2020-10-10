$(document).ready(function() {
    $('#shorten').click(function() {
      const url = $('#url').val();
      $.ajax({url: '/', data: { url }, type: 'POST', success: function(res) {
        shortUrl = window.location.hostname+'/'+ res.url;
        sessionStorage.setItem("shortUrl", shortUrl);
        window.location.href = '/' + "result";
      }})
    })
  })
  
  