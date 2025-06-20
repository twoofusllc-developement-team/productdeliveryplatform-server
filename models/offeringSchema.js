// models/Offering.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offeringSchema = new mongoose.Schema({
  
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: 'Person',
    required: true
  },
  version: {
    type: Number,
    default: 1
  },
  previousVersionId: {
    type: Schema.Types.ObjectId,
    default: null
  },
  type: {
    type: String,
    enum: ['physical', 'bookable', 'event', 'consultation'],
    default: 'physical'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  inventory: {
    type: Number,
    default: 0
  },
  photos: {
    type: [String],
    default: []
  },
  tags: {
    type: [String],
    default: []
  },
  attributes: {
    type: Schema.Types.Mixed
  },
  eventDetails: {
    location: {
      type: String
    },
    capacity: {
      type: Number
    }
  },
  tenantId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('Offering', offeringSchema);
