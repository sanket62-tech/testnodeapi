const app = require('./formSyncApi/src/app');
const connectDB = require('./formSyncApi/src/config/db');

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
