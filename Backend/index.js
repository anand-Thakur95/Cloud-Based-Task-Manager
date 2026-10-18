import app from "./app.js";
import dbConnection from "./utils/connection.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    await dbConnection();
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

startServer();
