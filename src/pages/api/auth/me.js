import databaseConnection from "@/lib/mongodb";
import User from "@/model/User";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await databaseConnection();
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    console.log(user);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching the current user:", error);
    res.status(500).json({ message: "Server error" });
  }
}
