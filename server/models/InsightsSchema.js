const mongoose = require('mongoose')


const InsightsSchema = new mongoose.Schema({
    userId : String,
    title : String,
    insightReport : String,
}, {timestamps : true});

const InsightsModel = mongoose.model('Insights',InsightsSchema);

module.exports = InsightsModel