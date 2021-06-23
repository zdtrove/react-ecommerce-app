import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/Layout'
import { getProductDetailById } from '../redux/actions'

const ProductDetail = props => {
    const dispatch = useDispatch()
    const { product } = useSelector(state => state)

    useEffect(() => {
        const { productId } = props.match.params
        const payload = {
            params: {
                productId
            }
        }
        dispatch(getProductDetailById(payload))
    }, [])

    return (
        <Layout>
            <div>{product.productDetail.name}</div>
        </Layout>
    )
}

export default ProductDetail
