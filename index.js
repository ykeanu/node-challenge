// -------------- DEPENDENCIES --------------

const moment = require('moment');
const transactions = require('./transactions.json');

// ------------ GLOBAL VARIABLES ------------

const startDate = transactions[0].transaction_date;
const endDate = transactions[transactions.length - 1].transaction_date;

let currentDate = moment(startDate).format('YYYY-MM-DD');
let currentBalance = 574.24;

// ---------------- HELPERS -----------------

// Generates # of days between a range of dates
const calcDiffInDays = (currentDate, previousDate) => {
  const startDate = moment(currentDate, 'YYYY-MM-DD');
  const endDate = moment(previousDate, 'YYYY-MM-DD');
  return endDate.diff(startDate, 'days') * -1;
};

// Generates array of transactions with common days
const filterDate = data =>
  data.filter(element => element.transaction_date === currentDate);

// Calculates total amount of daily transactions
const sumDailyAmount = arr =>
  arr.reduce((acc, item) => (acc += item.amount), 0);

// Loops through every day between a range of dates
const loopDailyTransactions = (startDate, endDate) => {
  const totalDays = calcDiffInDays(startDate, endDate);

  for (let i = 0; i < totalDays + 1; i++) {
    let commonDaysArr = filterDate(transactions);
    let totalDailyAmount = sumDailyAmount(commonDaysArr);

    // Calculates account balance for that day
    currentBalance -= totalDailyAmount;

    console.log('--------------- DAY ' + i + ' ---------------');
    console.log('Date: ' + currentDate);
    console.log('Balance: $ ' + Math.round(currentBalance * 100) / 100);
    console.log('--------------------------------------');

    // Subtracts one day from date, in order to log balance per day
    currentDate = moment(currentDate)
      .subtract(1, 'days')
      .format('YYYY-MM-DD');
  }
};

// -------------- MAIN PROCESS --------------

loopDailyTransactions(startDate, endDate);
