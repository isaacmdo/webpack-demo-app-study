// if(process.env.NODE_ENV !== "production"){
//   require('dotenv').config();
// }

const express = require('express');
const app = express();
const path = require('path');


const homeRoutes = require('./routes/home');

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'dist')));

app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use('/', homeRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})