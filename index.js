import express from 'express';
import dotenv from 'dotenv';
import nunjucks from 'nunjucks';



dotenv.config();
const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static('public'));
app.set('views', './views');

let env = nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// code

const router1 = express.Router();

let users;

import raven from'./raven.js';
router1.get('/', async (req, res) => {
    //console.log(users);

    raven.Load().then((result)=>{
        //users = result;
        //console.log('1');  
        //console.log(result);  
        res.render('index.njk', { users1: result });
    })

});

app.use('/', router1);

app.post('/', async (req, res) => {
    const body = req.body;
    console.log('1');
    console.log(body);
    
    if(body['ADD'] != undefined)
    {
        console.log("ADD");
        if(body['name'] != "")
        {
            raven.Create(body['name']).then(()=>{
                res.redirect('/');
            })
        }
    }
    if(body['EDIT'] != undefined)
    {
        console.log("EDIT");
        if(body['name'] != "")
        {
            raven.upd(body['id'] ,body['name']).then(()=>{
                res.redirect('/');
            })
        }
    }
    if(body['DELETE'] != undefined)
    {
        console.log("DELETE");
        raven.deleteUser(body['id']).then(()=>{
            res.redirect('/');
        })
    }
});






//Load();



// END OF CODE
app.listen(process.env.PORT, () => {
    console.log(`Example app running on http://localhost:${process.env.PORT}`);
  });