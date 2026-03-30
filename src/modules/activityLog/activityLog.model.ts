import { Schema, model, Document } from 'mongoose';

export interface IActivityLog extends Document {
  action: string;
  createdAt: Date;
  updatedAt: Date;
}

const ActivityLogSchema = new Schema<IActivityLog>(
  {
    action: { type: String, required: true },
  },
  { timestamps: true }
);

export const ActivityLog = model<IActivityLog>('ActivityLog', ActivityLogSchema);
