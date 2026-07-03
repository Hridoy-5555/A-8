import React from "react";
import { Link } from "react-router-dom";
import courses from "../data/courses.json";

export default function Home() {
  const popularCourses = [...courses].sort((a, b) => b.rating - a.rating).slice(0, 3);
  const trendingCourses = courses.filter(c => c.trending);

  return (
    <div className="space-y-16 pb-16">
      {/* 🎥 Hero Section */}
      <section className="hero min-h-[40vh] bg-base-200 px-6 text-center">
        <div className="hero-content">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Upgrade Your Skills Today 🚀</h1>
            <p className="py-6 text-gray-600">Learn from Industry Experts and advance your goals smoothly.</p>
            <Link to="/courses" className="btn btn-primary">Explore Courses</Link>
          </div>
        </div>
      </section>

      {/* 🔥 Popular Courses */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Popular Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularCourses.map(course => (
            <div key={course.id} className="card bg-base-100 shadow-xl border">
              <figure className="px-4 pt-4"><img src={course.image} alt={course.title} className="rounded-xl h-48 w-full object-cover" /></figure>
              <div className="card-body">
                <h2 className="card-title text-lg">{course.title}</h2>
                <p className="text-sm text-gray-500">By {course.instructor}</p>
                <div className="badge badge-secondary">⭐ {course.rating}</div>
                <div className="card-actions justify-end mt-4">
                  <Link to={`/courses/${course.id}`} className="btn btn-primary btn-sm">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 👉 Extra Section: Trending Releases */}
      <section className="container mx-auto px-4 bg-base-200 py-8 rounded-2xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-secondary">👉 Trending Releases</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trendingCourses.map(course => (
            <div key={course.id} className="card bg-base-100 shadow-sm border p-4">
              <div className="flex items-center gap-4">
                <img src={course.image} alt="Course" className="rounded-lg object-cover w-16 h-16" />
                <div>
                  <h3 className="font-bold text-sm">{course.title}</h3>
                  <Link to={`/courses/${course.id}`} className="text-primary text-xs underline mt-1 block">Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 📌 Learning Tips Section */}
      <section className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="text-3xl font-bold mb-6">Learning Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div className="alert bg-info/10 border-info border shadow-sm">
            <div>
              <h3 className="font-bold">Active Memory Testing</h3>
              <p className="text-xs">Quiz yourself immediately after consuming lectures to secure retention.</p>
            </div>
          </div>
          <div className="alert bg-success/10 border-success border shadow-sm">
            <div>
              <h3 className="font-bold">Time Blocks</h3>
              <p className="text-xs">Dedicate a specific, isolated 45-minute sprint block every evening.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🏆 Top Instructors */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Top Instructors</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {["John Doe", "Jane Smith", "Sarah Connor"].map((name, idx) => (
            <div key={idx} className="flex flex-col items-center p-4 border rounded-xl w-40 bg-base-100 shadow-sm">
              <div className="avatar mb-2">
                <div className="w-16 rounded-full">
                  <img src={`https://i.pravatar.cc/150?img=${idx + 15}`} alt={name} />
                </div>
              </div>
              <h4 className="font-semibold text-center text-sm">{name}</h4>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}