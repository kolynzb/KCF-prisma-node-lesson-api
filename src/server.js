import dotenv from "dotenv-safe";
import app from "./app"

dotenv.config();

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
