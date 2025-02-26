import Button from "@components/Button";
import Checkbox from "@components/Checkbox";
import Drawer from "@components/Drawer";
import DrawerBody from "@components/Drawer/DrawerBody";
import DrawerFooter from "@components/Drawer/DrawerFooter";
import { Input } from "@components/Input";
import { SingleFile } from "@components/MediaInput";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { isObjectNull } from "utility/check-validation";
import { EmployeeContext } from ".";

const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const { updateData, isDrawerOpen, onDrawerClose, onSubmit, isSubmitLoading } =
    useContext(EmployeeContext);

  useEffect(() => {
    if (!isObjectNull(updateData)) {
      reset({
        ...updateData,
      });
    } else {
      reset({ isActive: true });
    }
  }, [updateData, reset]);

  return (
    <Drawer
      title={`Employee ${!isObjectNull(updateData) ? "Update" : "Create"}`}
      isOpen={isDrawerOpen}
      handleClose={onDrawerClose}
      className="w-md-50 w-xl-25"
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DrawerBody>
          <div className="row">
            <div className="col-12">
              <Input
                label="Name"
                placeholder="Enter name"
                registerProperty={{
                  ...register("employee_name", {
                    required: "Enter name",
                  }),
                }}
                isRequired
                isError={!!errors?.employee_name}
                errorMessage={errors?.employee_name?.message as string}
              />
            </div>
            <div className="col-12">
              <Input
                label="Salary"
                placeholder="Enter salary"
                type="number"
                min={0}
                registerProperty={{
                  ...register(`employee_salary`, {
                    required: "Salary is required",
                  }),
                }}
                isRequired
                isError={!!errors?.employee_salary}
                errorMessage={errors?.employee_salary?.message as string}
              />
            </div>
            <div className="col-12">
              <Input
                label="Age"
                placeholder="Enter age"
                type="number"
                min={0}
                registerProperty={{
                  ...register(`employee_age`, {
                    required: "Age is required",
                  }),
                }}
                isRequired
                isError={!!errors?.employee_age}
                errorMessage={errors?.employee_age?.message as string}
              />
            </div>
            <SingleFile
              // isRequired="Upload Image"
              control={control}
              label="Profile Image"
              name={`profile_image`}
              isError={!!errors?.profile_image}
              errorMessage={errors?.profile_image?.message as string}
            />

            <div className="col-12">
              <Checkbox
                label="Active"
                registerProperty={{
                  ...register("isActive"),
                }}
              />
            </div>
          </div>
        </DrawerBody>

        <DrawerFooter>
          <div className="d-flex gap-3 justify-content-end">
            <Button
              color="secondary"
              onClick={onDrawerClose}
              isDisabled={isSubmitLoading}
            >
              Close
            </Button>
            <Button color="warning" type="submit" isLoading={isSubmitLoading}>
              {!isObjectNull(updateData) ? "Update" : "Create"}
            </Button>
          </div>
        </DrawerFooter>
      </form>
    </Drawer>
  );
};
export default Form;
