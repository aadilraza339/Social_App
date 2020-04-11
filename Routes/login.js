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
    
    app.put('/update',(req,res) => {
        let password = req.query.password
        let new_password = req.query.new_password
        let alltoken = req.headers.cookie
        var token = alltoken.split('=')
        token = (token[token.length-2]).slice(11,300)
        jwt.verify(token, 'zeba', (err,user_detail) => {
            var data = user_detail['jwt']
            var user_id = data[0]['user_id']
            console.log(user_id)
            knex.logindata(password)
            .then((data)=>{
                if(data[0]['password'] == password){
                    let update = {
                        user_id : user_id,
                        newpassword : new_password
                    }
                    knex.updateData(update)
                    .then(()=>{
                        res.send('update...')
                    })
                }else{
                    res.send('you password in invalid')
                }
            })
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