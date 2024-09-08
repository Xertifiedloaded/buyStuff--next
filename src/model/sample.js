import { useState, useEffect } from 'react';

export default function Locations() {
  const [locations, setLocations] = useState([]);
  const [exactLocation, setExactLocation] = useState('');
  const [price, setPrice] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/locations');
        const data = await res.json();
        if (res.ok) {
          setLocations(data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Failed to fetch locations');
      }
      setLoading(false);
    };

    fetchLocations();
  }, []);

  // Add or update a location
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = editingId ? 'PUT' : 'POST';
      const endpoint = editingId ? `/api/locations/${editingId}` : '/api/locations';

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ exactLocation, price }),
      });

      const data = await res.json();
      if (res.ok) {
        if (editingId) {
          // Update the list with the updated location
          setLocations(locations.map(loc => (loc._id === editingId ? data : loc)));
        } else {
          // Add the new location to the list
          setLocations([data, ...locations]);
        }
        setExactLocation('');
        setPrice('');
        setEditingId(null);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to save location');
    }

    setLoading(false);
  };

  // Edit a location
  const handleEdit = (location) => {
    setExactLocation(location.exactLocation);
    setPrice(location.price);
    setEditingId(location._id);
  };

  // Delete a location
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/locations/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setLocations(locations.filter(loc => loc._id !== id));
      } else {
        const data = await res.json();
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to delete location');
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Locations</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Exact Location</label>
          <input
            type="text"
            value={exactLocation}
            onChange={(e) => setExactLocation(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
          disabled={loading}
        >
          {editingId ? 'Update Location' : 'Add Location'}
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {locations.map((location) => (
            <li key={location._id} className="mb-4">
              <p>
                <strong>{location.exactLocation}</strong> - ${location.price}
              </p>
              <button
                onClick={() => handleEdit(location)}
                className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(location._id)}
                className="bg-red-500 text-white py-1 px-2 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}