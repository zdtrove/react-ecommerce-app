const Cart = require('../models/cart.model')

exports.addItemToCart = (req, res) => {
    const { _id } = req.user
    const { cartItems } = req.body
    const { product, quantity } = cartItems
    Cart.findOne({ user: _id })
        .exec((err, cart) => {
            if (err) return res.status(400).json({ err })
            if (cart) {
                // if cart already exists then update cart by quantity
                const item = cart.cartItems.find(c => c.product == product)
                let condition, update
                if (item) {
                    condition = { user: _id, "cartItems.product": product }
                    update = {
                        $set: {
                            "cartItems.$": {
                                ...cartItems,
                                quantity: item.quantity + quantity
                            }
                        }
                    }

                } else {
                    condition = { user: _id }
                    update = {
                        $push: {
                            "cartItems": cartItems
                        }
                    }
                }
                Cart.findOneAndUpdate(condition, update).exec((err, _cart) => {
                    if (err) return res.status(400).json({ err })
                    if (_cart) {
                        return res.status(201).json({ cart: _cart })
                    }
                })
            } else {
                // if cart not exist then create a new cart
                const newCart = new Cart({
                    user: _id,
                    cartItems: [cartItems]
                })

                newCart.save((err, cart) => {
                    if (err) return res.status(400).json({ err })
                    if (cart) {
                        return res.status(201).json({ cart })
                    }
                })
            }
        })


}