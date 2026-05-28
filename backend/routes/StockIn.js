import Stock_In from "../schema/Stock_InSchema.js";
import express from "express"

const router = express.Router();

router.post('/AddNew', async (req, res) => {
    try {
    const  {Product_Id, Date, Quantity, Unit_price }  = req.body;

    if (!Product_Id || !Date || !Quantity || !Unit_price) {
        return res.status(400).json({ message: 'Please fill out missing details' });
    }

    const Total_price = Quantity * Unit_price;
    const StockIN = await Stock_In.create({ Product_Id, Date, Quantity, Unit_price, Total_price  });

    return res.status(201).json({ message: 'New Stock In added successfully', stockIn: StockIN });
} catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
}
});

router.get('/list', async (req, res) => {
    try {
        const List = await Stock_In.find();

        if (List.length === 0) {
            return res.status(404).json({ message: 'No Stock in the system' });
        } 

        return res.status(200).json({ message: 'Stock list', list: List });
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
        const List = await Stock_In.findById(_id);

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

        const updatedProduct = await Stock_In.findByIdAndUpdate(_id, newFields, { new: true });

        return res.status(200).json({ message: 'Updated successfully', new: updatedProduct });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Intenal server error' });
    }
});

router.delete('/delete/:_id', async (req, res) => {
    try {
        const _id = req.params._id;

        if (!_id) return res.status(400).json({ message: 'Fill out missing fields' });

        await Stock_In.findByIdAndDelete(_id);

        return res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;