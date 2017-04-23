// ---- Custom script  must be here -------
$( function() {
  $( "#trip_type" ).selectmenu();
  $( "#depart_date" ).datepicker();
  $( "#depart_time" ).selectmenu();
  $( "#sur_place" ).selectmenu();
  $( "#step-part-time" ).selectmenu();
  $( "#step-part-time2" ).selectmenu();
  $('.step-parts').hide();

  var switchValue = false;

  $('#step-switcher').on('click', function(){
    $('#step-switcher').toggleClass('active-switch');
    $('.step-parts').toggle();
    switchValue = ! switchValue;
    if(switchValue){
      $('#step-switcher').text('ON');
    }else{
      $('#step-switcher').text('OFF');
    }

  });
} );

//--------------------------------------------