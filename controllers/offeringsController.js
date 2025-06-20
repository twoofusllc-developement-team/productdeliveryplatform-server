const Offering = require('../models/Offering');

const allowedTypesByRole = {
  buyer: ['bookable'],
  seller: ['physical'],
  expert: ['event', 'consultation']
};

exports.createOffering = async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      category,
      price,
      currency,
      inventory,
      photos,
      tags,
      attributes,
      eventDetails,
      tenantId
    } = req.body;

    const user = req.user;

    
    if (!title || !description || !type || !price || !currency || !tenantId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

   
    const allowedTypes = allowedTypesByRole[user.role];
    if (!allowedTypes || !allowedTypes.includes(type)) {
      return res.status(403).json({
        error: `Role '${user.role}' is not allowed to create offering of type '${type}'`
      });
    }

   
    const offering = new Offering({
      sellerId: user._id,
      type,
      title,
      description,
      category,
      price,
      currency,
      inventory,
      photos,
      tags,
      attributes,
      eventDetails,
      tenantId
    });

    await offering.save();

    res.status(201).json({ message: 'Offering created', offering });

  } catch (err) {
    console.error('Error in createOffering:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.getOfferings = async (req, res) => {
    try {
      const user = req.user;
      const allowedTypes = allowedTypesByRole[user.role];
  
      if (!allowedTypes) {
        return res.status(403).json({ error: 'Unauthorized role' });
      }
  
      const { type } = req.query;
  
      const query = { isDeleted: false };
  
      if (type) {
        if (!allowedTypes.includes(type)) {
          return res.status(403).json({
            error: `Role '${user.role}' is not allowed to view offerings of type '${type}'`
          });
        }
        query.type = type;
      } else {
        query.type = { $in: allowedTypes };
      }
  
      const offerings = await Offering.find(query).sort({ createdAt: -1 });
      res.status(200).json(offerings);
  
    } catch (err) {
      console.error('Error in getOfferings:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  