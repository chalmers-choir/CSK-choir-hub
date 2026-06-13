import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { ReadOnlyTextField } from './ReadOnlyTextField';

export interface TextFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  readOnly?: boolean;
  className?: string;
}

export const TextField = ({ onChange, readOnly, label, className, ...props }: TextFieldProps) =>
  readOnly ? (
    <ReadOnlyTextField label={label} {...props} />
  ) : (
    <div className={`flex flex-col gap-1 ${className ?? ''}`}>
      {label && <Label>{label}</Label>}
      <Input {...props} onChange={(e) => onChange?.(e.target.value)} />
    </div>
  );
