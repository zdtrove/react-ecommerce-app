import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getParams } from '../helpers/getParams'
import { getProductPage } from '../redux/actions'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import { Link } from 'react-router-dom'
import Card from '../components/Card'

const ProductPage = props => {
    const dispatch = useDispatch()
    const { page } = useSelector(state => state)
    const { title, banners, products } = page.pages

    useEffect(() => {
        const params = getParams(props.location.search)
        dispatch(getProductPage(params))
    }, [dispatch, props.location.search])
    return (
        <div style={{ margin: '0 10px' }}>
            <h3>{title}</h3>
            <Carousel
                renderThumbs={() => { }}
            >
                {
                    banners && banners.map((banner, index) =>
                        <Link to={banner.navigateTo} style={{ display: 'block' }} key={index}>
                            <img src={banner.img} alt="" />
                        </Link>
                    )
                }
            </Carousel>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                margin: '10px 0'
            }}>
                {
                    products && products.map((product, index) =>
                        <Card
                            key={index}
                            style={{
                                width: '400px',
                                margin: '5px'
                            }}
                        >
                            <img style={{
                                width: '100%',
                                height: '100%'
                            }} src={product.img} alt="" />
                        </Card>
                    )
                }
            </div>
        </div>
    )
}

export default ProductPage
