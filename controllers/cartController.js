const mongoose = require('mongoose');
const Cart = require('../models/cartSchema');
const Offering = require('../models/offeringSchema');
const Person = require('../models/personSchema');

const { successResponse, failedResponse } = require('../utils/responseHelpers'); 

exports.addItemToCart = async (req, res) => {
  try {
    const user = req.user;

    if (!user.roles.includes('buyer')) {
      return failedResponse(403, "Only buyers can add items to cart.", res);
    }

    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return failedResponse(400, "Invalid input data. Please provide at least one item.", res);
    }

    const validatedItems = [];
    let subtotal = 0;
    const currencySet = new Set();

    for (const item of items) {
      const { tenantId, offeringId, quantity, slotId } = item;

      if (!offeringId || !quantity || quantity < 1) {
        return failedResponse(400, "Invalid offeringId or quantity.", res);
      }

      const offering = await Offering.findOne({ _id: offeringId, isDeleted: false });

      if (!offering) {
        return failedResponse(404, "Offering not found or unavailable.", res);
      }

 
      if (offering.type === 'physical' && offering.inventory < quantity) {
        return failedResponse(409, 'Not enough stock for offering ${offering.title}.', res);
      }

 
      if ((offering.type === 'bookable' || offering.type === 'event') && !slotId) {
       return failedResponse(422, "SlotId is required for bookable offerings.", res);
     }

      validatedItems.push({
        offeringId,
        tenantId,
        quantity,
        slotId: slotId || null
      });

      subtotal += offering.price * quantity;
      currencySet.add(offering.currency);
    }


    if (currencySet.size > 1) {
      return failedResponse(422, "All items must use the same currency.", res);
    }

    const currency = Array.from(currencySet)[0];

  
    const total = subtotal;

    let cart = await Cart.findOne({
      buyerId: user._id,
      isDeleted: false
    });

    if (cart) {
  
      for (const newItem of validatedItems) {
        const existingItem = cart.items.find(i => i.offeringId.toString() === newItem.offeringId.toString());
        if (existingItem) {
          existingItem.quantity += newItem.quantity;
        } else {
          cart.items.push(newItem);
        }
      }
      cart.updatedAt = Date.now();
      await cart.save();
    } else {
      cart = await Cart.create({
        buyerId: user._id,
        items: validatedItems,
        tenantId: user.tenantId, 
        isDeleted: false
      });
    }

    return successResponse({
      cart: {
        cartId: cart._id,
        buyerId: cart.buyerId,
        items: cart.items,
        summary: {
          subtotal,
          total,
          currency,
          itemCount: cart.items.reduce((sum, i) => sum + i.quantity, 0)
        },
        updatedAt: cart.updatedAt,
        tenantId: cart.tenantId,
        isDeleted: cart.isDeleted
      }
    }, 201, "Items added to cart successfully.", res);

  } catch (err) {
    console.error('Error adding items to cart:', err);
    return failedResponse(500, "Unexpected server error.", res);
  }
};