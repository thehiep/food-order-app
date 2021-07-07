"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CartContext = _react["default"].createContext({
  items: [],
  totalAmount: 0,
  addItem: function addItem(item) {},
  removeItem: function removeItem(id) {},
  clearCart: function clearCart() {}
});

var _default = CartContext;
exports["default"] = _default;