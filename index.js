const express = require('express');
const path = require('path');
const { engine} = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members')


const app = express();



// Init middleware
//app.use(logger);

// Handlbar Middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Homepage route with rendering
app.get('/', (req, res) => res.render('index', {
    title: 'WPT App Registration',
    members
}));

// Set static Folder (should be moved above the homepageroute to work )
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on the port ${PORT}`));