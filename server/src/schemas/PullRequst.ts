import { model, Schema } from 'mongoose'

const schema = new Schema({
    number: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    status: { type: String, required: true, enum: ['draft', 'open', 'closed']},
    labels: [{ type: String, required: true }]
}, { minimize: true, timestamps: true })

export default model('PullRequest', schema)
