import databaseConnection from "@/lib/mongodb";
import Location from "@/model/LocationModel";


export default async function handler(req, res) {
  const { id } = req.query;
  await databaseConnection();
  if (req.method === "GET") {
    try {
      const location = await Location.findById(id);

      if (!location) {
        return res.status(404).json({ message: "Location not found" });
      }

      res.status(200).json(location);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedLocation = await Location.findByIdAndDelete(id);

      if (!deletedLocation) {
        return res.status(404).json({ message: "Location not found" });
      }

      res
        .status(200)
        .json({ message: "Location deleted successfully", deletedLocation });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }

    // edit Location
  } else if (req.method === "PATCH") {
    try {
      const updates = req.body;
      const updatedLocation = await Location.findByIdAndUpdate(id, updates, {
        new: true,
      });

      if (!updatedLocation) {
        return res.status(404).json({ message: "Location not found" });
      }

      res
        .status(200)
        .json({ message: "Location updated successfully", updatedLocation });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET", "DELETE", "PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
