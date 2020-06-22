import Transaction from '../models/Transaction';
import CreateTransactionService from '../services/CreateTransactionService';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome'
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    const inicialValue = 0;

    const income = this.transactions.reduce(
      (acumulador, valorAtual) =>
        valorAtual.type === 'income'
          ? acumulador + valorAtual.value
          : acumulador + 0,
      inicialValue,
    );

    const outcome = this.transactions.reduce(
      (acumulador, valorAtual) =>
        valorAtual.type === 'outcome'
          ? acumulador + valorAtual.value
          : acumulador + 0,
      inicialValue,
    );

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({title, value, type}: CreateTransactionDTO) : Transaction {

      const transaction = new Transaction({title, value, type});

      this.transactions.push(transaction);

      return transaction;
  }
}

export default TransactionsRepository;
