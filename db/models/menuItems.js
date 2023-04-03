const mongoose = require("../db.js");

const menuItemsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String
    }
  },
  { timestamps: true }
);
menuItemsSchema.set("toJSON", {
  virtuals: true
});
// menu model
const MenuItems = mongoose.model("MenuItems", menuItemsSchema);

const getAll = async () => {
  try {
    const menuItems = await MenuItems.find();
    return menuItems;
  } catch (error) {
    return error;
  }
};

const getOne = async (id) => {
  try {
    const menuItem = await MenuItems.findById(id);
    return menuItem;
  } catch (error) {
    return error;
  }
};

const create = async (body) => {
  try {
    const menuItem = await MenuItems.create(body);
    return menuItem;
  } catch (error) {
    return error;
  }
};

const findByIdAndUpdate = async (id, body) => {
  const menuItem = await MenuItems.findByIdAndUpdate(id, body, {
    new: true
  });
  return menuItem;
};

const findByIdAndDelete = async (id) => {
  const menuItem = await MenuItems.findByIdAndDelete(id);
  return menuItem;
};

const search = async (query) => {
  try {
    const menuItem = await MenuItems.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } }
      ]
    });
    return menuItem;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  MenuItems,
  findByIdAndUpdate,
  findByIdAndDelete,
  search
};
