const helmet = require('helmet');
const express=require('express');
const app=express();
const word=require('./public/js/word');
const bodyParser = require('body-parser')
const mongoSanitize = require('express-mongo-sanitize');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

word.sort();

const binarySearch =(list, item)=>{
    let low = 0
    let high = list.length - 1
    
  
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const guess = list[mid];
      
  
        if (guess === item) {
            return mid
        }
    
        else if (guess > item) {
            high = mid - 1
        } 
        else {
            low = mid + 1
        }

    }
  
  
    return ` not found in the array.`
}



//static files(css and js)
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public'))//css file
app.use('/js', express.static(__dirname + 'public'))//js file
app.use(mongoSanitize({
    replaceWith: '_'
}))

app.set('views','./views')
app.set('view engine','ejs')

app.use(helmet());


const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com",
    "https://api.tiles.mapbox.com",
    "https://api.mapbox.com",
    "https://kit.fontawesome.com",
    "https://cdnjs.cloudflare.com",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com",
    "https://stackpath.bootstrapcdn.com",
    "https://api.mapbox.com",
    "https://api.tiles.mapbox.com",
    "https://fonts.googleapis.com",
    "https://use.fontawesome.com",
];
const connectSrcUrls = [
    "https://api.mapbox.com",
    "https://*.tiles.mapbox.com",
    "https://events.mapbox.com",
];

app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );






app.get('/',(req,res)=>{
    res.render('index');

})
 
 
 
app.post('/diction',(req,res)=>{
    var search=req.body.search;
    const position=binarySearch(word, search);
    const item=(word[position]);
    const wordPos=(` The position of the word ${item} is ${position}`)
    res.render('meaning',{wordPos});
    


});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})