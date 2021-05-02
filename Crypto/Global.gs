/*
  Filter for getting disinct values
*/
function FilterDistinctValues(value, index, self)
{ 
  if (value instanceof Date)
  {
    return self.map(function(e) { return e.getTime() }).indexOf(value.getTime()) === index;
  }
  
  return self.indexOf(value) === index;
}
