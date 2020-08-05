var express = require("express");
var router = express.Router();
var camp = require("../models/camp");
var middleware = require("../middleware");

//INDEX
router.get("/campgrounds", function(req,res){
	//get all the campgrounds from the db 
	camp.find({}, function(err,allCamp){
		if(err){
			console.log(err);
		} else{
			res.render("campgrounds/index",{campgrounds:allCamp});
		}
	});
	
	
});
//create
router.post("/campgrounds", middleware.isLoggedIn, function(req,res){
	//get data from the form and push it into array
	var name = req.body.name;
	var price = req.body.price;
	var img = req.body.img;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name:name , price:price , img:img , description:desc , author:author}
	//create a new campground and save it to our database
	camp.create(newCampground , function(err,newlyCreated){
		if(err){
			console.log(err);
		} else{
			//redirect the information the campgrounds page!
			console.log(newlyCreated);
	        res.redirect("/campgrounds");
	    }
	});
	
});
//form
router.get("/campgrounds/new", middleware.isLoggedIn, function(req,res){
	res.render("campgrounds/new");
});
//show- shows more information about the camp
router.get("/campgrounds/:id", function(req,res){
	//find the campground with the provided id 
	camp.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
		if(err){
			console.log(err);
		} else{
			
			res.render("campgrounds/show",{camp:foundcampground});
		}
	})
	
});
//EDIT
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership,function(req,res){
	    camp.findById(req.params.id, function(err,foundcampground){
			if(err){
				console.log(err);
				
			}
		res.render("campgrounds/edit",{camp:foundcampground});
		});
			});
//UPDATE route
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership , function(req,res){
	//EDIT AND UPDATE THE CORRECT CAMPGROUND
	camp.findByIdAndUpdate(req.params.id, req.body.camp, function(err,updatedCampground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else{
			//REDIRECT TO THE SHOW PAGE
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
	
});
//DESTROY ROUTE
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership ,function(req,res){
	camp.findByIdAndRemove(req.params.id, function(err){
		if(err){
			req.flash("error", "cannot delete the campground!");
			res.redirect("/campgrounds");
		} else{
			req.flash("success", "campground Deleted!");
			res.redirect("/campgrounds");
		}
	});
});









module.exports = router;