let express = require('express');
let app =express();
app.get('/api/user',function(req,res){
    res.json({'name':'lyf'})
})
app.listen(3000)