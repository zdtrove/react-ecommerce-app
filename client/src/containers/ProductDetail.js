import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/Layout'
import { getProductDetailById } from '../redux/actions'
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { BiRupee } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import { MaterialButton } from "../components/MaterialUI";

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

    if (Object.keys(product.productDetail).length === 0) {
        return null
    }

    return (
        <Layout>
      <div className="productDescriptionContainer">
        <div className="flexRow">
          <div className="verticalImageStack">
            {product.productDetail.productPictures.map((thumb, index) => (
              <div key={index} className="thumbnail">
                <img src={thumb.url} alt={thumb.url} />
              </div>
            ))}
          </div>
          <div className="productDescContainer">
            <div className="productDescImgContainer">
              <img
                src={product.productDetail.productPictures[0].url}
                alt={`${product.productDetail.productPictures[0].url}`}
              />
            </div>

            {/* action buttons */}
            <div className="flexRow">
              <MaterialButton
                title="ADD TO CART"
                bgColor="#ff9f00"
                textColor="#ffffff"
                style={{
                  marginRight: "5px",
                }}
                icon={<IoMdCart />}
              />
              <MaterialButton
                title="BUY NOW"
                bgColor="#fb641b"
                textColor="#ffffff"
                style={{
                  marginLeft: "5px",
                }}
                icon={<AiFillThunderbolt />}
              />
            </div>
          </div>
        </div>
        <div>
          {/* home > category > subCategory > productName */}
          <div className="breed">
            <ul>
              <li>
                <a href="#">Home</a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="#">Mobiles</a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="#">Samsung</a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="#">{product.productDetail.name}</a>
              </li>
            </ul>
          </div>
          {/* product description */}
          <div className="productDetail">
            <p className="productTitle">{product.productDetail.name}</p>
            <div>
              <span className="ratingCount">
                4.3 <IoIosStar />
              </span>
              <span className="ratingNumbersReviews">
                72,234 Ratings & 8,140 Reviews
              </span>
            </div>
            <div className="extraOffer">
              Extra <BiRupee />
              4500 off{" "}
            </div>
            <div className="flexRow priceContainer">
              <span className="price">
                <BiRupee />
                {product.productDetail.price}
              </span>
              <span className="discount" style={{ margin: "0 10px" }}>
                22% off
              </span>
              {/* <span>i</span> */}
            </div>
            <div>
              <p
                style={{
                  color: "#212121",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Available Offers
              </p>
              <p style={{ display: "flex" }}>
                <span
                  style={{
                    width: "100px",
                    fontSize: "12px",
                    color: "#878787",
                    fontWeight: "600",
                    marginRight: "20px",
                  }}
                >
                  Description
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#212121",
                  }}
                >
                  {product.productDetail.description}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
    )
}

export default ProductDetail
