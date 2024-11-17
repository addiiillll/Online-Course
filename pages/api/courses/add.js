// import connectToDatabase from "@/lib/mongodb";
// import Course from "@/models/Courses";
// import slugify from "slugify";

// export default async function handler(req, res) {
//   await connectToDatabase();

//   if (req.method === "POST") {
//     try {
//       const {
//         title,
//         description,
//         image,
//         category,
//         price,
//         learningOutcomes,
//         duration,
//         difficulty,
//         certificateOffered,
//         modules
//       } = req.body;

//       // Validate required fields
//       if (!title || !description || !image || !category || !duration || !difficulty) {
//         return res.status(400).json({ success: false, message: "Missing required fields" });
//       }

//       // Validate category
//       const validCategories = ["Web Development", "Programming", "Computer Science", "Artificial Intelligence", "Blockchain", "Class 12th", "Class 11th", "JEE Mains", "JEE Advanced"];
//       if (!validCategories.includes(category)) {
//         return res.status(400).json({ success: false, message: "Invalid category" });
//       }

//       // Validate difficulty
//       const validDifficulties = ['Beginner', 'Intermediate', 'Advanced'];
//       if (!validDifficulties.includes(difficulty)) {
//         return res.status(400).json({ success: false, message: "Invalid difficulty level" });
//       }

//       // Additional validation
//       if (typeof price !== 'number' || price < 0) {
//         return res.status(400).json({ success: false, message: "Invalid price" });
//       }

//       if (!Array.isArray(learningOutcomes)) {
//         return res.status(400).json({ success: false, message: "Learning outcomes must be an array" });
//       }

//       if (duration <= 0) {
//         return res.status(400).json({ success: false, message: "Duration must be a positive number" });
//       }

//       if (!Array.isArray(modules)) {
//         return res.status(400).json({ success: false, message: "Modules must be an array" });
//       }

//       // Check if a course with the same slug already exists
//       const existingCourse = await Course.findOne({ slug: slugify(title, { lower: true, strict: true }) });
//       if (existingCourse) {
//         return res.status(400).json({ success: false, message: "A course with this title already exists" });
//       }

//       // Create a new course
//       const newCourse = new Course({
//         title,
//         slug: slugify(title, { lower: true, strict: true }),  // Auto-generate slug from title
//         description,
//         image,
//         category,
//         price: price || 0,
//         isPaid: price > 0,
//         learningOutcomes: learningOutcomes || [],
//         duration,
//         difficulty,
//         certificateOffered: certificateOffered || false,
//         modules: modules || [],
//       });

//       // Save the new course
//       await newCourse.save();
//       return res.status(201).json({ success: true, course: newCourse });

//     } catch (error) {
//       console.error("Error creating course:", error);
//       return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
//     }
//   } else {
//     return res.status(405).json({ success: false, message: "Method not allowed" });
//   }
// }


import connectToDatabase from "@/lib/mongodb";
import Course from "@/models/Courses";
import slugify from "slugify";

export default async function handler(req, res) {
  await connectToDatabase();

  // CREATE a new course (POST)
  if (req.method === "POST") {
    try {
      const {
        title,
        description,
        image,
        category,
        price,
        learningOutcomes,
        duration,
        difficulty,
        certificateOffered,
        modules
      } = req.body;

      // Validate required fields
      if (!title || !description || !image || !category || !duration || !difficulty) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }

      // Validate category
      const validCategories = ["Web Development", "Programming", "Computer Science", "Artificial Intelligence", "Blockchain", "Class 12th", "Class 11th", "JEE Mains", "JEE Advanced"];
      if (!validCategories.includes(category)) {
        return res.status(400).json({ success: false, message: "Invalid category" });
      }

      // Validate difficulty
      const validDifficulties = ['Beginner', 'Intermediate', 'Advanced'];
      if (!validDifficulties.includes(difficulty)) {
        return res.status(400).json({ success: false, message: "Invalid difficulty level" });
      }

      // Additional validation
      if (typeof price !== 'number' || price < 0) {
        return res.status(400).json({ success: false, message: "Invalid price" });
      }

      if (!Array.isArray(learningOutcomes)) {
        return res.status(400).json({ success: false, message: "Learning outcomes must be an array" });
      }

      if (duration <= 0) {
        return res.status(400).json({ success: false, message: "Duration must be a positive number" });
      }

      if (!Array.isArray(modules)) {
        return res.status(400).json({ success: false, message: "Modules must be an array" });
      }

      // Check if a course with the same slug already exists
      const existingCourse = await Course.findOne({ slug: slugify(title, { lower: true, strict: true }) });
      if (existingCourse) {
        return res.status(400).json({ success: false, message: "A course with this title already exists" });
      }

      // Create a new course
      const newCourse = new Course({
        title,
        slug: slugify(title, { lower: true, strict: true }),  // Auto-generate slug from title
        description,
        image,
        category,
        price: price || 0,
        isPaid: price > 0,
        learningOutcomes: learningOutcomes || [],
        duration,
        difficulty,
        certificateOffered: certificateOffered || false,
        modules: modules || [],
      });

      // Save the new course
      await newCourse.save();
      return res.status(201).json({ success: true, course: newCourse });

    } catch (error) {
      console.error("Error creating course:", error);
      return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
  }
  
  // UPDATE an existing course (PUT)
  else if (req.method === "PUT") {
    try {
      const { slug } = req.query;
      const updates = req.body;

      const updatedCourse = await Course.findOneAndUpdate(
        { slug },
        updates,
        { new: true, runValidators: true }
      );

      if (!updatedCourse) {
        return res.status(404).json({ success: false, message: "Course not found" });
      }

      return res.status(200).json({ success: true, course: updatedCourse });

    } catch (error) {
      console.error("Error updating course:", error);
      return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
  }

  // DELETE an existing course (DELETE)
  else if (req.method === "DELETE") {
    try {
      const { slug } = req.query;

      const deletedCourse = await Course.findOneAndDelete({ slug });

      if (!deletedCourse) {
        return res.status(404).json({ success: false, message: "Course not found" });
      }

      return res.status(200).json({ success: true, message: "Course deleted successfully" });

    } catch (error) {
      console.error("Error deleting course:", error);
      return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
  } 
  else {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
