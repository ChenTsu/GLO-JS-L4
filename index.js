'use strict';

let money, time;

function start() {
  let tmp;
  while (1) {
    tmp = parseFloat(prompt('Ваш бюджет на месяц?', ''));
    if (isNaN(tmp)) {
      alert('Please, enter a valid number.');
    } else {
      // money = tmp;
      appData.budget = tmp;
      break;
    }
  }
  
  time = prompt('Введите дату в формате YYYY-MM-DD', new Date().toISOString().slice(0, 10));
}

// start();

let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  income: [],
  savings: false,
  setExpenses: function () {
    let exps1, exps2;
    for (let i = 0; i < 2; i++) {
      exps1 = prompt('Введите обязательную статью расходов в этом месяце', '');
      exps2 = parseFloat(prompt('Во сколько обойдется?', ''));
      
      if ((exps1 !== null && exps1 !== undefined && exps1 !== '') && !isNaN(exps2)) {
        appData.expenses[exps1] = exps2;
      } else {
        i--;
        alert('Повторите ввод, такие данные мне не нравится');
      }
    }
  },
  detectLevel: function () {
    appData.moneyPerDay = (appData.budget / 30);
    
    alert(`Ваш ежедневный бюджет ${appData.moneyPerDay.toFixed(2)}`);
    
    
    if (appData.moneyPerDay < 100) {
      console.log('минимальный уровень достатка');
    } else if (appData.moneyPerDay >= 100 && appData.moneyPerDay < 2000) {
      console.log('средний уровень достатка');
    } else if (appData.moneyPerDay >= 2000) {
      console.log('высокий уровень достатка');
    } else {
      console.log('невозможно вычислить уровень достатка');
    }
  },
  chekSavings: function () {
    let tmp, save;
    if (appData.savings) {
      // пытаем пользователя пока не расколется
      while (isNaN(tmp)) {
        tmp = parseFloat(prompt('Какова сумма ваших накоплений?'));
      }
      save = tmp;
      tmp = null;
      
      while (isNaN(tmp)) {
        tmp = parseFloat(prompt('Под какой процент?'));
      }
      
      appData.monthIncome = save / 100 / 12 * tmp;
      alert(`Доход в месяц с вашего депозита: ${appData.monthIncome}`);
    }
  },
  setOptExpenses: function () {
    appData.optionalExpenses = {};
    
    for (let i = 0; i < 3; i++) {
      let tmp = prompt(`Введите название статьи необязательных расходов ${i + 1}`, '');
      if (tmp === null || tmp === '') {
        i--;
        alert('Пожалуйста введите название');
        continue;
      }
      
      appData.optionalExpenses[i + 1] = tmp;
    }
  },
  chooseIncome: function () {
    let items = '';
    while (items === '' || !isNaN(+items) || items === null) {
      items = prompt('Что принесёт дополнительный доход? (Перечислите через запятую)', 'a   ,   b,   ,   d   ,e');
    }
    items = items.split(',');
      items.forEach((el, i, arr) => {arr[i] = el.trim();});
      appData.income = items;
    
    items = prompt('Может что-то ещё?', '');
      items = items.split(',');
      items.forEach((el, i, arr) => {arr[i] = el.trim();});
      appData.income.concat(items);
    
    appData.income = appData.income.filter(isNotEmptyParam);
    appData.income.sort();
    
    // WARNING! reusing variable
    items = 'Способы доп. заработка: \n';
    appData.income.forEach((el, i) => items += `${i + 1}. ${el} \n`);
    document.write(items.replace(/\n/g, '<br>'));
  }
};

appData.chooseIncome();

console.log('В итоге наша программа включает в себя данные:');
for (let i in appData) {
  console.log(i, appData[i]);
}


//////////////////////////////////////////////////
function isEmptyParam(param) {
  if (param === undefined || param === null) {
    return true;
  }
  if (typeof param === "string" && param.length === 0) {
    return true;
  }
  if (typeof param === "object" && Object.keys(param).length === 0) {
    return true;
  }
  
  return false;
}

function isNotEmptyParam(param) {
  return !isEmptyParam(param);
}
