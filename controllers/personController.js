const Person = require("../models/personSchema");
const bcrypt = require("bcrypt");

const allowedRoles = ['buyer', 'seller', 'expert', 'admin'];

const roleProfileMap = {
  buyer: 'buyerProfile',
  seller: 'sellerProfile',
  expert: 'expertProfile'
};

function resolveSellerProfile(input = {}) {
  return {
    shopName: input.shopName || 'Default Shop Name',
    shopDescription: input.shopDescription || 'Default shop description',
    shopBanner: input.shopBanner || '',
    shippingPolicy: input.shippingPolicy || '',
    deliverySettings: input.deliverySettings || '',
    socialLinks: Array.isArray(input.socialLinks)
      ? input.socialLinks.map(link => ({
          type: link.type || 'other',
          link: link.link || ''
        }))
      : []
  };
}

function resolveBuyerProfile(input = {}) {
  return {
    wishlist: Array.isArray(input.wishlist) ? input.wishlist : [],
    followingSellers: Array.isArray(input.followingSellers) ? input.followingSellers : [],
    supportTickets: Array.isArray(input.supportTickets) ? input.supportTickets : [],
  };
}

function resolveExpertProfile(input = {}) {
  return {
    expertise: Array.isArray(input.expertise) ? input.expertise : [],
    availability: Array.isArray(input.availability)
      ? input.availability.map(slot => ({
          dayOfWeek: slot.dayOfWeek || 0,
          startTime: slot.startTime || '09:00',
          endTime: slot.endTime || '17:00',
        }))
      : []
  };
}

exports.createPerson = async (req, res) => {
  try {
    const {
  email,
  tenantId,
  password,
  roles,
  profile,
  sellerProfile,
  buyerProfile,
  expertProfile,
  settings
} = req.body;

const fullname = profile?.fullname;
const phone = profile?.phone;

    if (!fullname || !tenantId || !phone || !email || !roles || !password || roles.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const roleArray = Array.isArray(roles) ? roles : [roles];
    const invalidRoles = roleArray.filter(role => !allowedRoles.includes(role));
    if (invalidRoles.length > 0) {
      return res.status(400).json({ error: `Invalid roles: ${invalidRoles.join(', ')}` });
    }

    for (let role of roleArray) {
      const profileKey = roleProfileMap[role];
      if (profileKey && !req.body[profileKey]) {
        return res.status(400).json({ error: `Missing profile data for: ${role}` });
      }
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const normalizedSettings = {
      language: settings?.language || 'en',
      notificationsEnabled: settings?.notificationsEnabled === false ? false : true
    };

    const personPayload = {
      email,
      tenantId,
      roles: roleArray,
      passwordHash,
      profile: {
        fullName: fullname,
        phone,
        bio: profile?.bio || '',
        location: profile?.location || ''
      },
      settings: normalizedSettings,
      createdAt: new Date()
    };

    if (roleArray.includes('seller')) {
      personPayload.sellerProfile = resolveSellerProfile(sellerProfile);
    }
    if (roleArray.includes('buyer')) {
      personPayload.buyerProfile = resolveBuyerProfile(buyerProfile);
    }
    if (roleArray.includes('expert')) {
      personPayload.expertProfile = resolveExpertProfile(expertProfile);
    }

    const person = new Person(personPayload);
    await person.save();

    return res.status(201).json({ message: "Person created successfully." });

  } catch (err) {
    console.error("Create Person Error:", err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};