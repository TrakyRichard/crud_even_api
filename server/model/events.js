import  mongoose  from 'mongoose';

const eventSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    dateofevent: {
        type: Date,
        required: true
    },
    dateofcreation: {
        type: Date,
        required: true,
        default: Date.now()
    },
    place: {
        type: String,
        required: true
    }
})

export default mongoose.model('Event', eventSchema);