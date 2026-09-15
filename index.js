//Creating the class
class BankAccount {
  constructor(username) {
    this.username = username;
    this._accountBalance = 0.0;
    this.accountNumber = generateAccountNumber();
    this.lastWithdrawalRequestTime = 0;
    this.averageTransaction = [];
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

  transfer(transferAmount, targetUser) {
    let averageTransaction =
      this.averageTransaction.reduce((acc, value) => acc + value, 0) / 2;
    let isAboveAverageTransaction = transferAmount > averageTransaction * 5;

    // We take 5 transactions to create the base line
    if (isAboveAverageTransaction && this.averageTransaction.length > 5) {
      return console.log(`\nTransfer unsuccessful.\nThis might be a scam`);
    } else {
      if (transferAmount > 0 && transferAmount <= this.accountBalance) {
        transferFunds(targetUser, transferAmount);
        transferAmount = this.accountBalance = -transferAmount;
        this.averageTransaction.push(transferAmount);
        return console.log(
          `\nTransfer successful. \nNew Account Balance: ${this.accountBalance}`,
        );
      } else {
        return console.log(`\nTransfer unsuccessful.`);
      }
    }
  }
  // check the time here before
  withdraw(requestAmount) {
    const now = new Date();
    //The last condition works but I don't really get why it works.
    // I struggled with it a lot
    if (
      requestAmount !== 0 &&
      requestAmount <= this.accountBalance &&
      now > this.lastWithdrawalRequestTime + 10
    ) {
      this.accountBalance = -requestAmount;
      this.lastWithdrawalRequestTime = now;
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
console.log();
console.log(`The account holder is: ${userAlice.username}`);
console.log(`The account number is: ${userAlice.accountNumber}`);
console.log(`The account balance is: ${userAlice.accountBalance}`);

//testing withdrawal and testing the time condition
userBob.withdraw(100);
userBob.withdraw(100);

userBob.transfer(500, userAlice);

console.log(`\nAccount balance for Alice is:  ${userAlice.accountBalance}`);
console.log(`\nAccount balance for Bob is: ${userBob.accountBalance}`);
