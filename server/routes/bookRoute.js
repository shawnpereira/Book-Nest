import express from "express";
const router = express.Router();

import { Book } from "../model/bookModel.js";
//
//publish book
//
router.post("/", async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear ||
      !req.body.content
    ) {
      return res.status(400).send({
        message:
          "Send all required fields: title, author, publishYear, content",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
//
//Get all the books from database
//
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length, // so this will display the number of books present

      display: books, // this will display books so we have just structured it properly
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
//
//Get only one book
//
//
router.get("/:id", async (request, response) => {
  try {
    // to test add 65ecc788df735ba00f9c3c46 front of books/
    //65ecc788df735ba00f9c3c46 is a id of existing book copied from database of a book for testing purpose
    const { id } = request.params;

    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
//
//Update
//
router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    // Fetch the first document from the database
    const firstBook = await Book.findOne({}).sort({ createdAt: 1 });

    // Check if the ID matches the ID of the first document
    if (firstBook && id === firstBook._id.toString()) {
      return response
        .status(403)
        .json({ message: "Cannot update the first document." });
    }

    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear ||
      !request.body.content
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//
//Delete
//
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    // Fetch the first document from the database
    const firstBook = await Book.findOne({}).sort({ createdAt: 1 });

    // Check if the ID matches the ID of the first document
    if (firstBook && id === firstBook._id.toString()) {
      return response
        .status(403)
        .json({ message: "Cannot delete the first document." });
    }

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export { router };
