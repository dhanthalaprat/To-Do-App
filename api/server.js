const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express()

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://dhanthalap:Prathyu%4098@student-forum-db.xgthuuw.mongodb.net/?retryWrites=true&w=majority', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
    .then(()=> console.log("DB Connected"))
    .catch(console.error);



app.listen(5001, ()=> console.log("listening on port 5001"));

const Todo=require('./models/Todo');
app.get('/todos',async(req,res)=>{
    const todos=await Todo.find();
    res.json(todos);
});

app.post('/todo/new',(req,res)=>{
    const todo=new Todo({
        text:req.body.text
    });
    todo.save();
    res.json(todo);
});

app.delete('/todo/delete',async(req,res)=>{
    console.log(req);
    const result=await Todo.findByIdAndDelete(req.body.id);
    res.json(result);
});

app.put('/todo/complete',async(req,res)=>{
    const result=await Todo.findById(req.body.id)
    result.complete=!(result.complete)
    result.save();
    res.json(result)
});






