const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://kbhargavasriram88_db_user:6SekesO1HXnFltWk@kbhargavasriramportfoli.atjtwox.mongodb.net/portfolio?retryWrites=true&w=majority&appName=kbhargavasriramportfolio";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function createAdmin() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    const email = "admin@example.com";
    const rawPassword = "admin123";
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      existingAdmin.password = hashedPassword;
      existingAdmin.role = "admin";
      await existingAdmin.save();
      console.log(`Successfully updated admin user: ${email} with password: ${rawPassword}`);
    } else {
      await User.create({
        name: "Admin User",
        email,
        password: hashedPassword,
        role: "admin",
      });
      console.log(`Successfully created admin user: ${email} with password: ${rawPassword}`);
    }

    const allUsers = await User.find({}, { password: 0 });
    console.log("Current users in DB:", allUsers);

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
}

createAdmin();
