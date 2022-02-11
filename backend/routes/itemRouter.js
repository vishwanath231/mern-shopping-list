import { Router } from 'express';
const router = Router();
import Items from '../model/itemModel.js';
import auth from '../middleware/authMiddleware.js'


/**
 * 
 * @router POST api/items
 * @desc   Create new item
 * @access Public
 */

router.post('/', auth, async (req, res) => {
    
    const { name } = req.body;

    if (!name) {
        res.status(401).json({msg: "Shopping name is required!"})
    }

    try {

        const newItem = new Items({
            name: name
        })

        const savedItem = await newItem.save();
        if (!savedItem) throw Error("something went wrong saving the list")

        return res.status(200).json({
            msg: "Item added",
            savedItem
        })

        
    } catch (e) {

        return res.status(401).json({
            msg: e.message
        })
        
    }

})


/**
 * 
 * @router GET api/items
 * @desc   Get a items
 * @access Public
 */

router.get('/', async (req, res) => {
    
    try {

        const item = await Items.find().sort({ date: -1 });
        if (!item) throw Error("No items in record");
        
        return res.status(200).json({
            length: item.length,
            items: item
        })
        
    } catch (e) {
        
        return res.status(401).json({
            msg: e.message
        })
    }
})



/**
 * 
 * @router DELETE api/items:id
 * @desc   Delete a item
 * @access Public
 */

 router.delete('/:id', auth, async (req, res) => {

    const id = req.params.id;
    
    try {

        const itemId = await Items.findByIdAndDelete(id);
        if (!itemId) throw Error("Not found is id");
        
        return res.status(200).json({
            msg: "Deleted Successfully"
        })
        
    } catch (e) {
        
        return res.status(401).json({
            msg: e.message
        })
    }
})


export default router;

