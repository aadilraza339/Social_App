var knex = require('knex')({
    client:"mysql",
    connection:{
        user:"root",
        host:"localhost",
        password:"komal123",
        database:"authentication"
    }
})

module.exports=knex


