import mongoose from 'mongoose'

/* PopSchema will correspond to a collection in your MongoDB database. */
const PopSchema = new mongoose.Schema({
  title: {
    /* The title of this pop */
    type: String,
    required: [true, 'Please provide a name for this pop.'],
    maxlength: [20, 'Name cannot be more than 60 characters'],
  },
  image_url: {
    /* Url to pop image */
    required: [true, 'Please provide an image url for this pop.'],
    type: String,
  },
  possess: {
    /* Do I own this Pop */
    required: [false],
    type: Boolean,
  }
})

export default mongoose.models.Pop || mongoose.model('Pop', PopSchema)
