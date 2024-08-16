import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { FieldType } from "./froms/loginForm";
import { Checkbox } from "./ui/checkbox";

type CustomProps = {
  control: Control<any>;
  name: string;
  placeholder?: string;
  label?: string;
  fieldType: FieldType;
};

const RenderField = ({
  field,
  props: {
    fieldType,
    placeholder,

    name,
    label,
  },
}: {
  field: any;
  props: CustomProps;
}) => {
  switch (fieldType) {
    case FieldType.TEXT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              className="shad-input"
            />
          </FormControl>
        </div>
      );
    case FieldType.PASSWORD:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <FormControl>
            <Input
              {...field}
              type={FieldType.PASSWORD}
              placeholder={placeholder}
              className="shad-input"
            />
          </FormControl>
        </div>
      );
    case FieldType.CHECK_BOX:
      return (
        <FormControl>
          <div className="flex items-center gap-1">
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
              className="border-dark-200 rounded w-5 h-5"
            />
            <label htmlFor={name} className="checkbox-label">
              {label}
            </label>
          </div>
        </FormControl>
      );

    default:
      break;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, name, label, fieldType } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FieldType.CHECK_BOX && label && (
            <FormLabel className="font-bold text-lg">{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
