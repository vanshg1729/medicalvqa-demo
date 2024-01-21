const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema

const emailRegex = /^\S+@\S+\.\S+$/;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return emailRegex.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        },
    },

    password: {
        type: String,
        required: true,
    },

    fname: {
        type: String,
        required: true
    },

    lname: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    role: {
        type: String,
        required: true,
        enum: ["viewer", "editor", "admin"],
        default: 'viewer'
    },

    contact: {
        type: Number,
        required: true
    },

    // information about the user which will be displayed on the profile page
    about: {
        type: String,
        required: false
    },

    // questions added by the user (can only by added by "editor" or "admin")
    questions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Question'
        }
    ],

    // images added by the user (can only be added by "editor" or "admin")
    images: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Image'
        }
    ],
})

userSchema.statics.signup = async function ({ email, password, fname, lname, age, contact }) {
    if (!email || !password) {
        throw Error('Email and Password must be filled')
    }

    const exists = await this.findOne({ email })
    console.log(exists)

    if (exists) {
        throw Error('Email already in use')
    }

    const role = "viewer"
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash, fname, lname, age, contact, role })
    return user
}

userSchema.statics.login = async function ({ email, password }) {
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    // here returned user is of type mongoose.Document
    const user = await this.findOne({ email })

    if (!user) {
        throw Error("Incorrect email")
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect Password')
    }

    return user
}

// a pre middleware to handle cleanup
userSchema.pre(['remove', 'deleteOne'], { document: true, query: false }, async function (next) {
    console.log('Inside userSchema deleteOne pre middleware')

    try {
        const userId = this._id
        console.log('userId = ', userId)
        const user = await mongoose.model('User').findOne({ _id: userId })

        if (user) {
            // Remove references in Image collection
            await mongoose.model('Image').updateMany({ user: userId }, { $unset: { user: 1 } });

            // Remove references in Question collection
            await mongoose.model('Question').updateMany({ user: userId }, { $unset: { user: 1 } });

            // Remove references in Category collection
            await mongoose.model('Category').updateMany({ user: userId }, { $unset: { user: 1 } });

        }

        next()

    } catch (error) {
        console.error('Error in pre-middleware: ', error)
        next(error)
    }
});

const User = new mongoose.model('User', userSchema)

module.exports = User
