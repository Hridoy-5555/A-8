"use client";
import { Card, CardHeader, CardBody, CardFooter, Image, Button } from "@heroui/react";
import { Star } from "lucide-react";
import Link from "next/link";

interface Course {
  id: number;
  title: string;
  instructor: string;
  duration: string;
  rating: number;
  level: string;
  description: string;
  image: string;
  category: string;
}

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="py-2 hover:scale-[1.02] transition-transform">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={course.image}
          fallbackSrc="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
          width={400}
          height={200}
        />
      </CardHeader>
      <CardBody className="overflow-visible py-2 px-4">
        <h4 className="font-bold text-large mb-1">{course.title}</h4>
        <p className="text-default-500 text-sm">By {course.instructor}</p>
        <div className="flex items-center gap-1 mt-2">
          <Star size={16} className="text-yellow-500 fill-current" />
          <span className="font-semibold">{course.rating}</span>
        </div>
      </CardBody>
      <CardFooter className="px-4">
        <Button as={Link} href={`/courses/${course.id}`} color="primary" fullWidth>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}