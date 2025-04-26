import { Schema, model } from 'mongoose';
const NoteSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate: (value) => {
            if (!value.match(/^[A-Z]/)) {
                throw new Error('Note title must start with a capital letter');
            }
        },
    },
    body: {
        type: String,
        required: true,
        trim: true,
    },
    color: {
        type: String,
        trim: true,
        default: 'yellow',
        enum: ['blue', 'green', 'red', 'yellow', 'magenta'],
    },
});
export const Note = model('Note', NoteSchema);
