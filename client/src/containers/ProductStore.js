import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsBySlug } from '../redux/actions'

const ProductStore = (props) => {
    const { product } = useSelector(state => state)
    const dispatch = useDispatch()
    const [priceRange, setPriceRange] = useState({
        under5k: 5000,
        under10k: 10000,
        under15k: 15000,
        under20k: 20000,
        under30k: 30000
    })

    useEffect(() => {
        const { match } = props
        dispatch(getProductsBySlug(match.params.slug))
    }, [dispatch, props])
    return (
        <>
            {
                Object.keys(product.productsByPrice).map((key, index) => {
                    return (
                        <div className="card" key={index}>
                            <div className="card-header">
                                <div>{props.match.params.slug} mobile under {priceRange[key]}</div>
                                <button>view all</button>
                            </div>
                            <div style={{ display: 'flex' }}>
                                {
                                    product.productsByPrice[key].map((product, index) =>
                                        <div key={index} className="product-container">
                                            <div className="product-img-container">
                                                <img src={product.productPictures[0].url} alt="" />
                                            </div>
                                            <div className="product-info">
                                                <div style={{ margin: '5px 0' }}>{product.name}</div>
                                                <div>
                                                    <span>4.3</span>&nbsp;
                                                    <span>3353</span>
                                                </div>
                                                <div className="product-price">{product.price}</div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default ProductStore
