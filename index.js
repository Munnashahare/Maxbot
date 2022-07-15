let express = require('express'),
bodyParser = require('body-parser'),
fs = require('fs'),
app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');
app.post('/index', (req, res) => {
    //res.sendFile(__dirname + '/index.html');
    res.render('index', {name: req.body.firstName+' '+req.body.lastName});
})

app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/index.html');
    res.render('home');
})

app.get('/gallery', (req, res) => {
    //res.sendFile(__dirname + '/index.html');
    var dir = __dirname + "/public/images";
    fs.readdir(dir, (err, files) => {
        res.render('gallery', {title: "Mun", message: "Mi tula aaj pasn nodejs sangaycha vchar kela hota.....", images:files});
    });
});


app.get('/view', (req, res) => {
    let userData = fs.readFileSync('get.json'),
    data = JSON.parse(userData)
    id = req.query.id;
    if (req.query.id) {
        let user = data.filter(u => u.id == req.query.id);
        res.send(user);
        return;
    } 
    return res.send(data);
});
let PORT = 80;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
       
