import AddTransactionModal from "../components/AddTransactionModal";
import SharedLayout from "../components/SharedLayout";
import "../styles/transactions.css";
import { useState } from "react";

export default function TransactionsPage() {
  const [showModal, setShowModal] = useState(false);

  // Temp dummy data
  const [transactions, setTransactions] = useState([
    { id: 1, title: "Salary", amount: 2500, type: "income"},
    { id: 2, title: "Groceries", amount: 120, type: "outcome"},
    { id: 3, title: "Electric Bill", amount: 60, type: "outcome"},
  ]);

  const addTransaction = (entry: any) => {
    setTransactions(prev => [...prev, { id: Date.now(), ...entry }]);
  };

  return (
    <SharedLayout currentPage="transactions">
      <div className="transactions-container">

        <div className="transactions-header">
          <h2 className="transactions-title">Transactions</h2>
          <button className="add-transaction-btn" onClick={() => setShowModal(true)}>
            + Add Entry
          </button>
        </div>

        <div className="transactions-list">
          {transactions.map(t => (
            <div
              key={t.id}
              className={`transaction-item ${t.type === "income" ? "income" : "outcome"}`}
            >
              <span className="transaction-title">{t.title}</span>
              <span className="transaction-amount">
                {t.type === "income" ? "+" : "-"}{t.amount}
              </span>
            </div>
          ))}
        </div>

        {showModal && (
          <AddTransactionModal
            onClose={() => setShowModal(false)}
            onSave={addTransaction}
          />
        )}

      </div>
    </SharedLayout>
  );
}
