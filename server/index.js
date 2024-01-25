const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

const URL="mongodb+srv://praveenmariappan:6yofKQ1XHOxFSjFe@cluster0.drrmffl.mongodb.net/test"
mongoose.connect(URL,{})
const schema=mongoose.Schema(
{
    act: String,
    select:{
        type: Boolean,
        default: false,
    }
});
const det= mongoose.model("users",schema)
app.get('/',async(req,res)=>{
    try {
        const result = await det.find();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.json("error");
    }
})
app.post('/add',(req,res)=>{
    const val=req.body.content;
    const v=new det({
        act: val,
        select: true,
    })
    v.save().then(()=>res.json("Success")).catch(error=>res.json("Failure"));
})
app.post('/remove',async(req,res)=>{
    const val=req.body.value;
    console.log(val);
    try {
        const removedDocument = await det.findOneAndDelete({ act: val });

        if (removedDocument) {
            console.log('Document removed:', removedDocument);
            res.status(200).json({ message: 'Success' });
        } else {
            console.log('Document not found');
            res.status(404).json({ message: 'Document not found' });
        }
    } catch (error) {
        console.error('Error removing document:', error);
        res.status(500).json({ message: 'Failure' });
    }
})



app.listen(9000,()=>{
    console.log("server is running");
})
