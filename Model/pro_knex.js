const knex = require("./connection")

let edit=(user_id)=>{
    return knex.select('*').from('Bio_detail').havingIn('user_id',user_id)
}
let edit_insert = (user_id ,bio_data)=>{
    return knex.select("*").from("Bio_detail").insert({"Bio_detail.user_id":user_id,"Bio_detail.address":bio_data.data.address,"Bio_detail.bio":bio_data.data.bio,"Bio_detail.education":bio_data.data.education,"Bio_detail.data_brith":bio_data.data.birthday,"Bio_detail.phone_number":bio_data.data.phone,"Bio_detail.email":bio_data.data.email})
}

let edit_update = (user_id, bio_data) =>{
    return knex('Bio_detail').update({"Bio_detail.user_id":user_id,"Bio_detail.address":bio_data.data.address,"Bio_detail.bio":bio_data.data.bio,"Bio_detail.education":bio_data.data.education,"Bio_detail.data_brith":bio_data.data.birthday,"Bio_detail.phone_number":bio_data.data.phone,"Bio_detail.email":bio_data.data.email}).where("user_id",user_id)
}

let pro_post = (user_id)=>{
    return knex.select('*').from('pro_post').havingIn('user_id',user_id)
}

let pro_insert = (user_id,pro_url)=>{
    return knex('pro_post').insert({"user_id":user_id,"pro_url":pro_url})
}

let pro_update  = (user_id,pro_url) =>{
    return knex('pro_post').update({"pro_url":pro_url}).where('user_id',user_id)
}

let get_pro = (user_id)=>{
    return knex('pro_post').select('register.username','pro_url').join('register','register.user_id','=','pro_post.user_id').where('pro_post.user_id',user_id)
}

let get_bio = (user_id) =>{
    return knex('Bio_detail').select('*').where("user_id",user_id)
}

let user_posts = (user_id) =>{
    return  knex('home_post').select('*').where('user_id',user_id)
}

module.exports={edit,edit_insert, edit_update,pro_post,pro_insert, pro_update, get_pro, get_bio , user_posts}