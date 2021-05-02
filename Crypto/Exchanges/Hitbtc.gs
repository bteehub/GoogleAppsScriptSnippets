function HitbtcGetWallet()
{
  var wallet = []
  
  var hitbtcQuery = JSON.parse(HitbtcQuery("/account/balance"));
  
  for (i = 0; i < hitbtcQuery.length; i++)
  {
    var item = new WalletItem(hitbtcQuery[i].currency, +hitbtcQuery[i].available + +hitbtcQuery[i].reserved)
    
    if (item.total > 0)
    {
      wallet.push(item);
    }
  }
  
  var hitbtcQuery = JSON.parse(HitbtcQuery("/trading/balance"));
  
  for (i = 0; i < hitbtcQuery.length; i++)
  {
    var item = new WalletItem(hitbtcQuery[i].currency, +hitbtcQuery[i].available + +hitbtcQuery[i].reserved);
    
    if (item.total > 0)
    {       
      wallet.push(item);
    }
  }
  
  return wallet;
}

function HitbtcQuery(methodQuery)
{  
  var apiKey = "PLACE_YOUR_API_KEY_HERE";
  var apiSecret = "PLACE_YOUR_API_SECRET_HERE";
  
  var urlBase = "https://api.hitbtc.com/api/2"
  var urlString = urlBase + methodQuery;
  
  var authParams = {
    "method" : "GET",
    "headers" :
    {
      "Authorization" : "Basic " + Utilities.base64Encode(apiKey + ':' + apiSecret)
    }
  };
  
  return UrlFetchApp.fetch(urlString, authParams);
}
