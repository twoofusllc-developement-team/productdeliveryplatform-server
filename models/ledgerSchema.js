const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ledgerSchema = new Schema({
    tenanId: {
        type: Schema.Types.ObjectId,
        required: true,

    },
    sellerId: {
        type: Schema.Types.ObjectId,
        ref: 'Person',
        required: true,

    },
    orderId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    paymentId: {
        type: Schema.Types.ObjectId,
        required:true,
    },
    type: {
        type:String,
        enum: ['platform_fee','seller_payout', 'refund', 'commission'],

    },
    amount: {
        type: Number,
        default: null
    },
    currency: {
        type: String,

    },
    status: {
        type: String,
        enum: ['pending', 'settled', 'failed'],
        default: 'pending',
    },
    processedAt: {
        type: Date,

    },
    createdAt: {
        type: Date,
        default: Date.mow,
    }

},
{timestamps: true,}
);
module.exports = mongoose.model('Ledger', ledgerSchema);