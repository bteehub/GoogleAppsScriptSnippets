function BitpandaGetWallet()
{
  var wallet = []
  
  // wallets
  var bitpandaQuery = JSON.parse(BitpandaQuery("/wallets"));
  bitpandaQuery = bitpandaQuery.data;  
  
  for (i = 0; i < bitpandaQuery.length; i++)
  {    
    var item = new WalletItem(bitpandaQuery[i].attributes.cryptocoin_symbol, +bitpandaQuery[i].attributes.balance);
    
    if (item.total > 0)
    {
      wallet.push(item);
    }
  }
  
  // fiat wallets
  bitpandaQuery = JSON.parse(BitpandaQuery("/fiatwallets"));
  bitpandaQuery = bitpandaQuery.data;  
  
  for (i = 0; i < bitpandaQuery.length; i++)
  {    
    var item = new WalletItem(bitpandaQuery[i].attributes.fiat_symbol, +bitpandaQuery[i].attributes.balance);
    
    if (item.total > 0)
    {
      wallet.push(item);
    }
  }
  
  // exchange wallet
  bitpandaQuery = JSON.parse(BitpandaExchangeQuery("/account/balances"));
  bitpandaQuery = bitpandaQuery.balances;  
  
  for (i = 0; i < bitpandaQuery.length; i++)
  {    
    var item = new WalletItem(bitpandaQuery[i].currency_code, +bitpandaQuery[i].available + +bitpandaQuery[i].locked);
    
    if (item.total > 0)
    {
      wallet.push(item);
    }
  }
  
  return wallet;
}

function BitpandaQuery(queryString)
{
  var apiKey = "PLACE_YOUR_API_KEY_HERE";
  
  var urlBase = "https://api.bitpanda.com/v1";
  
  var urlParams = 
      {
        "method": "GET",
        "headers": 
        {
          "X-API-KEY": apiKey
        },
        "muteHttpExceptions": true
      };
  
  var urlString = urlBase + queryString;
  
  return UrlFetchApp.fetch(urlString, urlParams);
}

function BitpandaExchangeQuery(queryString)
{  
  var apiKey = "PLACE_YOUR_API_KEY_HERE";
  
  var urlBase = "https://api.exchange.bitpanda.com/public/v1";
  
  var urlParams = 
      {
        "method": "GET",
        "headers": 
        {
          "Authorization": "Bearer " + apiKey
        },
        "muteHttpExceptions": true
      };
  
  var urlString = urlBase + queryString;
  
  return UrlFetchApp.fetch(urlString, urlParams);
}
