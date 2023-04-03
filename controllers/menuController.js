const MenuItems = require("../db/models/menuItems.js");

const getAll = async (req, res) => {
  try {
    const menu = await MenuItems.getAll();
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
  try {
    const menu = await MenuItems.getOne(req.params.id);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const menu = await MenuItems.create(req.body);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const findByIdAndUpdate = async (req, res) => {
  try {
    const menu = await MenuItems.findByIdAndUpdate(req.params.id, req.body);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const findByIdAndDelete = async (req, res) => {
  try {
    const menu = await MenuItems.findByIdAndDelete(req.params.id);
    if (menu === null) {
      res.status(500).send("no Item with ID found");
    } else {
      res.send(menu.id);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  findByIdAndUpdate,
  findByIdAndDelete
};
