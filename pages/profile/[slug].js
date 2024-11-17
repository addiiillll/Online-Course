import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRef } from "react";
import ParticleAnimation from "@/components/ui/particles";
import { Loader2 } from "lucide-react";

const BackgroundAnimation = () => {
    const canvasRef = useRef(null)
  
    useEffect(() => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      let animationFrameId
  
      const resizeCanvas = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
  
      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)
  
      const particles = []
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          dx: (Math.random() - 0.5) * 0.5,
          dy: (Math.random() - 0.5) * 0.5
        })
      }
  
      const drawParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = 'rgba(200, 200, 255, 0.5)'
        particles.forEach(particle => {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
          ctx.fill()
  
          particle.x += particle.dx
          particle.y += particle.dy
  
          if (particle.x < 0 || particle.x > canvas.width) particle.dx = -particle.dx
          if (particle.y < 0 || particle.y > canvas.height) particle.dy = -particle.dy
        })
  
        animationFrameId = requestAnimationFrame(drawParticles)
      }
  
      drawParticles()
  
      return () => {
        window.removeEventListener('resize', resizeCanvas)
        cancelAnimationFrame(animationFrameId)
      }
    }, [])
  
    return <canvas ref={canvasRef} className="fixed inset-0 z-[-1]" />
  }
  

export default function ProfileDetail() {
    const { query } = useRouter();
    const { slug } = query;
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            if (slug) {
                try {
                    const response = await fetch(`/api/profile/${slug}/fetch`);
                    const data = await response.json();

                    if (data.success) {
                        setUser(data.user);
                    } else {
                        console.error(data.message);
                    }
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            }
        }

        fetchUser();
    }, [slug]);

    if (!user) {
        return (
          <div className="flex justify-center items-center h-screen">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        )
      }

    return (
        <>
        <ParticleAnimation/>
            <Container>
                <div className="min-h-screen bg-gradient-to-b from-background to-background/50 text-foreground overflow-hidden">
                    <header className="bg-primary text-primary-foreground py-6 px-4 md:px-6">
                        <div className="container mx-auto max-w-6xl">
                            <h1 className="text-3xl font-bold">{user.name}'s Profile</h1>
                        </div>
                    </header>

                    {/* Profile Information Section */}
                    <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-8 py-12 px-4 md:px-6">
                        <div>
                            <img
                                src={user.profilePic}
                                alt={user.name}
                                width={800}
                                height={450}
                                className="w-full rounded-lg object-cover"
                                style={{ aspectRatio: "800/450", objectFit: "cover" }}
                            />
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold mt-2">{user.name}</h2>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                {/* Add any additional user information here */}
                            </p>
                        </div>
                    </div>

                    {/* User Info Section */}
                    <div className="container mx-auto max-w-6xl py-12 px-4 md:px-6">
                        <h2 className="text-2xl font-bold mb-6">More Info</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card>
                                <CardContent className="flex items-center space-x-4 pt-6">
                                    <div>
                                        <h3 className="font-bold">Email</h3>
                                        <p>{user.email}</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex items-center space-x-4 pt-6">
                                    <div>
                                        <h3 className="font-bold">Phone</h3>
                                        <p>{user.phone}</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex items-center space-x-4 pt-6">
                                    <div>
                                        <h3 className="font-bold">Joined</h3>
                                        <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* User's Enrolled Courses Section */}
                    {user.enrolledCourses && user.enrolledCourses.length > 0 && (
                        <div className="container mx-auto max-w-6xl py-12 px-4 md:px-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Enrolled Courses</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4">
                                        {user.enrolledCourses.map((enrollment, index) => {
                                            const course = enrollment.courseId;
                                            if (!course) return null; // In case course data is missing
                                            return (
                                                <li key={index} className="border-b pb-4">
                                                    <h3 className="text-xl font-bold">{course.title}</h3>
                                                    <p><strong>Course ID:</strong> {course._id}</p>
                                                    <p><strong>Price:</strong> ₹{course.price}</p>
                                                    <p><strong>Is Paid:</strong> {course.isPaid ? 'Yes' : 'No'}</p>
                                                    <p><strong>Enrolled On:</strong> {new Date(enrollment.purchaseDate).toLocaleDateString()}</p>
                                                    <Link href={`/courses/${course.slug}`}>
                                                        <Button size="sm" className="mt-2">View Course</Button>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </Container>
        </>
    );
}
