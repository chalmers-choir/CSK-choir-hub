export interface ReadOnlyTextFieldProps {
  label?: string;
  value?: string;
  placeholder?: string;
}

export const ReadOnlyTextField = ({ label, value, placeholder }: ReadOnlyTextFieldProps) => {
  return (
    <div>
      {label && <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>}
      <p>{value ?? placeholder ?? ''}</p>
    </div>
  );
};
