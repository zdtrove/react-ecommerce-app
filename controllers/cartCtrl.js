const Cart = require('../models/cartModel')

exports.addItemToCart = (req, res) => {
    Cart.findOne({ user: req.user._id })
        .exec((err, cart) => {
            if (err) return res.status(400).json({ err })
            if (cart) {
                // if cart already exists then update cart by quantity
                const product = req.body.cartItems.product
                const item = cart.cartItems.find(c => c.product == product)
                if (item) {
                    Cart.findOneAndUpdate({ user: req.user._id, "cartItems.product": product }, {
                        $set: {
                            "cartItems": {
                                ...req.body.cartItems,
                                quantity: item.quantity + req.body.cartItems.quantity
                            }
                        }
                    }).exec((err, _cart) => {
                        if (err) return res.status(400).json({ err })
                        if (_cart) {
                            return res.status(201).json({ cart: _cart })
                        }
                    })
                } else {
                    Cart.findOneAndUpdate({ user: req.user._id }, {
                        $push: {
                            "cartItems": req.body.cartItems
                        }
                    }).exec((err, _cart) => {
                        if (err) return res.status(400).json({ err })
                        if (_cart) {
                            return res.status(201).json({ cart: _cart })
                        }
                    })
                }
            } else {
                // if cart not exist then create a new cart
                const newCart = new Cart({
                    user: req.user._id,
                    cartItems: [req.body.cartItems]
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