const { Schema, model } = require("mongoose")

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
	{
		name: {
			type: String,
			// unique: true -> Ideally, should be unique, but its up to you
			required:[true, 'Please add a name'],
		},
		email: {
			type: String,
			required: [true, 'Please add an email'],
			unique: true,
		},

		password: {
			type: String,
			required: [true, 'Please add a password'],
		}
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	}
)

const User = model("User", userSchema)

module.exports = User
