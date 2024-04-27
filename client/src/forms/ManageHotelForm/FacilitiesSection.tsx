import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">Facilities</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
        {hotelFacilities.map((facility) => (
          <label key={facility} id={facility} className="flex gap-1 text-sm text-gray-700">
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "Atleast one facility is required";
                  }
                },
              })}
            />
            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 font-bold text-sm">{errors.facilities.message}</span>
      )}
    </div>
  );
};

export default FacilitiesSection;
