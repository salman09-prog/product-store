import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});

        if (products.length === 0) {
            return res.status(404).json({ success: false, message: "Products not found" });
        }

        return res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error in finding products", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({
            success: false,
            message: "Please fill all the information"
        })
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        return res.status(201).json({
            success: true,
            data: newProduct
        })
    } catch (error) {
        console.log("Error in creating product ", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

export const deleteProduct = async (req, res) => {
     let { id } = req.params;   
     
     if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid product id"});
     }
     
    try {
        await Product.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.log("Error in deleting product");
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const updateProduct = async (req, res) => {
    let { id } = req.params;

    const product = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        return res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct });
    } catch (error) {
        console.log("Error in updating product", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
