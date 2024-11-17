import connectToDatabase from "@/lib/mongodb";
import Course from "@/models/Courses";

export default async function handler(req, res) {
  await connectToDatabase();

  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      const deletedCourse = await Course.findByIdAndDelete(id);

      if (!deletedCourse) {
        return res.status(404).json({ success: false, message: "Course not found" });
      }

      return res.status(200).json({ success: true, message: "Course deleted" });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
