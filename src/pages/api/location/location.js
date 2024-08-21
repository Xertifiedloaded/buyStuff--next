import databaseConnection from "@/lib/mongodb";
import Location from "@/model/LocationModel";

export default async function handler(req, res) {
  await databaseConnection();
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const location = await Location.find({});
        if (!location) {
          return res.status(404).json({ message: 'Location not found' });
        }
        res.status(200).json(location);
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
          price
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
        const updatedLocation = await Location.findOneAndUpdate(
          { locationId: _id }, 
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
        const deletedLocation = await Location.findOneAndDelete({ locationId: _id }); 

        if (!deletedLocation) {
          return res.status(404).json({ message: 'Location not found' });
        }

        res.status(200).json({ message: 'Location deleted', deletedLocation });
      } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}