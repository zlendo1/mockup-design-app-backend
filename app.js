const app = require('./config/appConfig.js');
const db = require('./config/db.js');

db.sequelize.sync();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
