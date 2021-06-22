import React from 'react'
import Layout from '../components/Layout'
import { getParams } from '../helpers/getParams'
import ProductStore from './ProductStore'
import ProductPage from './ProductPage'

const ProductList = props => {
    const renderProduct = () => {
        const params = getParams(props.location.search)
        switch (params.type) {
            case 'store':
                return <ProductStore {...props} />
            case 'page':
                return <ProductPage {...props} />
            default:
                return null
        }
    }
    return (
        <Layout>
            <div className="product-client">
                {renderProduct()}
            </div>
        </Layout>
    )
}

export default ProductList
