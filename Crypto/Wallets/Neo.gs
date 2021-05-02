function NeoGetWallet()
{
  var wallet = []
  
  var query = NeoQuery();
  var balances = JSON.parse(query.getContentText()).balance;
  
  for (i = 0; i < balances.length; i++)
  {
    var item = new WalletItem(balances[i].asset_symbol, +balances[i].amount);
    
    if (item.total > 0)
    {
      wallet.push(item);
    }
  }
  
  return wallet;
}

function NeoQuery()
{  
  var address = "PLACE_YOUR_YOUR_WALLET_ADDRESS_HERE";
  
  var urlBase = "https://api.neoscan.io/api/main_net/v1/get_balance/";
  
  var urlParams = 
      {
        "method": "GET",
        "muteHttpExceptions": true
      };
  
  var urlString = urlBase + address;
  
  return UrlFetchApp.fetch(urlString, urlParams);
}
