exports.createPage = (req, res) => {
	const { banners, products } = req.body
	if (banners.length > 0) {
		req.body.banners = banners.map((banner, index) => ({
			img,
			navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`
		}))
	}
	if (products.length > 0) {
		req.body.products = products.map((product, index) => ({
			img,
			navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`
		}))
	}
	req.status(200).json({ body: req.body })
}