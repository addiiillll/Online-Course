import mongoose from "mongoose";

const GoogleUserSchema = new mongoose.Schema(
  {
    email: { 
      type: String, 
      trim: true, 
      unique: true 
    },

    hash:{
      type:String
    },
    salt:{
      type:String
    },
    profile: {
      firstName: {
        type: String,
        trim: true,
      },
      lastName: {
        type: String,
        trim: true,
      },
      image: {
        type: String,
        trim: true,
      },
     
    }
 
   
  },
  { timestamps: true }
);

export default mongoose.models.GoogleUsers || mongoose.model("GoogleUsers", GoogleUserSchema);