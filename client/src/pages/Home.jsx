import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdLocalActivity, MdOutlineDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/books")
      .then((response) => {
        setBooks(response.data.display);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-blue-200 p-6">
      <div className="  flex justify-between p-3 mb-5">
        <h1 className=" text-6xl font-semibold ">Book Nest</h1>
        <Link Link to={`/create`}>
          <span className=" rounded-md bg-slate-100 shadow-md hover:bg-white hover:shadow-2xl flex p-4 space-x-5">
            <span className="text-2xl font-semibold ">Add a book</span>{" "}
            <span className=" flex justify-center items-center text-3xl border-2 rounded-full border-slate-600">
              <IoMdAdd />
            </span>
          </span>
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto  bg-blue-200  ">
        {books.map((book, index) => (
          <div
            key={book._id}
            className="p-4 border border-gray-300 rounded-lg bg-slate-100 shadow-md hover:bg-white hover:shadow-2xl "
          >
            <div className="mb-4">
              <span className="font-bold">No:</span>
              <span className="ml-2">{index + 1}</span>
            </div>
            <div className="mb-4">
              <span className="font-bold">Title:</span>
              <span span className="ml-2">
                {book.title}
              </span>
            </div>
            <div className="mb-4">
              <span className="font-bold">Author:</span>
              <span span className="ml-2">
                {book.author}
              </span>
            </div>
            <div className="mb-4">
              <span className="font-bold">Publish Year:</span>
              <span span className="ml-2">
                {book.publishYear}
              </span>
            </div>
            <div className="flex justify-between">
              <Link to={`/details/${book._id}`}>
                <BsInfoCircle className="text-green-800" />
              </Link>
              <Link to={`/edit/${book._id}`}>
                <AiOutlineEdit className="text-yellow-600" />
              </Link>
              <Link to={`/delete/${book._id}`}>
                <MdOutlineDelete className="text-red-600" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
