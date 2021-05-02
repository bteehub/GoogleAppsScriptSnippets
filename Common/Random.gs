/*
  Randomize array order
*/
function RandomizeArrayOrder(array) 
{  
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex > 0)
  {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;  
}

/*
  Get random number from range
*/
function GetRandomNumber(min, max) 
{
  min = Math.ceil(min);
  max = Math.floor(max);
  
  return Math.floor(Math.random() * (max - min + 1) + min); 
}