const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger')
const posts = require('./Posts');



const app = express();

//Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Init Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



//Homepage Route rendering
app.get('/', (req, res) =>
	res.render('index', {
		title: 'Express Chat', 
		posts
	})
);

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Members API Routes
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 80;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
