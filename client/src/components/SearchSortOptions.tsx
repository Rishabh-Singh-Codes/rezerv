type Props = {
  selectedSortOption?: string;
  onChange: (value: string) => void;
};

const SearchSortOptions = ({
  selectedSortOption,
  onChange,
}: Props) => {
  return (
    <div>
      <select
        value={selectedSortOption}
        onChange={(event) => onChange(event.target.value)}
        className="p-2 border rounded-lg w-full"
      >
        <option value="">Sort By:</option>
        <option value="starRating">Star Rating</option>
        <option value="pricePerNightAsc">Price Per Night (low to high)</option>
        <option value="pricePerNightDesc">Price Per Night (high to low)</option>
      </select>
    </div>
  );
};

export default SearchSortOptions;
