const mongoose = require("../db.js");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  items: [
    {
      item: {
        type: mongoose.Schema.ObjectId,
        ref: "MenuItems"
      },

      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  status: {
    type: String,
    required: true,
    enum: ["pending", "confirmed", "delivered", "cancelled"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
orderSchema.set("toJSON", {
  virtuals: true
});
orderSchema.statics.calcTotal = (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);

// order model
const Order = mongoose.model("Order", orderSchema);

const getAll = async () => {
  // populate each item
  const orders = await Order.find().populate("items.item");

  return orders;
};

const getOne = async (id) => {
  const order = await Order.findById(id).populate("items.item");
  return order;
};

const create = async (body) => {
  const order = await Order.create(body);
  return order;
};

const update = async (id, body) => {
  const order = await Order.findByIdAndUpdate(id, body, { new: true });
  return order;
};

const remove = async (id) => {
  const order = await Order.findByIdAndDelete(id);
  return order.id;
};

const getByStatus = async (status) => {
  const orders = await Order.find({ status }).populate("items");
  return orders;
};

const getTotalSales = async (startingDate, endingDate) => {
  // convert to include the endingDate
  const begginingOfEndDate = new Date(endingDate);
  const endOfEndDate = new Date(begginingOfEndDate.getTime() + 86399999);

  const orders = await Order.find({
    createdAt: { $gte: startingDate, $lt: endOfEndDate }
  }).populate("items.item");

  const orderTotal = orders.reduce(
    (acc, order) =>
      acc +
      order.items.reduce(
        (sum, item) => sum + item.quantity * item.item.price,
        0
      ),
    0
  );
  return { total: `$${orderTotal}` };
};

const getStatus = async (startingDate, endingDate, statusQuery) => {
  // convert to include the endingDate
  const begginingOfEndDate = new Date(endingDate);
  const endOfEndDate = new Date(begginingOfEndDate.getTime() + 86399999);

  const orders = await Order.find({
    createdAt: { $gte: startingDate, $lt: endOfEndDate },
    status: statusQuery
  }).populate("items.item");

  return orders;
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getByStatus,
  Order,
  getTotalSales,
  getStatus
};
