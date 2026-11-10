import Select from 'react-select';

interface Option {
  value: number | string;
  label: string;
}

interface Props {
  options?: Option[];
  name?: string;
  value?: number | string;
  disabled?: boolean;
  onChange?: (val: number | string) => void;
}

export default function QuickSelect({
  options = [],
  name,
  value,
  disabled,
  onChange,
}: Props) {
  const selectedOption = options.find((opt) => opt.value === value) || null;

  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      isClearable={false}
      isRtl={true}
      isDisabled={disabled}
      isSearchable={true}
      name={name ?? ''}
      options={options}
      value={selectedOption}
      // إخراج القائمة خارج حاوية الـ Modal لتطفو بحرية دون قصها أو تفعيل التمرير
      menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
      menuPosition="fixed"
      styles={{
        // التأكد من أن القائمة تظهر فوق عناصر الـ Modal وأزراره
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
      }}
      onChange={(option) => {
        if (!option) return;
        onChange?.((option as Option).value);
      }}
    />
  );
}
