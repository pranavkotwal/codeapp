// conroller is a set of action

module.exports.home = function(req,res){
   return res.render('home',{
    title:"Home"
   })
}


// module.exports.actionName = fucntion(req,res){}