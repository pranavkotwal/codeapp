// conroller is a set of action

module.exports.home = function(req,res){
    return res.end('<h1>Express is up for codeapp</h1>')
}

module.exports.form = function(req,res){
    return res.end(`<h1>You're in form page`)
}

// module.exports.actionName = fucntion(req,res){}