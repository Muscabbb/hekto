import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { FieldType } from "@/types/formTypes";

type CustomProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  placeholder?: string;
  label?: string;
  fieldType: FieldType;
  genderOpt?: ["MALE", "FEMALE"];
};

const RenderField = ({
  field,
  props: {
    fieldType,
    placeholder,

    name,
    label,
    genderOpt,
  },
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    case FieldType.RADIO:
      return (
        <FormControl>
          <RadioGroup defaultValue="comfortable">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="MALE" id="r1" checked />
              <Label htmlFor="r1">{genderOpt?.[0]}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="FEMALE" id="r2" />
              <Label htmlFor="r2">{genderOpt?.[1]}</Label>
            </div>
          </RadioGroup>
        </FormControl>
      );
    case FieldType.NUMBER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <FormControl>
            <Input
              {...field}
              type="number"
              placeholder={placeholder}
              className="shad-input"
              onChange={(e) => field.onChange(Number(e.target.value))}
              value={field.value || ""}
            />
          </FormControl>
        </div>
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
