const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))
// console.log(__filename)

//Define paths for Express config
const pulicDirectoryPath = path.join(__dirname,'../public')

//Define path for views location
const viewpath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views' , viewpath)
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(pulicDirectoryPath))


app.get('', (req, res) => {
    res.render('index' , {
        title : "weather app",
        name : "sagar soneja"
    })
})

app.get('/about', (req,res) => {
    res.render('about' , {
        title : "title of about page",
        name : "sagar soneja"
    })
})

app.get('/help' , (req,res) => {
    res.render('help' , {
        message : "this is help message which i want to display in hbs file",
        title : "title of help page",
        name : "sagar soneja"
    })
})
// app.get('' ,(req,res) => {
//     res.send('<h1>Home Page</h1>')
// })

// app.get('/help' ,(req,res) => {
//     res.send({
//         name : "sagar",
//         age : " 21",
//     })
// })

// app.get('/about' ,(req,res) => {
//     res.send('<h1>about </h1>')
// })

app.get('/weather' ,(req,res) => {
    if(!req.query.address) {
       return res.send({
            error : "Add address in query string"
        })
    } else {
    
        geocode(req.query.address, (error , {latitude , longitude, location} = {}) => {
            if(error) {
                return res.send({
                    error 
                })
            }
        
           
        
            forecast(latitude, longitude, (error, forcastdata) => {
                if(error) {
                    return res.send({
                        error 
                    })
                }
            
                
                return res.send({
                    forecast : forcastdata,
                    location : location,
                    address : req.query.address,
                })
            })
        })

    }
})

app.get('/products' , (req,res) => {
    
    if(!req.query.search) {
       return res.send({
            error : "You must provide a search term"
        })
    }

    console.log(req.query)
    res.send({
        products : []
    })
})

app.get('/help/*' , (req, res) => {
    res.render("404" , {
        title : "404",
        name : "Sagar Soneja",
        errormessage : "help Page not found."
    })
})

app.get('*' ,(req ,res) => {
    res.render("404" , {
        title : "404",
        name : "Sagar Soneja",
        errormessage : "Page not found."
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})