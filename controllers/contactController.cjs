const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel.cjs");
const { constants } = require("../constants.cjs");
//@desc Get all contacts
//@route GET/api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//@desc Create a contact
//@route POST/api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are required");
  } else {
    const contact = await Contact.create({
      name,
      email,
      phone,
    });
    res.status(201).json(contact);
  }
});

//@desc Get a contact
//@route GET/api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (contact != null) {
    res.status(200).json(contact);
  } else {
    throw new Error("Not found!");
  }
});

//@desc Modify a contact
//@route PUT/api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Not found!");
  } else {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedContact);
  }
});

//@desc Delete a contact
//@route DELETE/api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Not found!");
  } else {
    await Contact.deleteOne(contact);
    res.status(200).json(contact);
  }
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
