const nodemailer = require('../config/nodemailer')

// this is another way of exporting function

exports.newComment = (comment) => {
    console.log('inside newComment mailer')

    nodemailer.transporter.sendMail({
        from: ' parnavkotwal100@gmail.com',
        to: comment.user.email,
        subject:'New Comment Published',
        html: '<h1> Your comment is published'

    },(err,info)=>{
        if(err){
            console.log('Error in sending mail',err)
            return
        }
        console.log('message sent',info)
        return
    }
    
    
    )
}