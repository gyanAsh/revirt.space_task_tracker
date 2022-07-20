const express = require('express');
const app = express();

// Parse the incoming requests
app.use(express.json({ extended: true }));

app.use('/',(req, res)=> {
    res.status(200).send("Server is working");
})

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=> `Server started on Port: ${PORT}`);