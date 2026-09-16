// I will convert my code from JS to TS

// declaring a class
class BankAccount {
  private username: string;
  private accountBalance: number;
  private accountNumber: number;
  private lastWithdrawalRequestTime: number;
  private averageTransaction: number[];

  constructor(name: string) {
    this.username = name;
    this.accountBalance = 0;
    this.lastWithdrawalRequestTime = 0;
    this.averageTransaction = [];
    this.accountNumber =
      Math.floor(Math.random() * (99999 - 10001 + 1)) + 10001;
  }

  //   return the username
  public getUsername(): string {
    return this.username;
  }

  //   returns the balance
  public getAccountBalance(): number {
    return this.accountBalance;
  }

  // sets the account balance
  private setAccountBalance(amount: number): number {
    return (this.accountBalance += amount);
  }

  public deposit(amount: number): string {
    if (amount < 0) {
      return `\nThis amount can't be deposited \nAccount balance remains ${this.accountBalance}`;
    } else {
      this.accountBalance = amount;
      return `\nOperation Successful. \nNew Balance is: ${this.accountBalance}`;
    }
  }

  public withdraw(requestAmount: number): string {
    const now = new Date();
    //The last condition works but I don't really get why it works.
    // I struggled with it a lot
    if (
      requestAmount !== 0 &&
      requestAmount <= this.accountBalance &&
      Number(now) > this.lastWithdrawalRequestTime + 10
    ) {
      this.accountBalance = -requestAmount;
      this.lastWithdrawalRequestTime = Number(now);
      return `\nWithdrawal successful.\nNew Balance is: ${this.accountBalance}`;
    } else {
      return `\nWithdrawal unsuccessful \nBalance remains ${this.accountBalance}`;
    }
  }

  public transfer(transferAmount: number, targetUser: BankAccount): string {
    let averageTransaction =
      this.averageTransaction.reduce((acc, value) => acc + value, 0) / 2;
    let isAboveAverageTransaction: boolean =
      transferAmount > averageTransaction * 5;

    // We take 5 transactions to create the base line
    if (isAboveAverageTransaction && this.averageTransaction.length > 3) {
      return `\nTransfer unsuccessful.\nThis might be a scam`;
    } else {
      if (transferAmount > 0 && transferAmount <= this.accountBalance) {
        transferFunds(targetUser, transferAmount);
        transferAmount = this.accountBalance = -transferAmount;
        this.averageTransaction.push(transferAmount);
        return `\nTransfer successful. \nNew Account Balance: ${this.accountBalance}`;
      } else {
        return `\nTransfer unsuccessful.`;
      }
    }
  }
}

const bankUsersList: Array<any> = [];

function transferFunds(user: BankAccount, amount: number) {
  bankUsersList.filter((account) => account.username === user);
  return user.deposit(amount);
}

const userBob: BankAccount = new BankAccount("Bob");
const userAlice: BankAccount = new BankAccount("Alice");

bankUsersList.push({
  holder: userBob.username,
  accountNumber: userBob.accountNumber,
});
bankUsersList.push({
  holder: userAlice.username,
  accountNumber: userAlice.accountNumber,
});

// Bob's details
console.log(`The account holder is: ${userBob.username}`);
console.log(`The account number is: ${userBob.accountNumber}`);
console.log(`The account balance is: ${userBob.accountBalance}`);

// Alice's details
console.log();
console.log(`The account holder is: ${userAlice.username}`);
console.log(`The account number is: ${userAlice.accountNumber}`);
console.log(`The account balance is: ${userAlice.accountBalance}`);

//Bob's deposit
userBob.deposit(1000);

//testing withdrawal and testing the time condition
userBob.withdraw(100);
userBob.withdraw(100);

userBob.transfer(500, userAlice);

console.log(`\nAccount balance for Alice is:  ${userAlice.accountBalance}`);
console.log(`\nAccount balance for Bob is: ${userBob.accountBalance}`);
