import "../styles/transactions.css";
import { useState } from "react";

type EditTransactionModalProps = {
  data: {
    id: number;
    title: string;
    amount: number;
    type: string;
    repeat: boolean;
    frequency: string | null;
  };
  onClose: () => void;
  onSave: (id: number, updated: any) => void;
};

export default function EditTransactionModal({
  data,
  onClose,
  onSave
}: EditTransactionModalProps) {
  const [title, setTitle] = useState(data.title);
  const [amount, setAmount] = useState(String(data.amount));
  const [type, setType] = useState(data.type);
  const [repeat, setRepeat] = useState(data.repeat);
  const [frequency, setFrequency] = useState(data.frequency || "monthly");

  const save = () => {
    if (!title || !amount) return;

    onSave(data.id, {
      title,
      amount: Number(amount),
      type,
      repeat,
      frequency: repeat ? frequency : null
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <h3 className="modal-title">Edit Transaction</h3>

        <label className="modal-label">Title</label>
        <input
          className="modal-input"
          value={title}
          maxLength={30}
          onChange={e => setTitle(e.target.value)}
        />

        <label className="modal-label">Amount</label>
        <input
          className="modal-input"
          value={amount}
          maxLength={8}
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
