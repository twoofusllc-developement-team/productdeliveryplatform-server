const Person = require("../models/personModel");
const allowedRoles = ['buyer', 'seller', 'expert', 'admin' ];
// to ma esure nothing reaches database before we are validating at the level of the code 
// i do a mapping then if hes a buyer then we are using the buyerprofile and so on 
const roleProfileMap= {buyer: 'buyerProfile', seller: 'sellerProfile', expert: 'expertProfile' };
// we are using them to make sure eno kel whde mn hal roles is mapped to its true profile

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
      
exports.createPerson = async(req,res) => {
    //will start by handling common things like the propeties and one of the roles
    //Im taking all these because at the level of backend I dont know what Im being sent 

    try{
     const {fullName, phone, email, password, roles, profile, settings, sellerProfile, buyerProfile, expertProfile} = req.body;
     //I have allowed roles that I should take into consideration to check what are the allowe droles and to see if I accept or reject based on the roles 
     // will do some validations if one of the fields is missing if the ui is not passing any role or passing an empty array
     if(!fullName|| !phone||!email || !password || !roles || !roles.length==0){
        return res.status(400).json({error: "Missing required fields"});

     }
     //the ui may send something wrong I do serever side validation to make sure 
     // I want to amke sure I have valid roles
     //filter is a js function that takes a role and do an async function on it to check if the role that I passed is included in the array of allowedvaues that I HAVE 
     // this returns for me an array it goes and check if the role sent by the ui is included in the array, if its not there it adds it to the array so were going to have more than one so invalid

     const invalidRoles = roles.filter(role => !allowedRoles.includes(role));
     if(invalidRoles.length> 0){
        return res.status(400).json({ error: `Invalid roles: ${invalidRoles.join(', ')}` });
        
        //here it displays to the frontend the invalid roles so that the user knows what are the invalid roles and make sure to change 

     }
     // I should then do a validation for each one in the personSchema to make sure all fields are there 
     //after I made sure i have roles ill loop on them and take the rofile key which is the object yaane profile, sellerprofile...
     // the mapping I did helped me make sure that the mongoose object are there 

      for (let role of roles){
           const profileKey = roleProfileMap[role];
           // this means if we found a role but not an object ma nhna bl mapping we are putting each role with its object
           if(profileKey && !req.body[profileKey]){
               return res.status(400).json({error: "missing profile data for: ${role}" });
           }
      }
      //after I made sure that fields are there and each role has it object we should setup then the common profile 
      // the generic profile 
      // we start by hashing the password
      const passwordHash = await bcrypt.hash(password, 10);
      const normalisedsettings = {
        // here im back at my schema and im looking to build it forts for the setting Im checking if its sent then I set it to this value sent otherwise I set the default for en
        // the settings is the one that includes these
        language: settings?.language || 'en',
        notificationsEnabled: settings?.notificationsEnabled || true


      };
      const personPayload = {
         email,
         passwordHash,
         roles,
         profile:{
            fullName,
            phone
         },
         settings: normalisedsettings,
         createdAt: new Date(),
      }
      // so far we have prepared the common profile 
      //resolveSellerProfile is some logic that I'll be doing it outside
      // I have to define the logic of this functions outside the controller 
      // we are appending to thecommonprofile the seller/buyer/expert profile 

      if(roles.include('seller')){
        personPayload.sellerProfile = resolveSellerProfile(sellerProfile)
      }
      if(roles.include('buyer')){
        personPayload.sellerProfile = resolveBuyerProfile(buyerProfile)
      }
      if(roles.include('expert')){
        personPayload.sellerProfile = resolveExpertProfile(expertProfile)
      }

    const person = new Person(personPayload);
    await person.save();
    return res.status(201).json({message: "Person Created"})



    }
    catch(err){
        console.log(err)
    }
        
}