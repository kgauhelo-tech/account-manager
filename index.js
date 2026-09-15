import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { log, time } from "node:console";

// const rl = readline.createInterface({ input, output });

// // Ask the user a question
// const name = await rl.question("What is your name? ");
// console.log(`Hello, ${name}!`);

// // Always close the interface when done
// rl.close();

//Creating the class
class BankAccount {
  constructor(username) {
    this.username = username;
    this._accountBalance = 0.0;
    this.accountNumber = generateAccountNumber();
    this.lastWithdrawalRequestTime;
  }

  //done
  get accountBalance() {
    return this._accountBalance;
  }

  //done
  set accountBalance(amount) {
    this._accountBalance += amount;
  }

  //done
  deposit(targetAmount) {
    if (targetAmount < 0) {
      return console.log(
        `\nThis amount can't be deposited \nAccount balance remains ${this._accountBalance}`,
      );
    } else {
      this.accountBalance = targetAmount;
      return console.log(
        `\nOperation Successful. \nNew Balance is: ${this._accountBalance}`,
      );
    }
  }

  //done
  transfer(transferAmount, targetUser) {
    if (transferAmount > 0 && transferAmount <= this.accountBalance) {
      transferFunds(targetUser, transferAmount);
      transferAmount = this.accountBalance = -transferAmount;
      return console.log(
        `\nTransfer successful. \nNew Account Balance: ${this.accountBalance}`,
      );
    } else {
      return console.log(`\nTransfer unsuccessful.`);
    }
  }

  withdraw(requestAmount) {
    if (requestAmount <= 0 && requestAmount !== 0) {
      this.accountBalance = -requestAmount;
      lastWithdrawalRequestTime = time;
      return console.log(
        `\nWithdrawal successful.\nNew Balance is: ${this.accountBalance}`,
      );
    } else {
      return console.log(
        `\nWithdrawal unsuccessful \nBalance remains ${this.accountBalance}`,
      );
    }
  }
}

// Helper functions to create a random account number
function generateAccountNumber() {
  return Math.floor(Math.random() * (99999 - 10001 + 1)) + 10001;
}

function transferFunds(user, amount) {
  bankUsers.filter((account) => account.username === user);
  return user.deposit(amount);
}
//Storage for bank accounts
const bankUsers = [];

//create 2 users Alice and Bob
const userBob = new BankAccount("Bob");
const userAlice = new BankAccount("Alice");

bankUsers.push({
  holder: userBob.username,
  accountNumber: userBob.accountNumber,
});
bankUsers.push({
  holder: userAlice.username,
  accountNumber: userAlice.accountNumber,
});

// displaying account details

// Bob's details
console.log(`The account holder is: ${userBob.username}`);
console.log(`The account number is: ${userBob.accountNumber}`);
console.log(`The account balance is: ${userBob.accountBalance}`);

userBob.deposit(1000);

// Alice's details
// console.log();
// console.log(`The account holder is: ${userAlice.username}`);
// console.log(`The account number is: ${userAlice.accountNumber}`);
// console.log(`The account balance is: ${userAlice.accountBalance}`);

// userBob.transfer(500, userAlice);

// console.log(userAlice.accountBalance);
// console.log(userBob.accountBalance);
