
import mongoose, { Schema } from 'mongoose';

import { Document, Types } from 'mongoose';
import { planPrices } from '../../config/price';

export interface ITransaction extends Document {
  member_id: Types.ObjectId;  // Reference to the user who made the transaction
  type: 'debit' | 'credit';  // Type of transaction (debit or credit)
  amount: number;  // Transaction amount
  date: Date;  // Date of the transaction
  status: 'pending' | 'completed' | 'failed';  // Transaction status
  description?: string;  // Optional field to describe the transaction
  payment_method?: 'credit_card' | 'debit_card' | 'paypal' | 'bank_transfer' | 'cash';  // Payment method used
  transaction_ref?: string;  // Optional reference ID for the transaction
}




const transactionSchema = new Schema<ITransaction>({
  member_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['debit', 'credit'], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  description: { type: String },
  payment_method: { type: String, enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'cash'] },
  transaction_ref: { type: String }
});

const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);

export default Transaction;


