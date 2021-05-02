/*
  Clean up wallet by:
  - Removing empty symbols
  - Removing zero balances
  - Merging symbols by adding up totals
*/
function WalletClean(wallet)
{
  // Get distinct symbols
  var symbols = []
  
  for(var i = 0; i < wallet.length; i++)
  {
    if (wallet[i].symbol != "")
    {
      symbols.push(wallet[i].symbol);
    }  
  }
  
  var symbols = symbols.filter(FilterDistinctValues);
  
  // Parse distinct symbols and sum up totals
  var cleanWallet = []
  
  for(var i = 0; i < symbols.length; i++)
  {
    var item = new WalletItem(symbols[i], 0);
    
    for(var j = 0; j < wallet.length; j++)
    {
      if (symbols[i].toUpperCase() == wallet[j].symbol.toUpperCase())
      {
        item.total += wallet[j].total;
      }
    }
    
    // Add to result if not zero balance
    if (item.total > 0)
    {
        cleanWallet.push(item);
    }
  }
  
  // Sort wallet by symbol
  cleanWallet.sort(WalletCompare); 
  
  return cleanWallet;
}

/*
  Compare wallet by symbol
*/
function WalletCompare(a, b) 
{
  if (a.symbol < b.symbol) { return -1; }
  if (a.symbol > b.symbol) { return 1; }
  return 0;
}

/*
  Simple wallet class
*/
class WalletItem
{
  constructor(symbol, total) 
  {    
    this.symbol = symbol;
    this.total = total;
  }  
}
