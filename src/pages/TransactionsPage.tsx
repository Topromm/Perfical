import {getTransactions, addTransaction as addTxToDB, updateTransaction, deleteTransaction} from "../backend/db";
import EditTransactionModal from "../components/EditTransactionModal";
import AddTransactionModal from "../components/AddTransactionModal";
import SharedLayout from "../components/SharedLayout";
import { useState, useEffect } from "react";
import { getSettings } from "../backend/db";
import "../styles/transactions.css";


import addIcon from "../assets/images/add.svg";
import removeIcon from "../assets/images/remove.svg";
import editIcon from "../assets/images/edit.svg";

export default function TransactionsPage() {
  const [currency, setCurrency] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editData, setEditData] = useState<any | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
  async function load() {
    const rows = await getTransactions();
    setTransactions(rows);

    const settings = await getSettings();
    if (settings) {
      setCurrency(settings.currency);
    }
  }

  load();
}, []);

  const addTransaction = async (entry: any) => {
    const newEntry = {
      ...entry,
      date: new Date().toISOString(),
    };

    const id = await addTxToDB(newEntry);
    setTransactions(prev => [...prev, { id, ...newEntry }]);
  };

  const saveEdit = async (id: number, updated: any) => {
    await updateTransaction(id, updated);

    setTransactions(prev =>
      prev.map(t => (t.id === id ? { ...t, ...updated } : t))
    );

    setEditData(null);
  };

  const remove = async (id: number) => {
    await deleteTransaction(id);
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  function formatNumber(n: number) {
  return n.toLocaleString("en-US");
}

  return (
    <SharedLayout currentPage="transactions">
      <div className="transactions-container">

        <div className="transactions-header">
          <h2 className="transactions-title">Transactions</h2>
          <button className="add-btn" onClick={() => setShowAddModal(true)}>
            <img src={addIcon} alt="add" className="add-icon"/>
            <span className="add-text">Add Entry</span>
          </button>
        </div>

        <div className="transactions-list">
          {transactions.map(t => (
            <div
              key={t.id}
              className={`transaction-item ${t.type === "income" ? "income" : "outcome"}`}
            >
              <div className="transaction-info">
                <span className="transaction-title">{t.title}</span>
                <span className="transaction-amount">
                  {`${t.type === "income" ? "+ " : "- "}${formatNumber(t.amount)} ${currency}`}
                </span>
              </div>

              <div className="transaction-actions">
                <button
                  className="edit-btn"
                  onClick={() => setEditData(t)}
                >
                  <img src={editIcon} alt="edit" className="edit-icon"/>
                </button>

                <button
                  className="remove-btn"
                  onClick={() => remove(t.id)}
                >
                  <img src={removeIcon} alt="remove" className="remove-icon"/>
                </button>
              </div>
            </div>
          ))}
        </div>

        {showAddModal && (
          <AddTransactionModal
            onClose={() => setShowAddModal(false)}
            onSave={addTransaction}
          />
        )}

        {editData && (
          <EditTransactionModal
            data={editData}
            onClose={() => setEditData(null)}
            onSave={saveEdit}
          />
        )}

      </div>
    </SharedLayout>
  );
}
