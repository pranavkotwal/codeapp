module.exports.profile = function(req,res){
    return res.render('users',{
        title:"User page",
        users: ["rekha","jaya","sushma","nirma"]
    })
}