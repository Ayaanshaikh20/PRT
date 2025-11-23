import React from 'react'
import { Link, useNavigate } from 'react-router'

const Header = () => {

    const navigate = useNavigate()

  return (
    <header className="w-full bg-white shadow-md py-4 px-6 flex items-center gap-6 mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Feedback App</h1>
      <nav className="ml-auto flex items-center gap-4">
        <button onClick={() => navigate("/")} className=" bg-blue-600 p-1 shadow-lg rounded-lg text-white px-3 hover:bg-blue-700 ">
          Submit Feeback
        </button>
        <button
          onClick={() => navigate("/feedbacks")}
          className="text-gray-700 hover:text-blue-600 font-medium transition"
        >
          View All
        </button>
      </nav>
    </header>
  )
}

export default Header