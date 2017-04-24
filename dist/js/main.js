// ---- Custom script  must be here -------
$( function() {
  /**
   * Passenger switcher state
   * @type {boolean}
   */

  let switchValue;

  /**
   * Point counter
   * @type {number}
   */

  let pointCounter;

  /**
   * Initialisation data and view
   * @return {*}
   */
  function init(){
    $( "#trip_type" ).selectmenu();
    $( "#depart_date" ).datepicker();
    $( "#depart_time" ).selectmenu();
    $( "#sur_place" ).selectmenu();
    $( "#step-part-time" ).selectmenu();
    $("#checkbox-nested-4").checkboxradio();
    $( ".passenger-action" ).controlgroup();
    $('.step-parts').hide();

    switchValue = false;
    pointCounter = 0;

    if(pointCounter <1){
      $(".second-step").hide();
    }

  }

  function switcherHandler(){
    let elSwitcher = $('#step-switcher');
    elSwitcher.toggleClass('active-switch');
    $('.step-parts').toggle();
    switchValue = ! switchValue;
    if(switchValue){
      elSwitcher.text('ON');
    }else{
      elSwitcher.text('OFF');
      pointCounter = 0;
      $('#step-part-box .step-next').remove();
    }
  }

  function footerControlHandler(e){
    console.log('click footer control....');
    e.preventDefault();
  }

  function addStageHandler(){
    console.log('click add stage control....');
    pointCounter += 1;
    let helperString = `<div class="step-part step-next">
                            <div class="step-part-title">
                              <label for="step-part-title${pointCounter+1}">ETAPE ${pointCounter+1}</label>
                              <input id="step-part-title${pointCounter+1}"/>
                           </div>
                       <div class="step-part-time">
                        <label for="step-part-time${pointCounter+1}">DUREE SER PLACE</label>
                        <select id="step-part-time${pointCounter+1}">
                          <option>2h30</option>
                          <option>6h40</option>
                        </select>
                     </div>
                    </div>`;
    let helperEl = $(helperString);
    console.dir($(helperEl, 'div'));
    helperEl.insertBefore('#box-steps');
    $( `#step-part-time${pointCounter +1}`).selectmenu();
    $(".second-step").show();
  }

  function addTourHandler(){
    console.log('click add tour control....');
  }

  /**
   * Setup handler for trip form elements
   */
  $('#step-switcher').on('click', switcherHandler);
  $('#footer-trip-control').on('click', footerControlHandler);
  $('#add-stage-control').on('click', addStageHandler);
  $('#add-tour-handler').on('click',addTourHandler);

  /**
   * Initialisation form elements
   */
  init();

} );

//--------------------------------------------