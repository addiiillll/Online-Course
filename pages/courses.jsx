import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import Container from "@/components/container";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import ParticleAnimation from "@/components/ui/particles";
import { Loader2 } from "lucide-react";

export default function Courses({ courses, buyNow, cart, addToCart, clearCart, removeFromCart }) {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [accessList, setAccessList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const categories = useMemo(() => {
        const uniqueCategories = new Set(courses.map(course => course.category));
        return ["All", ...Array.from(uniqueCategories)];
    }, [courses]);

    const filteredCourses = useMemo(() => {
        return selectedCategory.toLowerCase() === "all"
            ? courses
            : courses.filter((course) => course.category.toLowerCase() === selectedCategory.toLowerCase());
    }, [courses, selectedCategory]);

    useEffect(() => {
        async function fetchAccess() {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('token');
                const accessResponses = await Promise.all(
                    courses.map(course => {
                        if (course.isPaid) {
                            return fetch(`/api/courses/${course.slug}/check-access`, {
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            });
                        }
                        return null;
                    })
                );

                const accessDataList = await Promise.all(
                    accessResponses.map(res => res ? res.json() : null)
                );

                const accessStatuses = accessDataList.map((accessData, idx) => ({
                    slug: courses[idx].slug,
                    hasAccess: accessData ? accessData.hasAccess : false,
                }));

                setAccessList(accessStatuses);
            } catch (error) {
                console.error("Error fetching course access:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchAccess();
    }, [courses]);

    const handleAddToCart = (course) => {
        addToCart(course._id, course.title, course.price, course.image);
    };

    const hasAccess = (slug) => {
        const accessItem = accessList.find(access => access.slug === slug);
        return accessItem ? accessItem.hasAccess : false;
    };

    return (
        <>
            <ParticleAnimation />
            <Container>
                <div className="min-h-screen bg-gradient-to-b from-background to-background/50 text-foreground overflow-hidden">
                    <section className="bg-primary text-primary-foreground py-16 md:py-24">
                        <div className="container px-4 md:px-6 mx-auto">
                            <div className="max-w-3xl mx-auto text-center space-y-6">
                                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                                    Explore Our Courses
                                </h1>
                                <p className="text-xl md:text-2xl text-primary-foreground/90">
                                    Unlock your potential with our diverse range of online courses.
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="py-12 md:py-16">
                        <div className="container px-4 md:px-6 mx-auto">
                            <div className="flex flex-col md:flex-row items-center justify-between mb-10">
                                <h2 className="text-3xl font-bold mb-6 md:mb-0">Categories</h2>
                                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                    {categories.map((category) => (
                                        <Button
                                            key={category}
                                            variant={selectedCategory.toLowerCase() === category.toLowerCase() ? "default" : "outline"}
                                            onClick={() => setSelectedCategory(category)}
                                            className="rounded-full"
                                        >
                                            {category}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            {isLoading ? (
                                <div className="flex justify-center items-center h-64">
                                    <Loader2 className="w-8 h-8 animate-spin" />
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                    {filteredCourses.map((course) => (
                                        <div key={course._id} className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                                            <div className="relative">
                                                <img
                                                    src={course.image}
                                                    alt={course.title}
                                                    width={400}
                                                    height={200}
                                                    className="w-full h-48 object-cover"
                                                />
                                                <Badge
                                                    variant={course.isPaid ? "destructive" : "secondary"}
                                                    className="absolute top-2 right-2 z-10"
                                                >
                                                    {course.isPaid ? 'Paid' : 'Free'}
                                                </Badge>
                                            </div>
                                            <div className="p-6 flex flex-col flex-grow">
                                                <h3 className="text-xl font-bold mb-2 line-clamp-2">{course.title}</h3>
                                                <p className="text-muted-foreground mb-4 flex-grow line-clamp-3">{course.description}</p>
                                                {course.isPaid && (
                                                    <p className="text-lg font-semibold mb-4">${course.price.toFixed(2)}</p>
                                                )}
                                                <div className="flex justify-between items-center mt-auto">
                                                    <Link
                                                        href={`/courses/${course.slug}`}
                                                        className={buttonVariants({ variant: "outline" })}
                                                    >
                                                        View Details
                                                    </Link>
                                                    {course.isPaid ? (
                                                        hasAccess(course.slug) ? (
                                                            <Button disabled className="bg-green-500 hover:bg-green-600">
                                                                Purchased
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                onClick={() => handleAddToCart(course)}
                                                                disabled={cart[course._id] && cart[course._id].qty > 0}
                                                                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded-full transition-colors duration-300"
                                                            >
                                                                {cart[course._id] && cart[course._id].qty > 0 ? 'In Cart' : 'Add To Cart'}
                                                            </Button>
                                                        )
                                                    ) : (
                                                        <Link href={`/courses/${course.slug}/learn/lecture`}>
                                                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded-full transition-colors duration-300">
                                                                Start Learning
                                                            </Button>
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </Container>
        </>
    );
}

export async function getServerSideProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/get`);
    const courses = await res.json();

    return {
        props: {
            courses,
        },
    };
}