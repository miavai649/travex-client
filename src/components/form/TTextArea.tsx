import { Textarea } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

import { IInput } from "@/src/types";

interface IProps extends IInput {}

const TTextarea = ({ label, name, variant = "bordered" }: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Textarea
      label={label}
      {...register(name)}
      errorMessage={(errors[name]?.message as string) ?? ""}
      isInvalid={!!errors[name]}
      maxRows={6}
      variant={variant}
    />
  );
};

export default TTextarea;
