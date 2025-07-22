const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSlotSchema = new mongoose.Schema({
    offeringId: {
    type: Schema.Types.ObjectId,
    ref: 'Offering',
},
    startTime: {
        type: Date,
        default: Date.now,
    },
    endTime: {
        type: Date,
        default: Date.now,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,

    },
    bookedCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    tenantId: {
        type: Schema.Types.ObjectId,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
    
    },


},
{timestamps: true}
);
module.exports = mongoose.model('BookingSlot', bookingSlotSchema);