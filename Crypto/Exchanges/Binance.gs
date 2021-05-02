function BinanceGetWallet()
{
  var wallet = []
  
  var balances = JSON.parse(BinanceQuery("/account", "")).balances;
  
  for (i = 0; i < balances.length; i++)
  {
    var item = new WalletItem(balances[i].asset, +balances[i].free + +balances[i].locked)
    
    if (item.total > 0)
    {
      wallet.push(item);
    }
  }
  
  return wallet;
}

function BinanceQuery(endpoint, params)
{  
  var apiKey = "PLACE_YOUR_API_KEY_HERE";
  var apiSecret = "PLACE_YOUR_API_SECRET_HERE";
  
  var urlBase = "https://www.binance.com/api/v3";
  var nonce = Number(Date.now()).toFixed(0);
  
  params = params + "&timestamp=" + nonce;
  if (params.indexOf('&') == 0)
  {
    params = params.substring(1, params.length);
  }
    
  var hmacSignature = Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, params, apiSecret).map(function(v){return (v+256).toString(16).slice(-2)}).join('');
  params = params + "&signature=" + hmacSignature;
  
  var urlParams = 
      {
        "method": "GET",
        "headers": 
        {
          "X-MBX-APIKEY": apiKey
        },
        "muteHttpExceptions": true
      };
  var urlString = urlBase + endpoint + "?" + params;
  
  return UrlFetchApp.fetch(urlString, urlParams);
}
