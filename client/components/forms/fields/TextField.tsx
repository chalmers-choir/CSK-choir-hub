import { Input } from "@heroui/react";

import { ReadOnlyTextField } from "./ReadOnlyTextField";

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

export const TextField = ({ onChange, readOnly, ...props }: TextFieldProps) =>
  readOnly ? (
    <ReadOnlyTextField {...props} />
  ) : (
    <Input {...props} onValueChange={onChange} readOnly={readOnly} />
  );
