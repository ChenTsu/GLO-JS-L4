// Поиск "Дружественных чисел" путём перебора всех чисел заданного диапазона и вычисления суммы их делителей

'use strict';


function getFriendlyNumbers(start, end) {
  if ( isNotNumeric(start) || typeof start === "string" || isNotNumeric(end) || typeof end === "string" ){
    return false;
  }
  if ( start < 1 || start.toString().indexOf('.') > -1 ){
    return false;
  }
  if ( start > end || end.toString().indexOf('.') > -1 ){
    return false;
  }
  
  let res = [];
  let sum1, sum2;
  
  for (let i=start; i<=end; i++){
    for ( let j=i+1; j<=end; j++){
      if (i === j){ continue; }
      
      sum1 = dividersOfNatural(i).reduce( (s,el) => {return s+=el;} );
      sum2 = dividersOfNatural(j).reduce( (s,el) => {return s+=el;} );
      // console.log(i, j, sum1, sum2);
      
      if ( sum1 === j && sum2 === i ){
        // console.log(i, j, sum1, sum2);
        res.push( [i, j] );
      }
    }
  }
  
  return res;
}

function dividersOfNatural(num) {
  if (num === 1){
    return [1];
  }
  let  c, d, res = [];
  
  for (let i=1; i< Math.sqrt(num); i++){
    c = num % i;  // остаток от деления
    d = num / i;  // целая часть
    
    if (c === 0){ // поделили без остатка
      res.push(i);
      if (i !== d && d!== num){
        res.push(d);
      }
    }
  }

  return res;
}

function isNotNumeric(n) {
  return  !( !isNaN(parseInt(n)) && isFinite(n) );
}

if (module.parent){
  module.exports = {
    firstName: 'Yan',
    secondName: 'Vaidakovich',
    task: getFriendlyNumbers
  };
} else {
  let start = 220, end = 300;
  // let start = 220, end = 88730; // до этого значения перебор может занять несколько часов!!! )))
  console.log( getFriendlyNumbers( start, end ) );
  // console.log( dividersOfNatural(end) );
  // console.log( dividersOfNatural(284).reduce( (s,el) => {return s+=el;} ) );
}
