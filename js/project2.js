
const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&sparkline=false";
const total = 100;
let dispCoins = [];
let myFilterdChoise = {};


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

function filterCoins() {
  let myFilteredChoice = {};
  let searchTerm = $('#searchVal').val().toLowerCase();
  console.log(searchTerm);
  let filteredCoins = dispCoins.filter((coin) =>
    coin.id.toLowerCase().includes(searchTerm)
  );
  console.log(filteredCoins);

  if (!searchTerm) {
    $('.card').show();
    return;
  }

  for (let counter = 0; counter < dispCoins.length; counter++) {
    // FIND THE COIN SPECIFIC INDEX
    let card = $(`.card:eq(${counter})`);
    // SHOW ALL COINS THAT EQUAL THE SEARCH VALUE ONLY SYMBOL
    if (dispCoins[counter].symbol.toLowerCase() !== searchTerm) {
      card.hide();
    } else {
      card.show();
    }
  }
}