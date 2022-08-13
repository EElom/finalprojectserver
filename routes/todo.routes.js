const express = require("express")
const isAuthenticated = require("../middleware/isAuthenticated")
const router = express.Router()
const Todo = require("../models/Todo.model")

/**
 * Routes prefixed with /api/todos
 */
// C(R)UD - Retrieve all the todos
router.get("/", async (req, res, next) => {
	try {
		const todos = await Todo.find()
		return res.status(200).json(todos)
	} catch (error) {
		next(error)
	}
})

// C(R)UD - Retrieve only one todo by id
router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params
		const todo = await Todo.findById(id)
		return res.status(200).json(todo)
	} catch (error) {
		next(error)
	}
})

// (C)RUD - Create new todo
router.post("/", isAuthenticated, async (req, res, next) => {
	console.log(req.payload)
	try {
		const { name, description, status, dueDate } = req.body
		if (!name) {
			return res.status(400).json({ message: "Name is required" })
		}
		const todo = await Todo.create({ user:req.payload._id, name, description, status, dueDate })
		return res.status(200).json(todo)
	} catch (error) {
		next(error)
	}
})

// CR(U)D - Update one todo by id - PUT
router.put("/:id", async (req, res, next) => {
	try {
		const { id } = req.params
		// const { name, description, status, dueDate } = req.body;
		// const todo = await Todo.findByIdAndUpdate(id, { name, description, staus, dueDate }, { new: true });
		const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true })
		return res.status(200).json(todo)
	} catch (error) {
		next(error)
	}
})

// CRU(D) - Remove one todo by id - DELETE
router.delete("/:id", async (req, res, next) => {
	try {
		const { id } = req.params
		await Todo.findByIdAndDelete(id)
		return res.status(200).json({ message: `Todo ${id} deleted` })
	} catch (error) {
		next(error)
	}
})

module.exports = router