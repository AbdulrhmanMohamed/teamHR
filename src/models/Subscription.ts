import mongoose, { Schema, model, ObjectId } from "mongoose";

export interface SubscriptionI{
    startDate: Date,
    endDate: Date,
    isExpired: boolean,
    subscriber: ObjectId,
    package: ObjectId,
}

const SubscriptionSchema = new Schema<SubscriptionI>({
    startDate: Date,
    endDate: Date,
    isExpired: Boolean,
    subscriber: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    package: {
        type: mongoose.Types.ObjectId,
        ref: 'Package'
    }
});


const Subscription = model<SubscriptionI>('Subscription', SubscriptionSchema);
export default Subscription;