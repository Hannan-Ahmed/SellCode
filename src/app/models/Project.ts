import mongoose, { Document, Schema, Model, model } from "mongoose";

// Create an interface representing a document in MongoDB.
export interface IProject extends Document {
  User: mongoose.Schema.Types.ObjectId;
  project_name: string;
  project_desc:string;
  technologies?: string[];
  price:Number;
  imageUrl: string;
  onSale:boolean;
  bought:boolean;
  date: Date;
};


// Create a Schema corresponding to the document interface.
const projectSchema: Schema<IProject> = new Schema<IProject>({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  project_name:   {
    type: String,
    required: false,
    // unique: true,
  },
   project_desc: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  onSale: {
    type: Boolean,
    default:false
  },
  bought: {
    type: Boolean,
    default:false
  },
  technologies:{
    type:[{type:String}],
  },

  date: {
    type: Date,
    default: Date.now, // Reference to Date.now function without invoking it
  },
});

// Define a User model type based on the IProject interface
type ProjectModel = Model<IProject>;

// Check if the model is already defined to prevent redefining it
const Project: ProjectModel =
  (mongoose.models.Project as ProjectModel) ||
  model<IProject>("Project", projectSchema);

export default Project;
