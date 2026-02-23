import { emitSettingsChanged } from "../utils/events";
import type { Table } from "dexie";
import Dexie from "dexie";

export interface Balance {
  id?: number;
  amount: string;
}

export interface Transaction {
  id?: number;
  title: string;
  amount: number;
  type: string;
  date: string;
}

export interface Settings {
  id?: number;
  name: string;
  currency: string;
  firstDay: string;
  skipSplash: boolean;
}

class PerficalDB extends Dexie {
  settings!: Table<Settings, number>;
  balance!: Table<Balance, number>;
  transactions!: Table<Transaction, number>;

  constructor() {
    super("perfical");

    this.version(1).stores({
      settings: "++id, name, currency, firstDay, skipSplash",
      balance: "++id, amount",
      transactions: "++id, title, amount, type, date"
    });
  }
}

export const db = new PerficalDB();

// ----------------------
// BALANCE HELPERS
// ----------------------

export async function getBalance() {
  const rows = await db.balance.toArray();
  return rows[0] || null;
}

export async function setBalance(amount: string) {
  const rows = await db.balance.toArray();

  if (rows.length === 0) {
    await db.balance.add({ amount });
  } else {
    await db.balance.update(rows[0].id!, { amount });
  }
}

// ----------------------
// TRANSACTIONS HELPERS
// ----------------------

export async function addTransaction(entry: Transaction) {
  return await db.transactions.add(entry);
}

export async function deleteTransaction(id: number) {
  return await db.transactions.delete(id);
}

export async function updateTransaction(id: number, data: Partial<Transaction>) {
  return await db.transactions.update(id, data);
}

// ----------------------
// SETTINGS HELPERS
// ----------------------

export async function initDB() {
  const existing = await db.settings.toArray();
  if (existing.length === 0) {
    await db.settings.add({
      name: "",
      currency: "EUR",
      firstDay: "monday",
      skipSplash: false
    });
  }
}

export async function getSettings() {
  const rows = await db.settings.toArray();
  return rows[0] || null;
}

export async function updateSetting(
  field: keyof Settings,
  value: Settings[keyof Settings]
) {
  const rows = await db.settings.toArray();
  if (rows.length === 0) return;

  const id = rows[0].id!;
  await db.settings.update(id, { [field]: value });

  emitSettingsChanged();
}

export async function getTransactions() {
  return await db.transactions.toArray();
}
