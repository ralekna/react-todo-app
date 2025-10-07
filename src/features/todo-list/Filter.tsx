export type FilterProps = {
  name: string;
  onChange: (filter: string) => void;
  options: { label: string; value: string }[];
  value: string;
};

export function Filter({ name, onChange, options, value }: FilterProps) {
  return (
    <form className={"filters"}>
      {options.map(({ label, value: optionValue }) => (
        <span key={optionValue}>
          <input
            name={name}
            id={value}
            value={value}
            type={"radio"}
            checked={optionValue === value}
            onChange={() => onChange(optionValue)}
          />
          <label htmlFor={value}>{label}</label>
        </span>
      ))}
    </form>
  );
}
