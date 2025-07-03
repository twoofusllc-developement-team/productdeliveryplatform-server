const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    buyerId: {
        type: Schema.Types.ObjectId,
        ref: "Person",
        required: true
    },
    sellerId: {
        type: Schema.Types.ObjectId,
        ref: "Person",
        required: true
    },
    items: [{
        offeringId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,

        },
        unitPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        slotId: {
            type: Schema.Types.ObjectId,
            ref: "BookingSlot",

        }

    }],
    appliedDiscountId: {
        type: Schema.Types.ObjectId,
        ref: "Discount",
        default: null
    },
    discountAmount: {
        type: Number,
        default: 0,
    },
    subtotal: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending','paid','shipped','completed','cancelled'],
        default: 'pending'
    },
    shippingAddress: {
        type: String,
    },
    paymentId: {
        type: Schema.Types.ObjectId,
        ref: "Payment",
        default: null,
    },
    orderedAt: {
        type: Date,
        default: Date.now,
    },
    tenanId: {
        type: Schema.Types.ObjectId,
        required: true,

    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
        default: null,
    },


},
{timestamps: true}
);
module.exports = mongoose.model('Order', orderSchema);