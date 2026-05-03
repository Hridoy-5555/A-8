"use client";
import { Card, CardHeader, CardBody, CardFooter, Image, Button } from "@heroui/react";
import { Star, Flame } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function CourseCard({ course }: { course: Course }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5 }}
    >
      <Card className="py-2 h-full shadow-lg hover:shadow-xl transition-shadow border-none bg-background/60 dark:bg-default-100/50 backdrop-blur-md relative overflow-hidden">
        {course.rating >= 4.8 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            className="absolute top-4 right-4 z-20 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg pointer-events-none"
          >
            <Flame size={12} fill="currentColor" />
            POPULAR
          </motion.div>
        )}
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <Image
            alt="Card background"
            className="object-cover rounded-xl hover:scale-110 transition-transform duration-500"
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
          <motion.div whileTap={{ scale: 0.95 }} className="w-full">
            <Button as={Link} href={`/courses/${course.id}`} color="primary" fullWidth variant="shadow">
              View Details
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}