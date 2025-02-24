import Button from "@components/Button";
import Icon from "@components/Icon";
import { Input } from "@components/Input";
import Label from "@components/Label";
import { IObject } from "@interface/common.interface";
import { LocalStorageService } from "@services/utils/localStorage.service";
import { toast } from "@services/utils/toast";
import { topProgress } from "@services/utils/top-progress";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { EMAIL_REGEX, isObjectNull } from "utility/check-validation";
import { users } from "utility/data";
import { toAbsoluteUrl } from "utility/make-slug";
import "./auth.scss";
const Login: FC = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    topProgress.show();
    setLoading(true);

    let validUser = users?.find(
      (d: IObject) => data?.email === d.email && d?.password === data.password
    );

    if (!isObjectNull(validUser)) {
      LocalStorageService.set("user", validUser);
      LocalStorageService.set("users", users);
      toast.success("Login Success");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      toast.error("Wrong user or pass");
    }

    topProgress.hide();
    setLoading(false);
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="text-center">
        <h1 className="text-success mb-3">LOGIN</h1>
        <hr />
      </div>

      <div className="fv-row mb-8">
        <Label isRequired>Email </Label>
        <Input
          placeholder="Enter email"
          autoFocus
          size="lg"
          startIcon={<Icon icon="person" />}
          isError={!!errors?.email}
          errorMessage={errors?.email?.message as string}
          registerProperty={{
            ...register("email", {
              required: "Email Address is required",
              pattern: {
                value: EMAIL_REGEX,
                message: "Invalid email address",
              },
            }),
          }}
        />
      </div>
      <div className="fv-row mb-3">
        <Label isRequired>Password</Label>
        <Input
          placeholder="Enter password"
          type="password"
          size="lg"
          startIcon={<Icon icon="lock" />}
          isError={!!errors?.password}
          errorMessage={errors?.password?.message as string}
          registerProperty={{ ...register("password") }}
        />
      </div>
      <div className="d-grid my-5">
        <Button type="submit" color="success" isLoading={loading}>
          <strong className="fs-5">Login</strong>
        </Button>
      </div>
    </form>
  );
};
export default Login;
