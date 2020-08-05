var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var campSchema = new Schema({
	name: String,
	price: String,
	img: String,
	description: String,
	author: {
		id:{
			type: Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	
	comments : [
		{
			type: Schema.Types.ObjectId,
			ref: "comment"
		
	}
 ]
});

var camp = mongoose.model("camp", campSchema);
module.exports = camp;