function KucoinGetWallet()
{
  var wallet = []
  
  var kucoinQuery = KucoinQuery("/api/v1/accounts", "", "");
  var kucoinQuery = JSON.parse(kucoinQuery.getContentText());
  var kucoinQuery = kucoinQuery.data;
  
  for (i = 0; i < kucoinQuery.length; i++)
  {
    var item = new WalletItem(kucoinQuery[i].currency, +kucoinQuery[i].balance);
    
    if (item.total > 0)
    {
      wallet.push(item);
    }
  }
  
  return wallet;
}

function KucoinQuery(endpoint, query, body)
{
  var apiKey = "PLACE_YOUR_API_KEY_HERE";
  var apiSecret = "PLACE_YOUR_API_SECRET_HERE";
  var apiPassphrase = "PLACE_YOUR_API_PASSPHRASE_HERE";
  
  var urlBase = "https://api.kucoin.com";  

  var nonce = Number(Date.now()).toFixed(0);
  
  var urlString = urlBase + endpoint + query;
  
  var urlSignature = nonce + "GET" + endpoint + body;  
  var signature = Utilities.base64Encode(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, urlSignature, apiSecret));
  
  var urlParams = 
      {
        'headers' : 
        {
          'KC-API-KEY': apiKey,
          'KC-API-SIGN': signature,
          'KC-API-TIMESTAMP': nonce,
          'KC-API-PASSPHRASE': apiPassphrase
        }
      }
  
  return UrlFetchApp.fetch(urlString, urlParams);
}
