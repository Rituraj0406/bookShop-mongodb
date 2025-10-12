const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to get user
app.use((req, res, next) => {
    User.findById('68eb922724034cddf2b52798')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoose.connect(
    'mongodb+srv://admin:rGir3z9BxotHzGaA@cluster0.can9fgt.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0'
)
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'Rituraj',
                    email: 'raj@email.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        })
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });

