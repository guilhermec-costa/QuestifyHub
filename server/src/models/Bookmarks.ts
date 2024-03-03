import mongoose, {Model} from "mongoose"
const { Types } = mongoose.Schema;

const BookmarkSchema = new mongoose.Schema({
    title: {
        type: Types.String,
        required: true
    },

    link: {
        type: Types.String,
        required: true
    }},
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
);

const BookmarkModel = mongoose.model("Bookmark", BookmarkSchema);
export default BookmarkModel;

