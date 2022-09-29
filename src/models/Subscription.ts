import mongoose, { Schema, model, ObjectId } from "mongoose";
import { PackageI } from "./Packages";

export interface SubscriptionI{
    startDate: Date,
    endDate: Date,
    isExpired: boolean,
    isActive: boolean,
    subscriber: ObjectId,
    package: ObjectId,
    paid_SR: number,
    paid_USD: number
}


const SubscriptionSchema = new Schema<SubscriptionI>({
    startDate: Date,
    endDate: Date,
    subscriber: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    package: {
        type: mongoose.Types.ObjectId,
        ref: 'Package'
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isExpired: {
        type: Boolean, 
        default: false
    },
    paid_SR: Number,
    paid_USD: Number
});

SubscriptionSchema.pre('save', async function (next) {
    const {price_SR, price_USD, duration, sale} = (await this.populate<{package: PackageI}>('package', 'duration')).package;
    this.endDate = new Date(this.startDate.setMonth(this.startDate.getMonth() + duration));
    this.paid_SR = price_SR - sale * price_SR / 100;
    this.paid_USD = price_USD - sale * price_USD / 100;
  });


const Subscription = model<SubscriptionI>('Subscription', SubscriptionSchema);
export default Subscription;