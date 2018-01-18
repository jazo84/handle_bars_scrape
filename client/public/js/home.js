$(document).ready(function(){
  $.ajax({
      type: 'GET',
      url: "/api/scrape",
      success: function(res){
      console.log(res)
      }
});
