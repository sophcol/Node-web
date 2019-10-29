const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 5000;

    var app = express();

    hbs.registerPartials(__dirname + "/partials");
        app.set(' engine', 'hbs');
        app.engine('hbs', require('hbs').__express);

            app.use(express.static(__dirname + '/public'));
                app.use((req, res, next) =>{
                    var now = (new Date().toString());
                    var log = `${now}: ${req.method} ${req.url}`;
                    console.log(log);
                fs.appendFile('server.log', log + '\n', (err) =>{
                    if (err){
                        console.log('Unable to append to server.log')
                         }
                    });
                     next();
                });
                   
        hbs.registerHelper('getCurrentYear', () =>{
            return new Date().getFullYear();
        })
        hbs.registerHelper('screamIt', (text) =>{
            return text.toUpperCase();
        });

            app.get('/about', (req, res) => {
                res.render('about.hbs', {
                            pageTitle: 'About Page',
                            });
            });
            app.get('/', (req, res) =>{
                res.render('home.hbs', {
                                pageTitle: 'Home Page',
                                welcomeMessage: 'Welcome to my website',
                                    });
            });
            app.listen(port, () =>{
                console.log('Server is up on port 5000')
            });
