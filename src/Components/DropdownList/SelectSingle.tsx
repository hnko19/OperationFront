import Select from "react-select";

interface Option {
  value: number | string;
  label: string;
}

interface Props {
  options?: Option[];
  name?: string; // ✅ صار اختياري
  value?: number | string;
  disabled?: boolean;
  onChange?: (val: number | string) => void;
}

export default function SelectSingle({
  options = [],
  name,
  value,
  disabled,
  onChange,
}: Props) {
  const selectedOption =
    options.find((opt) => opt.value === value) || null;

  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      isClearable={false}
      isRtl={true}
      isDisabled={disabled}
      isSearchable={true}
      name={name ?? ""} // ✅ safe fallback
      options={options}
      value={selectedOption}
      onChange={(option) => {
        if (!option) return; // ✅ حماية من null
        onChange?.((option as Option).value);
      }}
    />
  );
}