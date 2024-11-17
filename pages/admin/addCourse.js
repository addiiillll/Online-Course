import React, { useState } from 'react'
import axios from 'axios'
import { Plus, Minus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AddCourse() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(0)
  const [learningOutcomes, setLearningOutcomes] = useState([''])
  const [duration, setDuration] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [certificateOffered, setCertificateOffered] = useState(false)
  const [modules, setModules] = useState([{ title: '', lessons: [{ title: '', content: '' }] }])

  const handleLearningOutcomeChange = (index, value) => {
    const updatedOutcomes = [...learningOutcomes]
    updatedOutcomes[index] = value
    setLearningOutcomes(updatedOutcomes)
  }

  const handleModuleChange = (index, value) => {
    const updatedModules = [...modules]
    updatedModules[index].title = value
    setModules(updatedModules)
  }

  const handleLessonChange = (moduleIndex, lessonIndex, field, value) => {
    const updatedModules = [...modules]
    updatedModules[moduleIndex].lessons[lessonIndex][field] = value
    setModules(updatedModules)
  }

  const addLearningOutcome = () => setLearningOutcomes([...learningOutcomes, ''])
  const removeLearningOutcome = (index) => {
    const updatedOutcomes = learningOutcomes.filter((_, i) => i !== index)
    setLearningOutcomes(updatedOutcomes)
  }

  const addModule = () => setModules([...modules, { title: '', lessons: [{ title: '', content: '' }] }])
  const removeModule = (index) => {
    const updatedModules = modules.filter((_, i) => i !== index)
    setModules(updatedModules)
  }

  const addLesson = (moduleIndex) => {
    const updatedModules = [...modules]
    updatedModules[moduleIndex].lessons.push({ title: '', content: '' })
    setModules(updatedModules)
  }
  const removeLesson = (moduleIndex, lessonIndex) => {
    const updatedModules = [...modules]
    updatedModules[moduleIndex].lessons = updatedModules[moduleIndex].lessons.filter((_, i) => i !== lessonIndex)
    setModules(updatedModules)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newCourse = {
      title,
      description,
      image,
      category,
      price: Number(price),
      learningOutcomes,
      duration: Number(duration),
      difficulty,
      certificateOffered,
      modules
    }

    try {
      const response = await axios.post('/api/courses/add', newCourse)
      console.log('Course created successfully:', response.data)
    } catch (error) {
      console.error('Error creating course:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Add a New Course</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Course Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Image URL</label>
                <Input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Web Development">Web Development</SelectItem>
                    <SelectItem value="Programming">Programming</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Artificial Intelligence">Artificial Intelligence</SelectItem>
                    <SelectItem value="Blockchain">Blockchain</SelectItem>
                    <SelectItem value="Class 12th">Class 12th</SelectItem>
                    <SelectItem value="Class 11th">Class 11th</SelectItem>
                    <SelectItem value="JEE Mains">JEE Mains</SelectItem>
                    <SelectItem value="JEE Advanced">JEE Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Price</label>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Duration (in hours)</label>
                <Input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Difficulty</label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="certificate"
                  checked={certificateOffered}
                  onCheckedChange={setCertificateOffered}
                />
                <label htmlFor="certificate" className="text-sm font-medium">
                  Certificate Offered
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learning Outcomes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {learningOutcomes.map((outcome, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  type="text"
                  value={outcome}
                  onChange={(e) => handleLearningOutcomeChange(index, e.target.value)}
                  placeholder={`Learning Outcome ${index + 1}`}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeLearningOutcome(index)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" onClick={addLearningOutcome}>
              <Plus className="h-4 w-4 mr-2" />
              Add Learning Outcome
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Modules & Lessons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {modules.map((module, moduleIndex) => (
              <Card key={moduleIndex}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Module {moduleIndex + 1}
                  </CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeModule(moduleIndex)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Module Title"
                    value={module.title}
                    onChange={(e) => handleModuleChange(moduleIndex, e.target.value)}
                  />
                  {module.lessons.map((lesson, lessonIndex) => (
                    <Card key={lessonIndex}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Lesson {lessonIndex + 1}
                        </CardTitle>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeLesson(moduleIndex, lessonIndex)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Input
                          type="text"
                          placeholder="Lesson Title"
                          value={lesson.title}
                          onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'title', e.target.value)}
                        />
                        <Textarea
                          placeholder="Lesson Content"
                          value={lesson.content}
                          onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'content', e.target.value)}
                        />
                      </CardContent>
                    </Card>
                  ))}
                  <Button type="button" variant="outline" onClick={() => addLesson(moduleIndex)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Lesson
                  </Button>
                </CardContent>
              </Card>
            ))}
            <Button type="button" onClick={addModule}>
              <Plus className="h-4 w-4 mr-2" />
              Add Module
            </Button>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full">
          Submit Course
        </Button>
      </form>
    </div>
  )
}