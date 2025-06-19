import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const products = [
  {
    publicId: "tr8xum3vkbc9r3je4d1s",
    name: "11-inch iPad Pro 512GB Space Gray",
    price: 1199,
    category: "Tablets",
    description: "Powerful and sleek tablet with an M2 chip, ideal for professionals and creatives.",
    discountPercentage: null
  },
  {
    publicId: "alsgntyen88xbhb5jwcc",
    name: "13-inch MacBook Air 256GB Space Gray",
    price: 999,
    category: "Notebooks",
    description: "Lightweight and fast with the M2 chip, perfect for everyday productivity.",
    discountPercentage: 10
  },
  {
    publicId: "qnnlbojj8tbboqmqntec",
    name: "14-inch MacBook Pro 12-Core 1TB Space Black",
    price: 2399,
    category: "Notebooks",
    description: "High-performance MacBook Pro with 12-core CPU, ideal for intensive tasks.",
    discountPercentage: null
  },
  {
    publicId: "mxxgjyga711imulmzf0k",
    name: "15-inch MacBook Air 2TB Midnight",
    price: 1899,
    category: "Notebooks",
    description: "Large screen MacBook Air with ultra-fast SSD and all-day battery life.",
    discountPercentage: null
  },
  {
    publicId: "o4kdwewqhky6f0so5ixu",
    name: "AirPods Max",
    price: 549,
    category: "Peripherals",
    description: "Over-ear headphones with high-fidelity audio and active noise cancellation.",
    discountPercentage: null
  },
  {
    publicId: "rhzctdnoe6bodd6visat",
    name: "AirPods Pro 2nd Generation",
    price: 249,
    category: "Peripherals",
    description: "Wireless earbuds with adaptive transparency and personalized spatial audio.",
    discountPercentage: null
  },
  {
    publicId: "tckoxdv4eeowgjfuorws",
    name: "Apple iPad Air 256GB Purple",
    price: 749,
    category: "Tablets",
    description: "Versatile and powerful iPad Air with a stunning Liquid Retina display.",
    discountPercentage: null
  },
  {
    publicId: "sxlchxjmrveqbqeeaqfs",
    name: "Apple iPhone 14 128GB Blue",
    price: 799,
    category: "Phones",
    description: "All-around smartphone with advanced dual-camera system and fast performance.",
    discountPercentage: 15
  },
  {
    publicId: "cvliixwzp6i0ypewcxeh",
    name: "Apple iPhone 15 Pro 1TB Blue Titanium",
    price: 1499,
    category: "Phones",
    description: "Premium iPhone with titanium design and 1TB storage for professionals.",
    discountPercentage: null
  },
  {
    publicId: "tzmmz5ec7nc5gx6et6x4",
    name: "Apple iPhone 15 Pro Max 256GB Natural Titanium",
    price: 1299,
    category: "Phones",
    description: "Flagship iPhone with A17 Pro chip and best-in-class camera system.",
    discountPercentage: null
  },
  {
    publicId: "njthd6tltfs5qcqv2k1h",
    name: "Apple Pencil 1st Generation",
    price: 99,
    category: "Peripherals",
    description: "Precise stylus designed for drawing and note-taking on compatible iPads.",
    discountPercentage: null
  },
  {
    publicId: "a6zuinowpyopzw0rpaoh",
    name: "Apple TV 4K WiFi",
    price: 129,
    category: "Home",
    description: "Streaming device with 4K HDR and Dolby Atmos support for cinematic experiences.",
    discountPercentage: null
  },
  {
    publicId: "rtuudyjm11tepyettl6a",
    name: "Apple Watch Series 9 Aluminum",
    price: 399,
    category: "Watches",
    description: "Smartwatch with advanced health tracking and brighter display.",
    discountPercentage: null
  },
  {
    publicId: "x7dvis0wgpmbien3qicf",
    name: "Apple Watch Ultra 2",
    price: 799,
    category: "Watches",
    description: "Rugged and powerful watch for adventurers and athletes.",
    discountPercentage: 5
  },
  {
    publicId: "jjjdj02ejr0ceyiohjzt",
    name: "Silver Lamicall Adjustable Laptop Riser",
    price: 45,
    category: "Peripherals",
    description: "Ergonomic aluminum stand for laptops, adjustable for perfect posture.",
    discountPercentage: null
  }
];

const MONGO_URI = process.env.MONGODB_URI || "";

async function seed() {
	const ProductSchema = new Schema({
		publicId: {
			type: String,
			required: true,
			unique: true
		},
		name: {
			type: String,
			required: true
		},
		price: {
			type: Number,
			required: true
		},
		category: {
			type: String,
			required: true
		},
		description: {
			type: String,
			default: ''
		},
		discountPercentage: {
			type: Number,
			default: null
		}
	});
	
	
	const Product = mongoose.model("Product", ProductSchema);
  try {
    await mongoose.connect(MONGO_URI);
    console.log("🚀 Connected to MongoDB");

    await Product.deleteMany({});
    console.log("🧹 Old products removed");

    await Product.insertMany(products);
    console.log("✅ Products seeded successfully");

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    process.exit(1);
  }
}

seed();