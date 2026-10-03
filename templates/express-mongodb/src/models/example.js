import mongoose from 'mongoose';
export const Example = mongoose.model('Example', new mongoose.Schema({ name: { type: String, required: true } }, { timestamps: true }));
