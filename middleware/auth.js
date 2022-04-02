

// note : objects that pass through passport have methods attached to req objects such as log in, isauthenticated
module.exports = {
    ensureAuth: function (req, res, next) {
      if(req.isAuthenticated()) {
          return next()
      }   else {
          res.redirect('/')
      }
    },
    ensureGuest: function(req,res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/dashboard')
        } else {
            return next()
        }
    }
}