import { useState } from "react";
import { Button } from "@/components/ui/button";
import Container from "@/components/container";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function AllCourses({ courses, buyNow, cart, addToCart, clearCart, removeFromCart }) {
    const [selectedCategory, setSelectedCategory] = useState("all");

    const filteredCourses = selectedCategory === "all" ? courses : courses.filter((course) => course.category === selectedCategory);

    const handleAddToCart = (course) => {
        addToCart(course._id, course.title, course.price, course.image);
    };

    return (
        <>
            <Container>
                <div className="w-full">
                    <section className="py-8 md:py-12">
                        <div className="container px-4 md:px-6 mx-auto">
                            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold">Categories</h2>
                                <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                                    <Button
                                        variant={selectedCategory === "all" ? "primary" : "outline"}
                                        onClick={() => setSelectedCategory("all")}
                                    >
                                        All
                                    </Button>
                                    <Button
                                        variant={selectedCategory === "Web Development" ? "primary" : "outline"}
                                        onClick={() => setSelectedCategory("Web Development")}
                                    >
                                        Web Development
                                    </Button>
                                    <Button
                                        variant={selectedCategory === "Programming" ? "primary" : "outline"}
                                        onClick={() => setSelectedCategory("Programming")}
                                    >
                                        Programming
                                    </Button>
                                    <Button
                                        variant={selectedCategory === "Computer Science" ? "primary" : "outline"}
                                        onClick={() => setSelectedCategory("Computer Science")}
                                    >
                                        Computer Science
                                    </Button>
                                    <Button
                                        variant={selectedCategory === "Artificial Intelligence" ? "primary" : "outline"}
                                        onClick={() => setSelectedCategory("Artificial Intelligence")}
                                    >
                                        Artificial Intelligence
                                    </Button>
                                    <Button
                                        variant={selectedCategory === "Blockchain" ? "primary" : "outline"}
                                        onClick={() => setSelectedCategory("Blockchain")}
                                    >
                                        Blockchain
                                    </Button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {filteredCourses.map((course) => (
                                    <div key={course._id} className="bg-background rounded-lg overflow-hidden shadow-md dark:shadow-gray-800 hover:shadow-lg transition-shadow relative">
                                        {course.isPaid && (
                                            <Badge variant="destructive" className="absolute top-2 right-2 z-10">
                                                Paid
                                            </Badge>
                                        )}
                                        {!course.isPaid && (
                                            <Badge className="absolute top-2 right-2 z-10">
                                                Free
                                            </Badge>
                                        )}
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            width={400}
                                            height={200}
                                            className="w-full h-48 object-cover"
                                            style={{ aspectRatio: "400/200", objectFit: "cover" }}
                                        />
                                        <div className="p-4">
                                            <h3 className="text-lg font-bold mb-2 line-clamp-1">{course.title}</h3>
                                            <p className="text-muted-foreground mb-4">{course.description}</p>
                                            <div className="flex justify-between items-center">
                                                <Link className={buttonVariants({ variant: "outline" })} href={`/courses/${course.slug}`}>
                                                    View Details
                                                </Link>
                                                <Button>
                                                    Update
                                                </Button>
                                                <Button variant="destructive">
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </Container>
        </>
    );
}

// Fetch courses on the server side
export async function getServerSideProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/get`);
    const courses = await res.json();

    return {
        props: {
            courses,
        },
    };
}