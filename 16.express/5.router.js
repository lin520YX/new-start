let express = require('express');
let app = express();
let router = express.Router();
router.get('/',function (req,res) {
  res.end('user');
})
router.get('/reg', function (req, res) {
  res.end('user');
})
app.use('/user', router);

app.get('/',function (req,res) {
  res.end('home');
})

app.listen(3000);