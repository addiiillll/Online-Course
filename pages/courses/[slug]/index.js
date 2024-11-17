import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, BarChart, Award, Loader2 } from "lucide-react";
import Link from "next/link";
import ParticleAnimation from "@/components/ui/particles";

export default function CourseDetail({ buyNow }) {
    const { query } = useRouter();
    const { slug } = query;
    const [course, setCourse] = useState(null);
    const [hasAccess, setHasAccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchCourseAndAccess() {
            if (slug) {
                try {
                    setIsLoading(true);
                    const courseResponse = await fetch(`/api/courses/${slug}/fetch`);
                    const courseData = await courseResponse.json();

                    if (courseData.success) {
                        setCourse(courseData.course);

                        // Check for user access if the course is paid
                        if (courseData.course.isPaid) {
                            const token = localStorage.getItem('token');
                            const accessResponse = await fetch(`/api/courses/${slug}/check-access`, {
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            });
                            const accessData = await accessResponse.json();
                            setHasAccess(accessData.hasAccess);
                        } else {
                            // If the course is free, set hasAccess to true
                            setHasAccess(true);
                        }
                    } else {
                        console.error(courseData.message);
                    }
                } catch (error) {
                    console.error("Error fetching course or access:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        }

        fetchCourseAndAccess();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    if (!course) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Course not found</p>
            </div>
        );
    }
    return (
        <>
        <ParticleAnimation/>
            <Container>
                <div className=" bg-gradient-to-b from-background to-background/50 text-foreground overflow-hidden">
                    <header className="bg-primary text-primary-foreground py-6 px-4 md:px-6">
                        <div className="container mx-auto max-w-6xl">
                            <h1 className="text-3xl font-bold">{course.title}</h1>
                        </div>
                    </header>
                    <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-8 py-12 px-4 md:px-6">
                        <div>
                            <img
                                src={course.image}
                                alt={course.title}
                                width={800}
                                height={450}
                                className="w-full rounded-lg object-cover"
                                style={{ aspectRatio: "800/450", objectFit: "cover" }}
                            />
                        </div>
                        <div className="space-y-6">
                            <div>
                                <div className="inline-block rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                                    {course.category}
                                </div>
                                <h2 className="text-2xl font-bold mt-2">{course.title}</h2>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                {course.description}
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-muted-foreground">Price</p>
                                    <p className="font-bold text-lg">{course.isPaid ? `₹${course.price.toFixed(2)}` : "Free"}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Access</p>
                                    <p className="font-bold text-lg">{course.isPaid ? "Paid" : "Free"}</p>
                                </div>
                            </div>
                            {course.isPaid && !hasAccess && (
                                <Button onClick={buyNow} size="lg" className="w-full">
                                    Enroll Now
                                </Button>
                            )}
                            {(hasAccess || !course.isPaid) && (
                                <Link href={`/courses/${course.slug}/learn/lecture`}>
                                    <Button size="lg" className="w-full mt-4">
                                        Start Now
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* What You'll Learn Section */}
                    <div className="container mx-auto max-w-6xl py-12 px-4 md:px-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>What You'll Learn</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {course.learningOutcomes.map((outcome, index) => (
                                        <li key={index} className="flex items-center space-x-2">
                                            <CheckCircle className="text-green-500" />
                                            <span>{typeof outcome === 'object' ? outcome.title : outcome}</span> {/* Adjust if outcome is an object */}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    {/* More Info Section */}
                    <div className="container mx-auto max-w-6xl py-12 px-4 md:px-6">
                        <h2 className="text-2xl font-bold mb-6">More Info</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card>
                                <CardContent className="flex items-center space-x-4 pt-6">
                                    <Clock className="h-10 w-10 text-primary" />
                                    <div>
                                        <h3 className="font-bold">Duration</h3>
                                        <p>{course.duration} hours</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex items-center space-x-4 pt-6">
                                    <BarChart className="h-10 w-10 text-primary" />
                                    <div>
                                        <h3 className="font-bold">Difficulty</h3>
                                        <p>{course.difficulty}</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex items-center space-x-4 pt-6">
                                    <Award className="h-10 w-10 text-primary" />
                                    <div>
                                        <h3 className="font-bold">Certificate</h3>
                                        <p>{course.certificateOffered ? "Yes" : "No"}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Course Content Section */}
                    <div className="container mx-auto max-w-6xl py-12 px-4 md:px-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Course Content</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4">
                                    {course.modules.map((module, index) => (
                                        <li key={index}>
                                            <h3 className="font-bold">{module.title}</h3>
                                            <ul className="ml-6 list-disc">
                                                {module.lessons.map((lesson, lessonIndex) => (
                                                    <li key={lessonIndex}>
                                                        {typeof lesson === 'object' ? lesson.title || lesson.name : lesson} {/* Access valid property */}
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Container>
        </>
    );
}
