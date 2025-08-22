import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

const __dirname = path.resolve();

app.use(express.json());

app.use("/api/products",productRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

}

app.listen(PORT, () => {
    try {
        dbConnect();
        console.log(`Server started at port ${PORT}`);
    } catch (error) {
        console.log(`Error in connecting to DB`, error);
        process.exit(1) //1 is for failure
    }

});

