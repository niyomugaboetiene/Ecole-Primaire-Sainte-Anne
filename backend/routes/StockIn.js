import Stock_In from "../schema/Stock_InSchema.js";
import express from "express"

const router = express.Router();

function isAuthorized(req, res, next) {
    if (!req.session.users) {
        return res.status(401).json({ message: 'Login first.' });
    }

    next();
}
router.post('/AddNew', isAuthorized, async (req, res) => {
    try {
    const  { Product_Id, Date, Quantity, Unit_price }  = req.body;

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

router.get('/list', isAuthorized, async (req, res) => {
    try {
        const List = await Stock_In.find().populate("Product_Id");

        if (!List) {
            return res.status(404).json({ message: 'No Stock in the system' });
        } 

        return res.status(200).json({ message: 'Stock list', list: List });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/single/:_id', isAuthorized, async (req, res) => {
    try {
        const { _id } = req.params;

        if (!_id) {
            return res.status(404).json({ message: 'Stock Id is required' });
        }
        const List = await Stock_In.findById(_id).populate("Product_Id");

        if (!List) {
            return res.status(404).json({ message: 'No stock in in the system' });
        } 

        return res.status(200).json({ message: 'Stock list', list: List });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


router.put('/update/:_id', isAuthorized, async (req, res) => {
  try {
       
       const _id = req.params._id;
       
       if (!_id) return res.status(403).json({ message: 'IDs is required' });

       const  {Product_Id, Date, Quantity, Unit_price }  = req.body;
  
       const stock = await Stock_In.findById(_id);

       if (!stock) return res.status(404).json({ message: 'No stock found' });

       let receivedFields = {};

       if (Product_Id) receivedFields.Product_Id = Product_Id;
       if (Date) receivedFields.Date = Date;
       if (Quantity) receivedFields.Quantity = Quantity;
       if (Unit_price) receivedFields.Unit_price = Unit_price;

       let Total_price;

       if (Quantity && Unit_price) {
           Total_price = Quantity * Unit_price;
       }

       if (Total_price) receivedFields.Total_price = Total_price;

        const StockIN = await Stock_In.findByIdAndUpdate(_id, receivedFields, { new: true });

        return res.status(201).json({ message: 'Stock In Updated successfully', stockIn: StockIN });
     } catch (err) {
         console.error(err);
         return res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/delete/:_id', isAuthorized, async (req, res) => {
    try {
        const _id = req.params._id;

        if (!_id) return res.status(400).json({ message: 'Fill out missing fields' });

        const isExist = await Stock_In.findById(_id);


        if (!isExist) return res.status(403).json({ message: 'Enter valid Id' });

        await Stock_In.findByIdAndDelete(_id);

        return res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;