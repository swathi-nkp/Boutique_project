import mongoose from "mongoose";

const boutiqueSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",          // connects to User model
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ""
  },
  logo: {
    type: String,        // image URL from cloudinary
    default: ""
  },
  location: {
    type: String,
    default: ""
  },
  phone: {
    type: String,
    default: ""
  },
  category: {
    type: String,
    enum: ["bridal", "casual", "kids", "traditional", "western", "all"],
    default: "all"
  },
  isApproved: {
    type: Boolean,
    default: false       // admin must approve boutique
  },
  rating: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model("Boutique", boutiqueSchema);