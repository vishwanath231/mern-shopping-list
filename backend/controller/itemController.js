import Item from '../model/itemModel.js';



/**
 * 
 * @router POST api/items
 * @desc   Create new item
 * @access Public
 */

const postItem =  async (req, res) => {

    const name = req.body.name;

    if (!name) {
        return res.status(401).json({msg: "Shopping name is required!"})
    }

    const newItem = new Item({
        name: name
    });
    
    try {
        const item = await newItem.save();
        if (!item) throw Error('Something went wrong saving the item');
    
        res.status(200).json(item);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
}


/**
 * 
 * @router GET api/items
 * @desc   Get a items
 * @access Public
 */

const getItems = async (req, res) => {
    
    try {
        const items = await Item.find().sort({ date: -1 });
        if (!items) throw Error('No items');
    
        res.status(200).json(items);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
}




/**
 * 
 * @router PUT api/items:id
 * @desc   Update a item
 * @access Public
 */

const updateItem = async (req, res) => {
    
    try {

        const updateItem = await Item.updateOne({"_id":req.params.id}, {"$set": {"isCheck": req.body.isCheck}});
        if (!updateItem) throw Error("Not update!");

        const item = await Item.findById(req.params.id);
        if (!item) throw Error("Not found is id");
            
        res.status(200).json(item);
        
    } catch (e) {
        
        return res.status(401).json({
            msg: e.message
        })
    }

}



/**
 *
 * @router DELETE api/items:id
 * @desc   Delete a item
 * @access Public
 */

const deleteItem = async (req, res) => {

    const id = req.params.id;
    
    try {

        const itemId = await Item.findByIdAndDelete(id);
        if (!itemId) throw Error("Not found is id");
        
        return res.status(200).json({
            msg: "Deleted Successfully"
        })
        
    } catch (e) {
        
        return res.status(401).json({
            msg: e.message
        })
    }
}



export { postItem, getItems, updateItem, deleteItem };