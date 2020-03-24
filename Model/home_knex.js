const knex = require ('./connection')


let user_id = (user_id,caption,post_url) =>{    
    return knex('home_post').insert({"user_id":user_id,"caption":caption,"post_url":post_url})
}


let get_post = () =>{
    return knex ('home_post').select('home_post.post_id',"register.Username",'home_post.user_id',"home_post.caption","home_post.post_url").join('register',"home_post.user_id",'=','register.user_id').orderBy("home_post.post_id","asc")
}


let get_user = () =>{
    return knex('register').select('username')
}

module.exports = {user_id, get_post, get_user}