// import mongoose from "mongoose";
// import slugify from "slugify";

// const lessonSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   }
// });

// const moduleSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   lessons: [lessonSchema]
// });

// const courseSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   slug: {
//     type: String,
//     unique: true,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//     required: true,
//   },
//   category: {
//     type: String,
//     required: true,
//     enum: ["Web Development", "Programming", "Computer Science", "Artificial Intelligence", "Blockchain"],
//   },
//   price: {
//     type: Number,
//     default: 0,  // 0 means free, any value above 0 is a paid course
//   },
//   isPaid: {
//     type: Boolean,
//     default: false, // true means the course is paid
//   },
//   learningOutcomes: [{
//     type: String,
//   }],
//   duration: {
//     type: Number,  // Duration in hours
//     required: true,
//   },
//   difficulty: {
//     type: String,
//     enum: ['Beginner', 'Intermediate', 'Advanced'],
//     required: true,
//   },
//   certificateOffered: {
//     type: Boolean,
//     default: false,
//   },
//   modules: [moduleSchema],
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   }
// });

// // Add a pre-save hook to update the 'updatedAt' field and generate slug from title
// courseSchema.pre('save', function(next) {
//   this.updatedAt = Date.now();

//   // Generate slug if it doesn't exist or if the title has changed
//   if (!this.slug || this.isModified('title')) {
//     this.slug = slugify(this.title, { lower: true, strict: true });
//   }

//   next();
// });

// const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

// export default Course;


import mongoose from "mongoose";
import slugify from "slugify";

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,  // Markdown or HTML content for the lesson
    required: true,
  },
  videoUrl: {
    type: String,  // URL of the video for the lesson (optional)
  },
  quiz: [{
    question: { type: String },  // Quiz question
    options: [{ type: String }],  // Answer options
    correctAnswer: { type: String },  // Correct answer
  }]
});

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  lessons: [lessonSchema]  // Each module contains an array of lessons
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Web Development", "Programming", "Computer Science", "Artificial Intelligence", "Blockchain", "Class 12th", "Class 11th", "JEE Mains", "JEE Advanced"],
  },
  price: {
    type: Number,
    default: 0,  // 0 means free, any value above 0 is a paid course
  },
  isPaid: {
    type: Boolean,
    default: false, // true means the course is paid
  },
  learningOutcomes: [{
    type: String,
  }],
  duration: {
    type: Number,  // Duration in hours
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true,
  },
  certificateOffered: {
    type: Boolean,
    default: false,
  },
  modules: [moduleSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Add a pre-save hook to update the 'updatedAt' field and generate slug from title
courseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();

  // Generate slug if it doesn't exist or if the title has changed
  if (!this.slug || this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  next();
});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
