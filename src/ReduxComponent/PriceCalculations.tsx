import { Location } from "@/utils/utils";
import React from "react";

export default function LocationChanges(
  handleLocationChange,
  payload,
  handleChange
) {
  return (
    <>
      <div>
        <label htmlFor="location" className="text-sm mb-1 block">
          Location
          <select
            id="location"
            name="selectedLocation"
            className="p-3 h-[45px] placeholder:text-sm text-[16px] rounded-md border border-gray-300 w-full outline-none"
            onChange={handleLocationChange}
          >
            <option value="">Select a location</option>
            {Location.map((loc, index) => (
              <option key={index} value={loc.exactLocation}>
                {loc.exactLocation} - ₦{loc.price}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm mt-2 block font-400">
          Describe your location
          <textarea
            name="address"
            value={payload.address}
            onChange={handleChange}
            placeholder="Describe your address"
            className="p-3 h-[90px] resize-none placeholder:text-sm text-[16px] rounded-md border border-gray-300 w-full outline-none"
          />
        </label>
      </div>
    </>
  );
}

export function DeliveryInformation(payload, handleChange) {
  return (
    <>
      {["name", "email", "phone"].map((field, idx) => (
        <div key={idx} className="flex flex-col mb-3">
          <label className="text-sm mb-1" htmlFor={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}:
          </label>
          <input
            type="text"
            id={field}
            name={field}
            className="p-3 h-[45px] placeholder:text-sm text-[16px] rounded-md border border-gray-300 w-full outline-none"
            value={payload[field]}
            onChange={handleChange}
            placeholder={`Enter your ${field}`}
          />
        </div>
      ))}
    </>
  );
}
