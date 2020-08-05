var express = require("express");
var router = express.Router();
var camp = require("../models/camp");
var comment = require("../models/comment");
var middleware = require("../middleware");

//COMMENTS NEW
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req,res){
	
	camp.findById(req.params.id, function(err,camp){
		if(err){
			console.log(err);
		} else{
			res.render("comments/new", {camp:camp});
		}
	})
	
});
//COMMENTS CREATE
router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req,res){
	//find the camp by id
	camp.findById(req.params.id, function(err,camp){
		if(err){
			console.log(err);
			req.flash("error","Something went wrong");
			res.redirect("/campgrounds");
		} else{
			//add a new comment 
			comment.create(req.body.comment, function(err,comment){
				if(err){
					console.log(err);
				} else{
					//add id and the username along with comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					//connect the comment with our camp
					
					camp.comments.push(comment);
					camp.save();
					console.log(comment);
					//redirect the comment to our show page
					req.flash("success","Succesfully added a comment");
					res.redirect("/campgrounds/" + camp._id);
				}
			})
		}
	});
});
//COMMENTS EDIT
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
		  req.flash("error","something went wrong!")
          res.redirect("back");
      } else {
        res.render("comments/edit", {camp_id: req.params.id, comment: foundComment});
      }
   });
});
//COMMENTS UPADTE
router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership , function(req,res){
	comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,updatedComment){
		if(err){
			res.redirect("back");
		} else{
			req.flash("success","Edit done!")
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
	
});
//COMMENTS DESTROY
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req,res){
	//findbyidandremove
	comment.findByIdAndRemove(req.params.comment_id, function(err,deletedComment){
		if(err){
			req.flash("error","Cannot delete the comment")
			res.redirect("back");
		} else{
			req.flash("success","comment deleted! ")
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});





module.exports = router;