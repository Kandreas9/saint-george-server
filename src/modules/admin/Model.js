import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Please enter a valid e-mail');
                }
            },
        },

        password: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                if (value.toLowerCase().includes('password')) {
                    throw new Error('Password cannot contain "password"');
                }
            },
        },

        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    { timestamps: {}, versionKey: false },
);

Schema.methods.toJSON = function () {
    const admin = this;
    const adminObject = admin.toObject();

    //Filter out sensitive data from response
    delete adminObject.password;
    delete adminObject.tokens;

    return adminObject;
};

Schema.methods.generateAuthToken = async function () {
    const admin = this;
    const token = jwt.sign({ _id: admin._id.toString() }, 'secrethere');

    admin.tokens = admin.tokens.concat({ token });
    await admin.save();

    return token;
};

Schema.statics.findByCredentials = async (email, password) => {
    const admin = await Admin.findOne({ email });

    if (!admin) {
        throw new Error('Incorrect e-mail or password');
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
        throw new Error('Incorrect e-mail or password');
    }

    return admin;
};

// Hash the plain text password before saving
Schema.pre('save', async function (next) {
    const admin = this;

    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8);
    }

    next();
});

const Admin = mongoose.model('Admin', Schema);

export default Admin;
