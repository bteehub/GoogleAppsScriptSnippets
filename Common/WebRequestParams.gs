/*
  Create web request parameters string
*/
function WebRequestParamsCreateString(params)
{
  var paramsString = "";
  
  for(var i = 0; i < params.length; i++)
  {
    paramsString = paramsString + "&" + params[i].key + "=" + params[i].value;
  }  
  
  if (paramsString.indexOf('&') == 0)
  {
    paramsString = paramsString.substring(1, paramsString.length);
  }
  
  return paramsString;
}

/*
  Sort parameters by key
*/
function WebRequestParamsSort(params)
{  
  params.sort(WebRequestParamsCompare);
  
  return params;
}

/*
  Compare params by symbol
*/
function WebRequestParamsCompare(a, b) 
{
  if (a.key < b.key) { return -1; }
  if (a.key > b.key) { return 1; }
  return 0;
}

/*
  Simple web requesst parameters class
*/
class WebRequestParams
{
  constructor(key, value) 
  {    
    this.key = key;
    this.value = value;
  }  
}
