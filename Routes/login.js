const knex=require("../Model/knex")
module.exports=(app,jwt)=>{
    app.post('/register',(req,res)=>{
        knex.register(req.body)
        .then((right)=>{
            var token = jwt.sign({
                "jwt": req.body
            }, 'secret');
            res.cookie(`${req.body.Username} ${token}`)
            res.send('create...')
        })
        .catch((err)=>{
            res.json({"message":err.message})
        })
    })

    app.get('/login',(req,res)=>{
        let email = req.query.email
        let password = req.query.password
        knex.login(email)
        .then((data)=>{
            if(data.length==0){
                res.send('you email in invalid')
            }
            else{
                if(data[0]['password']==password){
                    var token = jwt.sign({
                        "jwt": data}, 'aadil');
                      res.cookie(token)
                      res.send(token)
                }
                else{
                    res.send('password is wrong')
                }
            }
        })
        .catch((err)=>{
            res.json(err)
        })
    })
    
    app.get('/verify',(req,res)=>{ 
        var token = req.query.token;
        jwt.verify(token, 'aadil', (err)=>{
            if(!err){
                res.send(true)
            }
            else{
                res.send(false)
            }
        })
    })
}   