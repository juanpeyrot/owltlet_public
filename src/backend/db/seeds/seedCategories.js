import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || "";

const categorySchema = new mongoose.Schema({
  publicId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

const Category = mongoose.model("Category", categorySchema);

const categories = [
  { name: "Watches", publicId: "qw6q7ep3auw1zproo1jq" },
  { name: "Notebooks", publicId: "hyeobra4no2cnpzalqvy" },
  { name: "Peripherals", publicId: "cxnbbqggjtljem1ho1d7" },
  { name: "Phones", publicId: "m6abemhhd0qswizdivet" },
  { name: "Home", publicId: "dkc5x2merkrniskt0wbh" },
  { name: "Tablets", publicId: "wj9orux9aveovz2pgius" },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("🚀 Connected to MongoDB");

    await Category.deleteMany({});
    console.log("🧹 Old categories removed");

    await Category.insertMany(categories);
    console.log("✅ Categories seeded successfully");

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding categories:", error);
    process.exit(1);
  }
}

seed();