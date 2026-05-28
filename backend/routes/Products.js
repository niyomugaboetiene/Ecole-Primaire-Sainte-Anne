import Product from "../schema/ProductSchema.js";
import express from "express"

const router = express.Router();

router.post('/AddNew', async (req, res) => {
    try {
    const  {Product_Name, Product_Id}  = req.body;

    if (!Product_Name) {
        return res.status(400).json({ message: 'Please fill out name of product' });
    }

    const newProduct = await Product.create({ Product_Id, Product_Name});

    return res.status(201).json({ message: 'New product added successfully', product: newProduct });
} catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
}
});

router.get('/list', async (req, res) => {
    try {
        const List = await Product.find();

        if (List.length === 0) {
            return res.status(404).json({ message: 'No product in the system' });
        } 

        return res.status(200).json({ message: 'Product list', list: List });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/single/:_id', async (req, res) => {
    try {
        const { _id } = req.params;

        if (!_id) {
            return res.status(404).json({ message: 'Product Id is required' });
        }
        const List = await Product.findById(_id);

        if (List.length === 0) {
            return res.status(404).json({ message: 'No product in the system' });
        } 

        return res.status(200).json({ message: 'Product list', list: List });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


router.put('/update/:_id', async (req, res) => {
    try {
        const _id = req.params._id;

        if (!_id) return res.status(400).json({ message: 'FIll out IDs' });
        const { Product_Name } = req.body;

        let newFields = {}
        if (Product_Name) newFields.Product_Name = Product_Name;

        const updatedProduct = await Product.findByIdAndUpdate(_id, newFields, { new: true });

        return res.status(200).json({ message: 'Updated successfully', new: updatedProduct });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Intenal server error' });
    }
});

router.delete('/delete/:_id', async (req, res) => {
    try {
        const _id = req.params._id;
    }
})
export default router;