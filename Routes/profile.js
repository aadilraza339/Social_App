const knex = require ('../Model/pro_knex')
module.exports = (app,jwt) =>{
    app.post('/edit',(req,res) =>{
    let token = req.body.headers.token        
    jwt.verify(token,"aadil",(err,user_detail)=>{
        if(!err){
            var user_id = (user_detail.jwt[0].user_id)    
            knex.edit(user_id)
            .then((data)=>{                    
                if(data.length==0){
                    var bio ={"data":req.query}
                    var user_id = user_detail.jwt[0].user_id    
                    knex.edit_insert(user_id,bio )
                    .then((done)=>{
                        res.send(done)
                    })
                    .catch(err=>{console.log('err inn line 14')})
                }
                else {     
                    var user_id = user_detail.jwt[0].user_id
                    var bio ={"data":req.query}
                    bio.data['birthday'] = new Date(bio.data.birthday) // changed string type of date to date type
                    knex.edit_update(user_id,bio)
                    .then(()=>{
                        res.json("update")
                    })
                    .catch((err)=>{  
                        console.log('error',err)
                        res.send({"message":err})
                    })
                }
            })
            .catch((err)=>{
                res.send(err)
            })
        }
    })       
    })

    app.get('/get_profile',(req,res)=>{
        var token = req.query.token
                jwt.verify(token,'aadil',(err,user_detail)=>{
            if(!err){
                var user_id = user_detail.jwt[0].user_id
                knex.get_pro(user_id)
                .then((pro_user)=>{
                    res.send(pro_user)
                })
                .catch((err)=>{
                    res.send(err)
                })
            }
        })

    })
 
    app.post('/profile_image',(req,res)=>{
        var imageUrl= (req.body.header.imageUrl);
        var token = req.body.header.token
        jwt.verify(token,'aadil',(err,user_detail)=>{
            if(!err){
                var user_id = user_detail.jwt[0].user_id
                knex.pro_post(user_id)
                .then((data)=>{
                    if(data.length==0){
                        knex.pro_insert(user_id,imageUrl)
                        .then(()=>{
                            console.log('insert'); 
                            res.send('insert') 
                        })
                    }
                    else{
                        knex.pro_update(user_id,imageUrl)
                        .then(()=>{
                            console.log('update');
                        })
                        }
                    })
            }
        })
    })

    app.get('/get_bio',(req,res)=>{
        var token = req.query.token
        jwt.verify(token,'aadil',(err,user_detail)=>{
            if(!err){
                var user_id = user_detail.jwt[0].user_id
                knex.get_bio(user_id)
                .then((Bio)=>{
                    console.log(Bio);
                    res.send(Bio)
                })
                .catch((err)=>{
                    res.send(err)
                })  
            }
        })
    })

    app.get('/user_posts',(req,res)=>{
        var token = req.query.token
        jwt.verify(token,'aadil',(err,user_detail)=>{
            if(!err){
                var user_id = user_detail.jwt[0].user_id
                knex.user_posts(user_id)
                .then((get_posts)=>{
                    res.send(get_posts.reverse())
                
                })
                .catch((err)=>{
                    res.send(err)
                })
            }
            else{
                res.send(err)
            }
        })
    })
}