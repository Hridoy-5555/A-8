import React, { useState } from "react";
import { Link } from "react-router-dom";
import coursesData from "../data/courses.json";

export default function AllCourses() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = coursesData.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">All Courses</h1>
      
      <div className="form-control max-w-md mx-auto mb-10">
        <input 
          type="text" 
          placeholder="Search courses by title..." 
          className="input input-bordered w-full shadow" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <div key={course.id} className="card bg-base-100 shadow-md border">
            <figure><img src={course.image} alt={course.title} className="h-48 w-full object-cover" /></figure>
            <div className="card-body">
              <h2 className="card-title text-base">{course.title}</h2>
              <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="badge badge-outline">{course.level}</span>
                <span className="text-yellow-600 font-bold">⭐ {course.rating}</span>
              </div>
              <div className="card-actions justify-end mt-4">
                <Link to={`/courses/${course.id}`} className="btn btn-primary btn-block">Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}