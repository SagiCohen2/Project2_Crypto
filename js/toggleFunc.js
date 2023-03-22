
//FUNCTION checkBoxCheck ADDING AND REMOVING CHECKED COINS TO modalArray ARRAY
const checkBoxCheck = (event) => {
    let checkBoxId = event.target.id;
    let checkBoxIndex = checkBoxId.split('-')[1]
    if ($('#' + checkBoxId).is(':checked')) {
      if (modalArray.length < 6) {
        modalArray.push(checkBoxIndex)
      }
    } else {
      let arrIndex = modalArray.indexOf(checkBoxIndex)
      modalArray.splice(arrIndex, 1)
    }
    // modalArray.push(checkBoxIndex)
    checkBoxCont()
    // console.log(modalArray)
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
          <li>First Coin: ${modalArray[0]}</li>
          <li>Second Coin: ${modalArray[1]}</li>
          <li>Third Coin: ${modalArray[2]}</li>
          <li>Fourth Coin: ${modalArray[3]}</li>
          <li>Fifth Coin: ${modalArray[4]}</li>
        </ul>
      </div>
      <div class="col-6">
        <h5>The Extra Coin</h5>
        <ul>
        <li>Sixth Coin: ${modalArray[5]}</li>
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
    for (let i = 0; i < modalArray.length - 1; i++) {
      const option = $('<option>')
        .val(modalArray[i].name)
        .text(modalArray[i].name)
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
    for (let coin of modalArray) {
      if (coin.name === $('.replaceCoin').val()) {
        modalArray.splice(modalArray.indexOf(coin), 1)
        break
      }
    }
  }