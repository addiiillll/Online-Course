import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Users, Award, Star, ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import Typewriter from "typewriter-effect";
import { Button } from '@/components/ui/button';

function useIntersectionObserver() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once the element is visible
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible];
}

export default function Home({ courses }) {
  const linesRef = useRef(null);
  // Use the custom hook for visibility
  const [heroRef, isHeroVisible] = useIntersectionObserver();
  const [featuresRef, areFeaturesVisible] = useIntersectionObserver();
  const [coursesRef, areCoursesVisible] = useIntersectionObserver();
  const [testimonialRef, isTestimonialVisible] = useIntersectionObserver();
  const [newsletterRef, isNewsletterVisible] = useIntersectionObserver();
  const [randomCourses, setRandomCourses] = useState([]);

  useEffect(() => {
    // Shuffle the courses array and slice the first 3 items
    const shuffledCourses = [...courses].sort(() => 0.5 - Math.random());
    const selectedCourses = shuffledCourses.slice(0, 3);
    setRandomCourses(selectedCourses);
  }, [courses]);

  useEffect(() => {
    if (linesRef.current) {
      linesRef.current.style.backgroundPosition = '0% 0%';
      setTimeout(() => {
        linesRef.current.style.transition = 'background-position 10s linear';
        linesRef.current.style.backgroundPosition = '100% 100%';
      }, 500);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800  dark:text-gray-100">
      {/* Hero Section */}
      <div className="relative h-screen opacity-95 overflow-hidden">
        {/* Background animation */}
        <div
          ref={linesRef}
          className="absolute inset-0 z-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-indigo-900 dark:via-teal-700 dark:to-emerald-900"
          style={{
            backgroundSize: "300% 300%",
            transition: "background-position 20s linear",
          }}
        ></div>

        {/* Typing effect for topics */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
          <div className="mx-auto max-w-5xl py-32 sm:py-48 lg:py-56">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Announcing our next round of funding.{' '}
                <a href="#" className="font-semibold text-indigo-600">
                  <span aria-hidden="true" className="absolute inset-0" />
                  Read more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
            <div className="text-center mx-auto xl:w-full lg:w-full md:w-10/12 sm:w-10/12 w-10/12">
              <h1 className="xl:text-6xl text-white lg:text-5xl md:text-4xl sm:text-3xl text-xl font-bold tracking-tight flex justify-center items-center">
                <span>Preparing for</span>
                <span className="xl:ml-5 lg:ml-5 md:ml-3 sm:ml-2 ml-2"> {/* Add margin to create space */}
                  <Typewriter
                    options={{
                      strings: [
                        "Web Dev?",
                        "Class 10th?",
                        "Class 12th?",
                        "JEE?",
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 70,
                      deleteSpeed: 30,
                    }}
                  />
                </span>
              </h1>
              <p className="mt-8 font-extralight text-white xl:text-2xl lg:text-2xl md:text-xl sm:text-xl text-base leading-8">
                We understand the importance of preparation for your academic and professional goals. Join our community of learners and take the first step toward a successful future!
              </p>


              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button>Start Now</Button>
                <a href="#" className="text-sm font-semibold leading-6">
                  Know about Us <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: BookOpen, title: 'Extensive Library', description: 'Access thousands of courses on various topics' },
              { icon: Users, title: 'Expert Instructors', description: 'Learn from industry professionals and thought leaders' },
              { icon: Award, title: 'Recognized Certificates', description: 'Earn certificates to boost your career prospects' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: areFeaturesVisible ? 1 : 0, y: areFeaturesVisible ? 0 : 20 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-blue-50 dark:bg-gray-700 rounded-lg p-8 text-center hover:shadow-lg transition duration-300"
              >
                <feature.icon className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className=" dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section ref={coursesRef} id="courses" className="py-20 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Popular Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {randomCourses.map((course, index) => (
              <Link
                key={course._id}
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/courses/${course._id}`}
                passHref
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: areCoursesVisible ? 1 : 0, scale: areCoursesVisible ? 1 : 0.9 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 cursor-pointer"
                >
                  <img
                    src={course.image || '/placeholder.svg?height=200&width=400'}
                    alt={course.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                    <div className="flex justify-between items-center text-sm  dark:text-gray-300">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {course.students} students
                      </span>
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-400" />
                        {course.rating}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section ref={testimonialRef} className="py-20 bg-blue-600 dark:bg-blue-800 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Students Say</h2>
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isTestimonialVisible ? 1 : 0 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <p className="text-xl italic mb-8">
                "This platform has completely transformed my learning experience. The courses are engaging,
                and the instructors are top-notch. I've gained valuable skills that have already advanced my career!"
              </p>
              <div className="flex items-center justify-center">
                <img src="/placeholder.svg?height=60&width=60" alt="Student" className="w-16 h-16 rounded-full mr-4" />
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-blue-200 dark:text-blue-300">Web Developer</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section ref={newsletterRef} className="py-20 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated with Our Newsletter</h2>
            <p className=" dark:text-gray-300 mb-8">
              Get the latest updates on new courses, features, and exclusive offers straight to your inbox.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isNewsletterVisible ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full max-w-lg px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-l-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
              />
              <button className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-r-lg hover:bg-blue-700 dark:hover:bg-blue-600">
                Subscribe
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/get`);
  const courses = await res.json();

  return {
    props: {
      courses: Array.isArray(courses) ? courses : [],
    },
  };
}
