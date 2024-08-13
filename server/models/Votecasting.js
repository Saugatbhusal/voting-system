// Require Mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VoteSchema = new Schema({
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
    timestamp: { type: Date, default: Date.now }
});

const Vote = mongoose.model('Vote', VoteSchema)
module.exports = Vote;

