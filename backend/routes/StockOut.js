import Stock_Out from "../schema/Stock_Out.js";
import Stock_In from "../schema/Stock_InSchema.js";
import express from "express"

const router = express.Router();

router.post('/AddNew', async (req, res) => {
    try {
    const  { Product_Id, Date, Quantity }  = req.body;

    if (!Product_Id || !Date || !Quantity) {
        return res.status(400).json({ message: 'Please fill out missing details' });
    }

    const stockIn = await Stock_In.find({ Product_Id });

    const totalstockIn = stockIn.reduce((total, item) => {
        return total + item.Quantity;
    }, 0);

    const stock_Out = await Stock_Out.find({ Product_Id });

    const totalStockOut = stock_Out.reduce((total, item) => {
        return total + item.Quantity;
    }, 0);

    const remainingStock = totalstockIn - totalStockOut;

    if (Quantity > remainingStock) {
        return res.status(403).json({ message: `You don't have this amount in stock. Your stock is ${remainingStock} `})
    }
    const Stock_Outs = await Stock_Out.create({ Product_Id, Date, Quantity });

    return res.status(201).json({ message: 'New Stock Out added successfully', stockOut: Stock_Outs });
} catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
}
});

router.get('/list', async (req, res) => {
    try {
        const List = await Stock_Out.find().populate("Product_Id");

        if (!List) {
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
            return res.status(404).json({ message: 'Stock Id is required' });
        }
        const List = await Stock_Out.findById(_id).populate("Product_Id");

        if (!List) {
            return res.status(404).json({ message: 'No stock in in the system' });
        } 

        return res.status(200).json({ message: 'Stock list', list: List });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


router.put('/update/:_id', async (req, res) => {
  try {
       
       const _id = req.params._id;

       if (!_id) {
           return res.status(400).json({ message: 'Fill out missing _id' });
       }

       const  {Product_Id, Date, Quantity }  = req.body;
  
       const stocksIn = await Stock_In.find({ Product_Id });
       
       const totalStockInQauntity = stocksIn.reduce((total, item) => {
        return total + item.Quantity;
       }, 0)

       const stocksOut = await Stock_Out.find({ Product_Id });

       const totalStockOutQauntity = stocksOut.reduce((total, item) => {
        return total + item.Quantity;
       }, 0);

       const remainingStock = totalStockInQauntity - totalStockOutQauntity;

       const receivedFields = {};

       if (Date) receivedFields.Date = Date;
       if (Quantity > remainingStock) {
           return res.status(403).json({ message: `You don't have this Quantity in stock. Your stock is ${remainingStock}`})
       }
       receivedFields.Quantity = Quantity;

       const UpdatedStockOut = await Stock_Out.findByIdAndUpdate(_id, receivedFields, { new: true });

        return res.status(200).json({ message: 'Stock In Updated successfully', updated: UpdatedStockOut });
     } catch (err) {
         console.error(err);
         return res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/delete/:_id', async (req, res) => {
    try {
        const _id = req.params._id;

        if (!_id) return res.status(400).json({ message: 'Fill out missing fields' });

        console.log(_id);
        await Stock_Out.findByIdAndDelete(_id);

        return res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});



// basic Full report for stock in
router.get('/report/stockIn', async (req, res) => {
    try {
    
        const stockIn = await Stock_In.find().populate("Product_Id");

        const totalStockIn = stockIn.reduce((total, item) => {
            return total + item.Quantity;
        }, 0);

        return res.status(200).json({ message: 'Stock generated successfully', summary: { stockIn, totalStockIn }});

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error '})
    }
});

// basic Full report
router.get('/report', async (req, res) => {
    try {
    
        const stockIn = await Stock_In.find().populate("Product_Id");
        const stockOut = await Stock_Out.find().populate("Product_Id");

        const totalStockOut = stockOut.reduce((total, item) => {
            return total + item.Quantity;
        }, 0);

        const totalStockIn = stockIn.reduce((total, item) => {
            return total + item.Quantity;
        }, 0);

        const remainingStock = totalStockIn - totalStockOut;


        return res.status(200).json({ message: 'Stock generated successfully', summary: { stockIn, stockOut, totalStockIn, totalStockOut, remainingStock }});

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error '})
    }
});

// get report per product

router.get('/report/product/:Product_Id', async (req, res) => {
    try {
        const { Product_Id } = req.params;

        const stockIn = await Stock_In.find({ Product_Id }).populate("Product_Id");
        const stockOut = await Stock_Out.find({ Product_Id }).populate("Product_Id");

        const totalStockOut = stockOut.reduce((total, item) => {
            return total + item.Quantity;
        }, 0);
        
        const totalStockIN = stockIn.reduce((total, item) => {
            return total + item.Quantity;
        }, 0);

        const remainingStock = totalStockIN - totalStockOut;

        return res.status(200).json({ message: 'Report generated successfully', 
            summary: {
                stockIn,
                stockOut,
                totalStockIN, 
                totalStockOut,
                remainingStock
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Intenal server error' });
    }
})
export default router;