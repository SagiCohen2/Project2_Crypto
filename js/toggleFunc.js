
//FUNCTION checkBoxCheck ADDING AND REMOVING CHECKED COINS TO toggleChoices ARRAY
const checkBoxCheck = (event) => {
    let checkBoxId = event.target.id;
    let checkBoxIndex = checkBoxId.split('-')[1]
    if ($('#' + checkBoxId).is(':checked')) {
      if (toggleChoices.length < 6) {
        toggleChoices.push(dispCoins[checkBoxIndex])
      }
    } else {
      let arrIndex = toggleChoices.indexOf(dispCoins[checkBoxIndex])
      toggleChoices.splice(arrIndex, 1)
    }
    checkBoxCont()
    console.log(checkBoxIndex);
    // // add coins to live Reports chart
    // getCoinsPriceChart()
  }
  
  // FUNCTION checkBoxCont ADD ALL SELECTED COINS TO ARRAY AND INJECT TO MODAL(SHOW MODAL AFTER 6 COINS SELECTED)
  const checkBoxCont = () => {
    let howMuch = $('.form-check-input').filter(':checked').length
    if (howMuch >= 6) {
      $('.modal-body').html(`
      <div class="row">
      <div class="col-6">
        <h5>Live Report Coins</h5>
        <ul>
          <li>First Coin: ${dispCoins[0].name}</li>
          <li>Second Coin: ${dispCoins[1].name}</li>
          <li>Third Coin: ${dispCoins[2].name}</li>
          <li>Fourth Coin: ${dispCoins[3].name}</li>
          <li>Fifth Coin: ${dispCoins[4].name}</li>
        </ul>
      </div>
      <div class="col-6">
        <h5>The Extra Coin</h5>
        <ul>
        <li>Sixth Coin: ${dispCoins[5].name}</li>
        </ul>
      </div>
    </div>
      `)
      $('#coinsModal').modal('show')
    }
  }
  
  // FUNCTION modalCollapse ADDING OPTION TO CHANGE COINS IN MODAL
  const modalCollapse = () => {
    // REMOVE ALL OPTIONS INSTEAD OF FIRST
    $('.replaceCoin option:not(:first-child)').remove()
    //  MAKE FIRST OPTION SELECTED
    $('.replaceCoin').val($('.replaceCoin option:first').val())
    // LOOP SELECTED COINS AND APPEND OPTIONS TO SELECT
    for (let i = 0; i < toggleChoices.length - 1; i++) {
      const option = $('<option>')
        .val(toggleChoices[i].name)
        .text(toggleChoices[i].name)
      $('.replaceCoin').append(option)
    }
  }
  
  // FUNCTION changeCoin FOR CHANGING THE COINS IN LIVE REPORT
  const changeCoin = () => {
    // CLOSE THE COLLAPSE
    $('#coinsCollapse').collapse('hide')
    // CLOSE THE MODAL
    $('#coinsModal').modal('hide')
    let checkBoxClass = '.checkbox-' + $('.replaceCoin').val()
    // Find checkbox with the specified class and uncheck
    $(checkBoxClass + ':checkbox').prop('checked', false)
    // REMOVE FROM ARRAY THE SELECTED COIN TO REMOVE
    for (let coin of toggleChoices) {
      if (coin.name === $('.replaceCoin').val()) {
        toggleChoices.splice(toggleChoices.indexOf(coin), 1)
        break
      }
    }
  }