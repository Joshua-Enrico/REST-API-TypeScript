import { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
}

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    }
},{
    timestamps: true
})

UserSchema.pre<IUser>('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10)
    await bcrypt.hash(user.password, salt)
        .then(hash => {
            user.password = hash;
            next();
        })
        .catch(err => {
            console.log(err);
            next(err);
        })

})

// Verifiy password
UserSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
   return await bcrypt.compare(password, this.password)
}


export default model<IUser>('User', UserSchema);
