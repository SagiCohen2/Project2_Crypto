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
            <input class="form-check-input checkbox-${coin.name}" type="checkbox" role="switch" id="toggleSwtich-${coin.id}">
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

$('#container').on('click', 'input[type="checkbox"]', function (event) {
    checkBoxCheck(event)
  });
  

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