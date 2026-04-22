const mongoose = require('mongoose');
const URI = "mongodb+srv://Tally-services-db:TallyServices%401234@tally-services.ikdgdfk.mongodb.net/?appName=Tally-Services";
mongoose.connect(URI).then(() => {
    console.log("Connected Successfully");
    process.exit(0);
}).catch(err => {
    console.error("Connection Error:", err);
    process.exit(1);
});
