const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    image: {
        type: Schema.Types.ObjectId,
        ref: 'Image', // Reference to the Images schema
        required: true,
    },
    questionText: {
        type: String,
        required: true,
    },
    answerText: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User schema (creator)
        required: true,
    },
    status: {
        type: Schema.Types.String,
        required: true,
        enum: ["submitted", "approved"],
        default: "submitted"
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User schema (approving admin)
    },
    creationTime: {
        type: Date,
        default: Date.now, // Set the default creation time to the current date and time
    },
    approvalTime: {
        type: Date,
    },
});

questionSchema.pre(['remove', 'deleteOne'], { document: true, query: false }, async function (next) {
    console.log('Inside questionSchema deleteOne pre middleware')
    try {
        const questionId = this._id;
        console.log('questionId = ', questionId)

        // Fetch the question before deletion
        const question = await mongoose.model('Question').findOne({ _id: questionId });

        if (question) {
            // Remove the reference from users collection
            await mongoose.model('User').updateMany({ questions: questionId }, { $pull: { questions: questionId } });

            // Remove the reference from images collection
            await mongoose.model('Image').updateMany({ questions: questionId }, { $pull: { questions: questionId } });
        }
        
        next()
    } catch (error) {
        console.error('Error in pre-middleware: ', error);
        next(error) // Pass the error to the next middleware/handler
    }
});

questionSchema.pre('deleteMany', { document: false, query: true }, async function (next) {
    console.log('Inside questionSchema deleteMany pre middleware')
    try {
        const conditions = this.getQuery();

        console.log(`conditions questions deleteMany = ${JSON.stringify(conditions)}`)
        // Check if there are conditions for questions
        if (conditions) {
            console.log('Inside if condition for questions deleteMany')
            // Fetch questions before deletion based on the conditions
            const questions = await mongoose.model('Question').find(conditions);

            for (const question of questions) {
                // Remove references from users collection
                await mongoose.model('User').updateMany({ questions: question._id }, { $pull: { questions: question._id } });

                // Remove references from images collection
                await mongoose.model('Image').updateMany({ questions: question._id }, { $pull: { questions: question._id } });
            }
        }

        next();
    } catch (error) {
        console.error('Error in pre-middleware: ', error);
        next(error) // Pass the error to the next middleware/handler
    }

});


const Question = mongoose.model('Question', questionSchema);

module.exports = Question;