import React from "react";
import { useParams } from "react-router-dom";
import coursesData from "../data/courses.json";

export default function CourseDetails() {
  const { id } = useParams();
  const course = coursesData.find(c => c.id === Number(id));

  if (!course) return <p className="text-center p-8">Course not found.</p>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="card lg:card-side bg-base-100 shadow-xl border">
        <figure className="lg:w-1/2"><img src={course.image} alt="Banner" className="object-cover w-full h-full" /></figure>
        <div className="card-body lg:w-1/2">
          <span className="badge badge-primary">{course.category}</span>
          <h1 className="card-title text-3xl font-extrabold">{course.title}</h1>
          <p className="text-gray-600 my-2">{course.description}</p>
          <div className="text-sm space-y-1 bg-gray-50 p-3 rounded-lg">
            <p><strong>Instructor:</strong> {course.instructor}</p>
            <p><strong>Duration:</strong> {course.duration}</p>
            <p><strong>Difficulty Level:</strong> {course.level}</p>
          </div>

          <h3 className="font-bold text-lg mt-4 border-b pb-1">Curriculum Breakdown</h3>
          <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
            <li>Module 1: Basic Foundations Setup</li>
            <li>Module 2: Practical Exercises & Deep Dives</li>
            <li>Module 3: Advanced Architectures & Production Run</li>
          </ul>
        </div>
      </div>
    </div>
  );
}