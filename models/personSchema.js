const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const auditFields = {
    tenantId: {
        type: Schema.Types.ObjectId,
        required: true
      },
      isDeleted: {
        type: Boolean,
        default: false
      },
      deletedAt: {
        type: Date
      },
};

const personSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  roles: {
    type: String,
    enum: ['buyer', 'seller', 'admin', 'expert'],
  },
  profile: {
    fullName: String,
    phone: String,
    profilePhoto: String,
    bio: String,
    location: String,
    geo: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        index: '2dsphere'
      }
    }
  },
  sellerProfile: {
    shopName: String,
    shopDescription: String,
    shopBanner: String,
    socialLinks: [{
        type: {
            type: String,
            enum: ['facebook', 'instagram', 'twitter','tiktok','youtube', 'linkedin', 'other']
        },
        link: String
    }],
    shippingPolicy: String,
    deliverySettings: String,
  },
  buyerProfile: {
    wishlist: [{
      type: Schema.Types.ObjectId,
      ref: 'Offering'
    }],
    followingSellers: [{
      type: Schema.Types.ObjectId,
      ref: 'Person'
    }],
    supportTickets: [{
      type: Schema.Types.ObjectId,
      ref: 'SupportTicket'
    }],
  },
  expertProfile: {
    expertise: [String],
    availability: [{
      dayOfWeek: Number,
      startTime: String,
      endTime: String,
    }]
  },
  settings: {
    language: String,
    notificationsEnabled: Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
 
}, { timestamps: true });

module.exports = mongoose.model('Person', personSchema);

