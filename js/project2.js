
const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&sparkline=false";
const total = 100;
let dispCoins = [];
let modalArray = [];
let myFilterdChoise = {};
const toggleChoices = {};

//  ALL 100 COINS , Function that takes the Coins from the API and present them in the container..
$(document).ready(async () => {
  try {
    const coinList = await $.get(url);
    for (let counter = 0; counter < total && counter < coinList.length; counter++) {
      const coin = coinList[counter];
      const coinDetailsUrl = `https://api.coingecko.com/api/v3/coins/${coin.id}`;
      const uniqueId = `coin-${coin.id}-details`;
      const $card = $(`
        <div class="card" style="width: 200px">
          <div class="card-body">
            <h4 class="card-title">${coin.symbol}</h4>
            <span class="form-check form-switch">
            <input class="form-check-input pressMeToggle" type="checkbox" role="switch" id="toggleSwtich-${coin.id}">
            </span>
            <p class="card-text">${coin.name}</p>
            <button data-bs-toggle="collapse" class="btn btn-primary" data-bs-target="#${uniqueId}">More Info</button>
            <div id="${uniqueId}" class="collapse">
              <p>Loading...<br/><img src="/Project2/img/loading-ani.gif" style="width: 140px;
              height: 80px;"></p>
            </div>
          </div>
        </div>
      `);
      $("#container").append($card);

      // Add coin data to dispCoins array
      dispCoins.push(coin);
      //   ONCLICK takes you to Home Page
      $('#homepage').on('click', async () => {
      // console.log("Just checking the Navbar Home button") // CHECK
      // $("#container").empty();
      $("#container").append($card);
      });

      $.get(coinDetailsUrl, (data) => {
        const $details = $(`
          <ul style="padding: 10px">
            <li><img src=${data.image.small}/></li>
            <li>USD: ${data.market_data.current_price.usd}$</li>
            <li>EURO: ${data.market_data.current_price.eur}€</li>
            <li>NIS: ${data.market_data.current_price.ils}₪</li>
          </ul>
        `);
        $(`#${uniqueId}`).html($details);
      });
    }
  } catch (err) {
    // console.error(err);
    $("#container").html(`<div class="err-notice">
    Something went wrong, please try again in a few minutes..
    </div>
    `);
  }


//   ONCLICK FUNCTION FOR SEARCH BUTTON
$('#searchBtn').on('click', async () => {
  filterCoins()
});
});

async function filterCoins() {
  let searchTerm = $('#searchVal').val().toLowerCase();
  let filteredCoins = dispCoins.filter((coin) =>
    coin.id.toLowerCase().includes(searchTerm)
  );

  if (!searchTerm) {
    $('.card').show();
    return;
  }

  $('.card').remove();
  
  if (filteredCoins.length === 0) {
    // Display a message to the user if no coins were found
    const $noResultCard = $(`
      <div class="card" style="width: 200px">
        <div class="card-body">
          <h4 class="card-title">No Coins Found</h4>
          <p class="card-text">Please try another search term.</p>
        </div>
      </div>
    `);
    $('#container').append($noResultCard);
  }
  else {
    for (let counter = 0; counter < filteredCoins.length; counter++) {
      const coin = filteredCoins[counter];
      const uniqueId = `coin-${coin.id}-details`;
      const $searchedCard = $(`
        <div class="card" style="width: 200px">
          <div class="card-body">
            <h4 class="card-title">${coin.symbol}</h4>
            <p class="card-text">${coin.name}</p>
            <button data-bs-toggle="collapse" class="btn btn-primary" data-bs-target="#${uniqueId}">More Info</button>
            <div id="${uniqueId}" class="collapse">
              <p>Loading...<br/><img src="/Project2/img/loading-ani.gif" style="width: 140px; height: 80px;"></p>
            </div>
          </div>
        </div>
      `);
      $('#container').append($searchedCard);

      try {
        const data = await $.get(`https://api.coingecko.com/api/v3/coins/${coin.id}`);
        const filteredResults = $(`
          <ul style="padding: 10px">
            <li><img src=${data.image.small}/></li>
            <li>USD: ${data.market_data.current_price.usd}$</li>
            <li>EURO: ${data.market_data.current_price.eur}€</li>
            <li>NIS: ${data.market_data.current_price.ils}₪</li>
          </ul>
        `);
        $(`#${uniqueId}`).html(filteredResults);
      } catch (error) {
        console.log(`Error fetching data for ${coin.id}`);
      }
    };
  }
};
const handleCheckboxClick = () => {
  // Get all the checked checkboxes
  const checkedCheckboxes = $('input[type=checkbox]:checked');
  
  // If the user has selected 5 checkboxes, show the modal with their selections
  if (checkedCheckboxes.length === 5) {
    // Create an array to hold the user's selections
    const selectedCoins = [];
    
    // Loop through the checked checkboxes and add their corresponding coin data to the selectedCoins array
    checkedCheckboxes.each((index, checkbox) => {
      const coinId = $(checkbox).data('coin-id');
      const coinName = $(checkbox).data('coin-name');
      const coinSymbol = $(checkbox).data('coin-symbol');
      selectedCoins.push({id: coinId, name: coinName, symbol: coinSymbol});
    });
    
    // Create the HTML for the modal content
    let modalContent = `
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Your selections</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Coin ID</th>
              <th scope="col">Coin Name</th>
              <th scope="col">Coin Symbol</th>
            </tr>
          </thead>
          <tbody>`;
          
    selectedCoins.forEach((coin) => {
      modalContent += `
        <tr>
          <td>${coin.id}</td>
          <td>${coin.name}</td>
          <td>${coin.symbol}</td>
        </tr>`;
    });
    
    modalContent += `
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>`;
      
    // Set the modal content and show the modal
    $('.modal-body').html(modalContent);
    $('#exampleModal').modal('show');
  }
};

// Attach the handleCheckboxClick function to the click event of all the toggle switches
$('#myModal').on('click', handleCheckboxClick);

// FUNCTION when user scroll down NAVBAR stays on top
$(document).ready(function(){
  // When the user scrolls the page, execute the function
  $(window).scroll(function() {
    // Check the scroll position of the page
    var scrollPosition = $(this).scrollTop();

    // If the scroll position is greater than or equal to the top of the menuBar
    if (scrollPosition >= $('#menuBar').offset().top) {
      // Add a class to the menuBar to make it fixed to the top
      $('#menuBar').addClass('fixed-top');
    } else {
      // Remove the class from the menuBar if the scroll position is less than the top of the menuBar
      $('#menuBar').removeClass('fixed-top');
    }
  });
});
