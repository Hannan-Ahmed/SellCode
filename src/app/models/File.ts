import mongoose, { Document, Schema, Model, model } from "mongoose";

// Create an interface representing a document in MongoDB.
export interface IFile extends Document {
  Project: mongoose.Schema.Types.ObjectId;

  Files: { fileName: string; content: string }[];
 
};


// Create a Schema corresponding to the document interface.
const FileSchema: Schema<IFile> = new Schema<IFile>({
  Project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  
  Files: [
    {
      fileName: {
        type: String,
      },
      content: {
        type: String,
      },
    },
  ],
});

// Define a User model type based on the IFile interface
type FileModel = Model<IFile>;

// Check if the model is already defined to prevent redefining it
const File: FileModel =
  (mongoose.models.File as FileModel) ||
  model<IFile>("File", FileSchema);

export default File;
