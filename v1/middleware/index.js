var camp = require("../models/camp");
var comment = require("../models/comment");
//ALL MIDDLEWARE GOES HERE
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function( req, res, next){
//ownership
	if(req.isAuthenticated()){
		camp.findById(req.params.id, function(err,foundcampground){
		if(err){
			console.log(err);
			req.flash("error","Campground not found!");
			res.redirect("back");
		} else{
			//does the user owns the campground?
			if(foundcampground.author.id.equals(req.user._id)){
				next();
			} else{
				req.flash("error","permission denied!")
				res.redirect("back");
			}
			
		}
	});
	} else{
		res.redirect("back");
	}
}
	
middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		comment.findById(req.params.comment_id, function(err,foundComment){
		if(err){
			req.flash("error","Campground not found!");
			res.redirect("back");
		} else{
			//does the user owns the comment?
			if(foundComment.author.id.equals(req.user._id)){
				next();
			} else{
				req.flash("error","You dont have permission to do that!");
				res.redirect("back");
			}
			
		}
	});
	} else{
		req.flash("you need to be logged in to do that");
		res.redirect("back");
	}
}
middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to do that");
	res.redirect("/login");
}



module.exports = middlewareObj