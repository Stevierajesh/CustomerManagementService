// REGISTERING THE API ENDPOINTS
const express = require('express');
const app = express();
const PORT = 3001;
const cors = require('cors');
const bodyParser = require('body-parser');

//COMMENT OUT THIS LINE IN PRODUCTION
app.use(cors());

// IMPLEMENT SECURITY CHECKS IN THE FUTURE
app.use((req, res, next) => {
    require('./middleware').validate_path(req, res, next)
}); //Verify Endpoint

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

require('./buildEndpoints').deploy(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
