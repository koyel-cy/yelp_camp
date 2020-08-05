var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
var campgrounds = [
		{name:"himalayas" , img:"https://i.pinimg.com/564x/34/02/b7/3402b78a676b7a20a438639831431b04.jpg"},
		{name:"echo bluff" ,img:"https://i.pinimg.com/564x/d9/87/c3/d987c389675aacfc33ee42945cf49ff1.jpg"},
		{name:"salmon creek" , img:"https://i.pinimg.com/564x/0e/57/cb/0e57cb66c7ae0e22aa94467ae1f54320.jpg"},
		{name:"hawn state park" , img:"https://i.pinimg.com/564x/24/c1/97/24c1970bd5b5c165adcef45daa149f2f.jpg"},
		{name:"alley spring" , img:"https://i.pinimg.com/564x/0b/8d/b3/0b8db3f3aab0b8a7f28dad0025b18e24.jpg"},
		{name:"john son shuttins" , img:"https://i.pinimg.com/564x/25/51/05/255105dec813f79e7d6c6f320a193545.jpg"},
		{name:"mount everest" , img:"https://i.pinimg.com/564x/8d/af/93/8daf933f4cbe341982d867b666a3279e.jpg"}
		
	]

app.get("/", function(req,res){
	res.render("landing");
});
app.get("/campgrounds", function(req,res){
	
	res.render("campgrounds",{campgrounds:campgrounds})
});
app.post("/campgrounds", function(req,res){
	//get data from the form and push it into array
	var name = req.body.name;
	var img = req.body.img;
	var newCampground = {name:name , img:img}
	campgrounds.push(newCampground);
	//redirect the information the campgrounds page!
	res.redirect("/campgrounds");
});
app.get("/campgrounds/new",function(req,res){
	res.render("new");
});

app.listen(3000,function(){
	console.log("YELP CAMP IS STARTING! THE SERVER IS STARTING AT PORT 3000!!")
});