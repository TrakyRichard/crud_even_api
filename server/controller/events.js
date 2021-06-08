let host = process.env.HOST || 'http://localhost:5000'

export const getEvents = (req, res, next) => {
    Event.find().select('_id title subtitle desc dateofcreation dateofevent place').exec().then(docs => {
     const response = {
         count: docs.length,
         events: docs.map(doc => {
             return {
                 _id: doc._id,
                 title: doc.title,
                 subtitle: doc.subtitle,
                 desc: doc.desc,
                 dateofevent: doc.dateofevent,
                 dateofcreation: doc.dateofcreation,
                 request: {
                     type: 'GET',
                     url: host + '/events/' + doc._id
                 }
             }
         })
     }
        console.log(response);
        res.status(200).json(response);
    }).catch((err) => next(err))
 };

 export const createEvent = (req, res, next) => {
    const event = new Event({
        _id: new mongoose.Types.ObjectId,
        title: req.body.title,
        subtitle: req.body.subtitle,
        desc: req.body.desc,
        dateofevent: req.body.dateofevent,
        place: req.body.place
    });

    event.save().then((result) => {
        console.log(result);
        res.status(200).json({message: "Event Created successfully", createdEvent: {
            _id: result._id,
            title: result.title,
            subtitle: result.subtitle,
            desc: result.desc,
            dateofevent: result.dateofevent,
            dateofcreation: result.dateofcreation,
            request: {
                type: 'GET',
                url:  + '/events/' + result._id
            }
        }});
    }).catch(err => next(err))
}

export const getEvent = (req,res,next)=> {
    const { userId } = req.params;
    Event.findById(userId).exec().then((result) => {
        
        if (result)
           return res.status(200).json(result);
        else
            return res.status(404).json({message: "No id available"})
    }).catch(err => {
        next(err);
    })
}
import Event from "../model/events.js";
import mongoose from 'mongoose';

export const deleteEvent = (req, res, next) => {
    const { userId } = req.params;
    Event.remove({_id: userId}).exec().then((result) => {
        res.status(200).json({
            message: "The event has been removed successfully"
        });
    }).catch(err => next(err));
}

export const updateEvent = (req, res, next) => {
    const {userId} = req.params;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Event.updateOne({_id: userId}, {$set: updateOps}).exec().then(result => {
        console.log(result);
        res.status(200).json({
            message: "The events has been updated successfully",
            request: {
                method: "GET",
                url: host + "/events/" + userId
            }
        });
    }).catch(err => next(err))
}