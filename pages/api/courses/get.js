// pages/api/courses.js
import connectToDatabase from "@/lib/mongodb"; // Adjust the path based on your project structure
import Course from "@/models/Courses"; // Adjust the path based on your project structure

export default async function handler(req, res) {
    await connectToDatabase();

    switch (req.method) {
        case "GET":
            try {
                const courses = await Course.find({});
                res.status(200).json(courses);
            } catch (error) {
                res.status(500).json({ error: "Failed to fetch courses" });
            }
            break;
        // Add POST, PUT, DELETE cases here if needed
        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
