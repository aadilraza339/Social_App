module.exports= (app,jwt)=>{
const knex  = require ('../Model/home_knex')
    app.post('/image',(req,res)=>{
        var  imageUrl = req.body. params.imageUrl
        var token  = req.body.params.token
        var text = req.body.params.Text    
        jwt.verify(token, 'aadil', (err,user_detail)=>{
        if(!err){    
            var id = user_detail.jwt[0]['user_id']
            knex.user_id(id,text,imageUrl)
            .then((data)=>{
                res.send('upload...')
            })
            .catch((err)=>{
                res.json(err)
            })  
        }
        else{
            res.send(err)

            }
        })   
    })

    
    app.get('/get_post',(req,res)=>{
        knex.get_post()
        .then((data)=>{
            res.send(data.reverse())   
        })
        .catch((err)=>{
            res.send(err)
        })
    })
    

    app.get('/get_user',(req,res)=>{
        knex.get_user()
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            res.send(err)
        })
    })

    
    app.get("/user_name",(req,res)=>{
        var token = req.query.token
        jwt.verify(token, 'aadil', (err,user_detail)=>{
            if(!err){
               console.log(user_detail.jwt[0]);
               let usernames= []
               usernames.push(user_detail.jwt[0])
               res.send(usernames)
            }
            else{
                res.send(err)
            }
        })
    })

}
