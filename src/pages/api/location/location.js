import databaseConnection from "@/lib/mongodb";
import Location from "@/model/LocationModel";

export default async function handler(req, res) {
  await databaseConnection();
  const { method } = req;
  const { locationId } = req.query; 

  switch (method) {
    case 'GET':
      try {
        const locations = await Location.find().sort({ _id: -1 });
        if (!locations) {
          return res.status(404).json({ message: 'Locations not found' });
        }
        res.status(200).json(locations);
      } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      }
      break;

    case 'POST':
      try {
        const { exactLocation, price } = req.body;

        if (!exactLocation || !price) {
          return res.status(400).json({ message: 'Missing required fields' });
        }

        const newLocation = new Location({
          exactLocation,
          price,
        });

        await newLocation.save();
        res.status(201).json(newLocation);
      } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      }
      break;

    case 'PUT':
      try {
        const { exactLocation, price } = req.body;
        if (!exactLocation || !price) {
          return res.status(400).json({ message: 'Missing required fields' });
        }

        const updatedLocation = await Location.findByIdAndUpdate(
          id, 
          { exactLocation, price },
          { new: true } 
        );

        if (!updatedLocation) {
          return res.status(404).json({ message: 'Location not found' });
        }

        res.status(200).json(updatedLocation);
      } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletedLocation = await Location.findByIdAndDelete(id); 

        if (!deletedLocation) {
          return res.status(404).json({ message: 'Location not found' });
        }

        res.status(200).json({ message: 'Location deleted successfully', deletedLocation });
      } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}