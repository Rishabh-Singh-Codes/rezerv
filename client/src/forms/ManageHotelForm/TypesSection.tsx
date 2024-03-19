import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";

const TypesSection = () => {
  const { register, watch } = useFormContext();
  const typeWatch = watch("type");

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">Type</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
          <label
            id={type}
            className={`cursor-pointer text-sm rounded-full px-4 py-2 text-center ${
              typeWatch === type ? "bg-blue-200 font-semibold" : "bg-gray-200"
            }`}
          >
            <input
              type="radio"
              value={type}
              {...register("type", { required: "This field is required" })}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default TypesSection;
