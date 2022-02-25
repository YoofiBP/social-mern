import mongoose from "mongoose";
import validator from 'validator';
import crypto from 'crypto';

const {Schema} = mongoose;

const userSchema = new Schema({
        name: {
            type: String,
            trim: true,
            required: [true, 'Name is required']
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: [true, 'Email is required'],
            validate: {
                validator: (emailValue) => validator.isEmail(emailValue),
                message: 'Please fill a valid email address'
            }
        },
        hashed_password: {
            type: String,
            required: [true, 'Password is required']
        },
        salt: String
    },
    {timestamps: true});

userSchema.methods = {
    authenticate: (plainTextPassword) => this.encryptPassword(plainTextPassword) === this.hashed_password,
    makeSalt: () => String(Math.round((new Date().valueOf() * Math.random()))),
    encryptPassword: (password) => {
        if (!password) return '';
        try {
            crypto.createHmac('sha1', this.salt).update(password).digest('hex')
        } catch (err) {
            console.error(err);
            return '';
        }
    }
}

userSchema.path('hashed_password').validate((_) => {
    if(this._password?.length < 6){
        this.invalidate('password', 'Password must be at least  6  characters long')
    }
    if(this.isNew && !this._password){
        this.invalidate('password', 'Password is required')
    }
}, null);

userSchema.virtual('password')
    .set((passwordValue) => {
        this._password = passwordValue;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(passwordValue);
    }).get(() => {
    return this._password;
})

export default mongoose.model('User', userSchema);