const knex=require("./connection")

knex.schema.hasTable('register').then(function (exists) {
    if (!exists){
        return knex.schema.createTable('register', (table) => {
            table.increments('user_id')
            table.string('username'),
            table.string('email').unique(), 
            table.string('password')
        })
        }
        else {
            console.log('allready register table created !');
    
        }
    })
        

knex.schema.hasTable('home_post').then(function (exists) {
    if (!exists) {
        return knex.schema.createTable('home_post', function (table) {
            table.increments('post_id').primary();
            table.integer('user_id')
            table.string("caption") 
            table.string('post_url')
        })
    } else {
        console.log('Allready home_post table ALREADY EXIST!');

    }
})

knex.schema.hasTable('pro_post').then(function (exists) {
    if (!exists) {
        return knex.schema.createTable('pro_post', function (table) {
            table.increments('id').primary();
            table.string('user_id')
            table.string("pro_url");
        })
    } else {
        console.log('pro_post is created table ALREADY EXIST!');

    }
})




knex.schema.hasTable('Bio_detail').then(function (exists) {
    if (!exists) {
    return knex.schema.createTable('Bio_detail', (table) => {
        table.increments('id')
        table.integer("user_id") 
        table.string('education')
        table.string('phone_number')     
        table.date('data_brith')
        table.string('email').unique
        table.string('address')
        table.string('bio')  
        
}) 
} else {
    console.log('Bio__table ALREADY EXIST!');
}
})
 