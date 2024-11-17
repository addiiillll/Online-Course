import mongoose from "mongoose";
import slugify from "slugify";
import Course from "./Courses";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  dob: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female']
  },
  profilePic: {
    type: String  // URL or path to the profile picture
  },
  enrolledCourses: [{
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",  // Reference to the Course model
      required: true
    },
    isPaid: {
      type: Boolean,
      required: true
    },
    purchaseDate: {
      type: Date,
      default: Date.now
    }
  }],
  paymentInfo: {
    type: Object,  // Store payment details like Razorpay payment ID, amount, etc.
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save hook to update the 'updatedAt' field
UserSchema.pre('save', function(next) {
  this.updatedAt = Date.now();

  if (!this.slug || this.isModified('username')) {
    this.slug = slugify(this.username, { lower: true, strict: true });
  }


  next();
});

// Avoid model overwrite error
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;


