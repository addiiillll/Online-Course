import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useTheme } from "next-themes"
import {
    Menu,
    Moon,
    Search,
    Sun,
    X,
    Lock,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import ParticleAnimation from "@/components/ui/particles"
import { Loader2 } from "lucide-react"

export default function Lecture() {
    const { query, push } = useRouter()
    const { slug } = query
    const [course, setCourse] = useState(null)
    const [selectedLesson, setSelectedLesson] = useState(null)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const { theme, setTheme } = useTheme()
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredLessons, setFilteredLessons] = useState([])
    const [quizAnswers, setQuizAnswers] = useState({})
    const [quizResults, setQuizResults] = useState(null)
    const [hasAccess, setHasAccess] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        setIsAuthenticated(!!token)

        async function fetchCourse() {
            if (slug) {
                try {
                    const response = await fetch(`/api/courses/${slug}/fetch`)
                    const data = await response.json()

                    if (data.success) {
                        setCourse(data.course)
                        const allLessons = data.course.modules.flatMap(module => module.lessons)
                        setFilteredLessons(allLessons)

                        if (data.course.isPaid) {
                            // Check if the user has access to the course
                            const accessResponse = await fetch(`/api/courses/${slug}/check-access`, {
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            })
                            const accessData = await accessResponse.json()
                            setHasAccess(accessData.hasAccess)

                            if (accessData.hasAccess) {
                                // Retrieve the saved lesson from session storage
                                const savedLessonId = sessionStorage.getItem(`selectedLesson_${slug}`)
                                if (savedLessonId) {
                                    const savedLesson = allLessons.find(lesson => lesson._id === savedLessonId)
                                    if (savedLesson) {
                                        setSelectedLesson(savedLesson)
                                    } else {
                                        // If saved lesson not found, set the first lesson
                                        setSelectedLesson(allLessons[0])
                                    }
                                } else {
                                    // If no saved lesson, set the first lesson
                                    setSelectedLesson(allLessons[0])
                                }
                            }
                        } else {
                            // If the course is free, grant access automatically
                            setHasAccess(true)
                            setSelectedLesson(allLessons[0])
                        }
                    } else {
                        console.error(data.message)
                    }
                } catch (error) {
                    console.error("Error fetching course:", error)
                }
            }
        }

        fetchCourse()
    }, [slug])

    useEffect(() => {
        if (course) {
            const allLessons = course.modules.flatMap(module => module.lessons)
            const filtered = allLessons.filter(lesson =>
                lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setFilteredLessons(filtered)
        }
    }, [searchTerm, course])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleQuizAnswer = (questionIndex, answer) => {
        setQuizAnswers(prev => ({
            ...prev,
            [questionIndex]: answer
        }))
    }

    const handleQuizSubmit = (e) => {
        e.preventDefault()
        if (selectedLesson && selectedLesson.quiz) {
            const results = selectedLesson.quiz.map((question, index) => ({
                question: question.question,
                userAnswer: quizAnswers[index],
                correctAnswer: question.correctAnswer,
                isCorrect: quizAnswers[index] === question.correctAnswer
            }))
            setQuizResults(results)
        }
    }

    const handleLessonSelect = (lesson) => {
        setSelectedLesson(lesson)
        setIsSidebarOpen(false)
        setQuizAnswers({})
        setQuizResults(null)
        // Save the selected lesson to session storage
        sessionStorage.setItem(`selectedLesson_${slug}`, lesson._id)
    }

    if (!course) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin" />
                <h1>Authenticating</h1>
            </div>
        )
    }

    // If it's a paid course and the user is not authenticated
    if (course.isPaid && !isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold mb-4">Please log in to access this course</h1>
                <Button onClick={() => push("/auth/signin")}>Log In</Button>
            </div>
        )
    }

    // If it's a paid course and the user doesn't have access
    if (course.isPaid && !hasAccess) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold mb-4">You don't have access to this course</h1>
                <p className="mb-4">This is a paid course. Please purchase it to gain access.</p>
                <Button onClick={() => push(`/courses/${slug}`)}>Go to Course Page</Button>
            </div>
        )
    }

    return (
        <>
            <ParticleAnimation />
            <div className="flex min-h-screen bg-gradient-to-b from-background to-background/50 text-foreground overflow-hidden">
                {/* Sidebar */}
                <aside
                    className={`w-64 border-r bg-card transition-all duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        } fixed inset-y-0 left-0 z-50 md:relative md:translate-x-0`}
                >
                    <div className="flex h-full flex-col">
                        <div className="flex h-14 items-center border-b px-4">
                            <h2 className="text-lg font-semibold">Course Content</h2>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="ml-auto md:hidden"
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <nav className="flex-1 overflow-y-auto p-4">
                            <Accordion type="single" collapsible className="w-full">
                                {course.modules && course.modules.length > 0 ? (
                                    course.modules.map((module, moduleIndex) => (
                                        <AccordionItem key={moduleIndex} value={`module-${moduleIndex}`}>
                                            <AccordionTrigger className="text-sm font-medium">
                                                {module.title}
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                {module.lessons && module.lessons.length > 0 ? (
                                                    <ul className="space-y-1 pl-4">
                                                        {module.lessons.map((lesson, lessonIndex) => (
                                                            <li key={lessonIndex}>
                                                                <Button
                                                                    variant="ghost"
                                                                    className="w-full justify-start text-left text-sm"
                                                                    onClick={() => handleLessonSelect(lesson)}
                                                                >
                                                                    {lesson.title}
                                                                    {lesson.isFree ? (
                                                                        <Badge variant="secondary" className="ml-2">Free</Badge>
                                                                    ) : (
                                                                        <Lock className="ml-2 h-4 w-4" />
                                                                    )}
                                                                </Button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p className="text-sm text-muted-foreground">No lessons available</p>
                                                )}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">No modules available</p>
                                )}
                            </Accordion>
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex flex-1 flex-col overflow-hidden">
                    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:px-6">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu className="h-6 w-6" />
                        </Button>
                        <div className="flex-1">
                            <form>
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search lessons..."
                                        className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                                        value={searchTerm}
                                        onChange={handleSearch}
                                    />
                                </div>
                            </form>
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                        {selectedLesson ? (
                            <div className="space-y-6">
                                <h1 className="text-2xl font-bold">{selectedLesson.title}</h1>
                                {selectedLesson.videoUrl && (
                                    <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
                                        <iframe
                                            src={selectedLesson.videoUrl}
                                            title={selectedLesson.title}
                                            className="w-full h-full"
                                            allowFullScreen
                                        />
                                    </div>
                                )}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Lesson Content</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{selectedLesson.content}</p>
                                    </CardContent>
                                </Card>
                                {selectedLesson.quiz && selectedLesson.quiz.length > 0 && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Quiz</CardTitle>
                                            <CardDescription>Test your knowledge</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <form onSubmit={handleQuizSubmit} className="space-y-4">
                                                {selectedLesson.quiz.map((question, quizIndex) => (
                                                    <div key={quizIndex} className="space-y-2">
                                                        <h3 className="font-medium">{question.question}</h3>
                                                        <div className="space-y-1">
                                                            {question.options.map((option, optionIndex) => (
                                                                <label
                                                                    key={optionIndex}
                                                                    className="flex items-center space-x-2"
                                                                >
                                                                    <input
                                                                        type="radio"
                                                                        name={`question-${quizIndex}`}
                                                                        value={option}
                                                                        checked={quizAnswers[quizIndex] === option}
                                                                        onChange={() => handleQuizAnswer(quizIndex, option)}
                                                                        className="form-radio"
                                                                    />
                                                                    <span>{option}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                                <Button type="submit">Submit Quiz</Button>
                                            </form>
                                            {quizResults && (
                                                <div className="mt-4">
                                                    <h3 className="font-medium">Quiz Results</h3>
                                                    {quizResults.map((result, index) => (
                                                        <div key={index} className="mt-2">
                                                            <p>Your answer: {result.userAnswer}</p>
                                                            <p>Correct answer: {result.correctAnswer}</p>
                                                            <Badge variant={result.isCorrect ? "success" : "destructive"}>
                                                                {result.isCorrect ? "Correct" : "Incorrect"}
                                                            </Badge>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        ) : (
                            <p className="text-center text-muted-foreground">Select a lesson to view the content</p>
                        )}
                    </main>
                </div>
            </div>
        </>
    )
}