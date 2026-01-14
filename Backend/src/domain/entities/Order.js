export class Order {
  constructor(id, customerId, items, totalAmount, shippingInfo, paymentMethod, status = 'pending') {
    this.id = id;
    this.customerId = customerId;
    this.items = items; // List các món
    this.totalAmount = totalAmount;
    this.shippingInfo = shippingInfo;
    this.paymentMethod = paymentMethod;
    this.status = status;
  }
}