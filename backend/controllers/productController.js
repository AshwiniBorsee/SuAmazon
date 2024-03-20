const ProductModel = require('../models/productModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const SearchFeatures = require('../utils/searchFeatures');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require('cloudinary');

exports.getAllProducts = asyncErrorHandler(async (req, res, next) => {

    const productPerPage = 12;
    const productsCount = await ProductModel.countDocuments();

    const searchFeature = new SearchFeatures(ProductModel.find(), req.query)
        .search()
        .filter();

    let products = await searchFeature.query;
    let filteredProductsCount = products.length;

    searchFeature.pagination(productPerPage);

    products = await searchFeature.query.clone();

    res.status(200).json({
        success: true,
        products,
        productsCount,
        productPerPage,
        filteredProductsCount,
    });
});

// Get Products by Category
exports.getProductsByCategory = asyncErrorHandler(async (req, res, next) => {

    const productPerPage = 12;
    const category = req.params.category; // get the category from the route parameters

    const searchFeature = new SearchFeatures(ProductModel.find({ category: category }), req.query)
        .search()
        .filter();

    let products = await searchFeature.query;
    let filteredProductsCount = products.length;

    searchFeature.pagination(productPerPage);

    products = await searchFeature.query.clone();

    res.status(200).json({
        success: true,
        products,
        productPerPage,
        filteredProductsCount,
    });
});


exports.getProducts = asyncErrorHandler(async (req, res, next) => {
    const products = await ProductModel.find();

    res.status(200).json({
        success: true,
        products,
    });
});

exports.getProductDetails = asyncErrorHandler(async (req, res, next) => {

    const product = await ProductModel.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("ProductModel Not Found", 404));
    }

    res.status(200).json({
        success: true,
        product,
    });
});

exports.getAdminProducts = asyncErrorHandler(async (req, res, next) => {
    const products = await ProductModel.find();

    res.status(200).json({
        success: true,
        products,
    });
});

exports.createProduct = asyncErrorHandler(async (req, res, next) => {

    let images = [];
    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLink = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });

        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    const result = await cloudinary.v2.uploader.upload(req.body.logo, {
        folder: "brands",
    });
    const brandLogo = {
        public_id: result.public_id,
        url: result.secure_url,
    };

    req.body.brand = {
        name: req.body.brandname,
        logo: brandLogo
    }
    req.body.images = imagesLink;
    req.body.user = req.user.id;

    let specs = [];
    req.body.specifications.forEach((s) => {
        specs.push(JSON.parse(s))
    });
    req.body.specifications = specs;

    const product = await ProductModel.create(req.body);

    res.status(201).json({
        success: true,
        product
    });
});

exports.updateProduct = asyncErrorHandler(async (req, res, next) => {

    let product = await ProductModel.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("ProductModel Not Found", 404));
    }

    if (req.body.images !== undefined) {
        let images = [];
        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        const imagesLink = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }
        req.body.images = imagesLink;
    }

    if (req.body.logo.length > 0) {
        await cloudinary.v2.uploader.destroy(product.brand.logo.public_id);
        const result = await cloudinary.v2.uploader.upload(req.body.logo, {
            folder: "brands",
        });
        const brandLogo = {
            public_id: result.public_id,
            url: result.secure_url,
        };

        req.body.brand = {
            name: req.body.brandname,
            logo: brandLogo
        }
    }

    let specs = [];
    req.body.specifications.forEach((s) => {
        specs.push(JSON.parse(s))
    });
    req.body.specifications = specs;
    req.body.user = req.user.id;

    product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(201).json({
        success: true,
        product
    });
});

exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {

    const product = await ProductModel.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("ProductModel Not Found", 404));
    }

    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await product.remove();

    res.status(201).json({
        success: true
    });
});