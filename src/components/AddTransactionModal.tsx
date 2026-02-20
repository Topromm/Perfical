import "../styles/transactions.css";
import { useState } from "react";

type AddTransactionModalProps = {
  onClose: () => void;
  onSave: (entry: {
    title: string;
    amount: number;
    type: string;
    repeat: boolean;
    frequency: string | null;
  }) => void;
};

export default function AddTransactionModal({
  onClose,
  onSave
}: AddTransactionModalProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [repeat, setRepeat] = useState(false);
  const [frequency, setFrequency] = useState("monthly");

  const save = () => {
    if (!title || !amount) return;

    onSave({
      title,
      amount: Number(amount),
      type,
      repeat,
      frequency: repeat ? frequency : null
    });

    onClose();
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-box"
        onClick={e => e.stopPropagation()}
      >

        <h3 className="modal-title">Add Transaction</h3>

        <label className="modal-label">Title</label>
        <input
          className="modal-input"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <label className="modal-label">Amount</label>
        <input
          className="modal-input"
          value={amount}
          onChange={e =>
            /^\d*$/.test(e.target.value) && setAmount(e.target.value)
          }
        />

        <label className="modal-label">Type</label>
        <select
          className="modal-input"
          value={type}
          onChange={e => setType(e.target.value)}
        >
          <option value="income">Income</option>
          <option value="outcome">Outcome</option>
        </select>

        <label className="modal-checkbox">
          <input
            type="checkbox"
            checked={repeat}
            onChange={() => setRepeat(!repeat)}
          />
          Repeats
        </label>

        {repeat && (
          <>
            <label className="modal-label">Frequency</label>
            <select
              className="modal-input"
              value={frequency}
              onChange={e => setFrequency(e.target.value)}
            >
              <option value="annually">Annually</option>
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
              <option value="daily">Daily</option>
            </select>
          </>
        )}

        <div className="modal-buttons">
          <button className="modal-btn cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-btn save" onClick={save}>
            Save
          </button>
        </div>

      </div>
    </div>
  );
}
