type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div>
      <h4 className="text-md font-semibold mb-2">Max Price</h4>
      <select
        className="p-2 border rounded-lg w-full"
        value={selectedPrice}
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
      >
        <option value="">Select Max Price</option>
        {[500, 1000, 1500, 2000, 2500, 3000, 3500].map((price) => (
          <option value={price} key={price}>
            {price}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
