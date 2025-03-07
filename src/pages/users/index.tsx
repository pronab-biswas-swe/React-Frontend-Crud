import { ConfirmationModal } from "@components/ConfirmationModal/ConfirmationModal";
import { Input } from "@components/Input";
import { NoData } from "@components/NoData";
import ContentPreloader from "@components/Preloader/ContentPreloader";
import { PageTitle } from "@context/PageData";
import { IObject } from "@interface/common.interface";
import { DummyService } from "@services/api/dummy.service";
import { toast } from "@services/utils/toast";
import { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { users } from "utility/data";
import { useDebounce } from "utility/debouncer";
import { searchParamsToObject } from "utility/makeObject";
import UserTable from "./Table";

interface IEmployeeContext {
  isDrawerOpen?: boolean;
  onSubmit?: (data: IObject) => void;
  onDrawerClose?: () => void;
  updateData?: any;
  isSubmitLoading?: boolean;
  listData?: IObject[];
  handleUpdate?: (data: IObject) => void;
  handleDelete?: (data: IObject) => void;
}

const initEmployeeContext = {
  isDrawerOpen: false,
  onSubmit: () => {},
  onDrawerClose: () => {},
  updateData: {},
  isSubmitLoading: false,
  listData: [],
  handleUpdate: () => {},
  handleDelete: () => {},
};

export const EmployeeContext =
  createContext<IEmployeeContext>(initEmployeeContext);

const UsersList = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [deleteData, setDeleteData] = useState<any>();
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [listData, setListData] = useState<any>(users || []);
  const [search, setSearch] = useState<string>(
    searchParams.get("searchKey") || ""
  );
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<any>({});
  const params: any = searchParamsToObject(searchParams);
  const searchKey = useDebounce(search, 500);

  useEffect(() => {
    if (searchKey) params.searchKey = searchKey;
    else delete params.searchKey;

    setSearchParams({ ...params });
    // eslint-disable-next-line
  }, [searchKey, setSearchParams]);

  useEffect(() => {
    if (searchKey) {
      let temp = users?.filter((item: IObject) =>
        item?.name.toLowerCase().includes(searchKey.toLowerCase())
      );
      setListData(temp);
    } else setListData(users);
  }, [searchParams]);

  useEffect(() => {
    getDataList();
    // eslint-disable-next-line
  }, []);

  const getDataList = () => {
    DummyService.getEmployeeList()
      .then((res) => {
        setListData(res?.data || []);
      })
      // .catch((err) => toast.error(err?.message))
      .catch((err) => console.log(err?.message))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onDrawerClose = () => {
    setIsDrawerOpen(false);
    setIsUpdate(false);
    setUpdateData({});
  };

  const handleUpdate = (data: any) => {
    setIsUpdate(true);
    setUpdateData(data);
    setIsDrawerOpen(true);
  };

  const handleDelete = (data: any) => {
    setIsDeleteModal(true);
    setDeleteData(data);
  };

  const onCancelDelete = () => {
    setIsDeleteModal(false);
    setDeleteData(null);
  };

  const onConfirmDelete = () => {
    setListData((prevList) =>
      prevList.filter((item: any) => item.id !== deleteData?.id)
    );
    setIsDeleteLoading(true);
    DummyService.employeeDelete(deleteData?.id || "")
      .then((res) => {
        toast.success(res?.message);
        getDataList();
        setDeleteData(null);
      })
      .catch((err) => toast.error(err?.message))
      .finally(() => {
        setIsDeleteLoading(false);
        setIsDeleteModal(false);
      });
  };

  const onSubmit = (data) => {
    // setIsSubmitLoading(true);

    let formData: any = new FormData();

    formData.append("employee_name", data?.employee_name);
    formData.append("employee_age", data?.employee_age);
    formData.append("employee_salary", data?.employee_salary);
    formData.append("profile_image", data?.profile_image);

    setListData((prevList) => {
      const existingIndex = prevList.findIndex(
        (item: any) => item.id === data.id
      );

      if (existingIndex !== -1) {
        // Update existing employee
        return prevList.map((item, index) =>
          index === existingIndex ? { ...item, ...data } : item
        );
      } else {
        // Add new employee
        return [...prevList, data];
      }
    });

    setIsDrawerOpen(false);

    const service = isUpdate
      ? DummyService.employeeUpdate(updateData?.id, formData)
      : DummyService.employeeCreate(formData);
    service
      .then((res) => {
        toast.success(res?.message);
        getDataList();
        setIsDrawerOpen(false);
        setIsUpdate(false);
        setUpdateData({});
      })
      .catch((error) => toast.error(error?.message))
      .finally(() => setIsSubmitLoading(false));
  };

  return (
    <>
      <PageTitle>Users List</PageTitle>
      {/* <PageToolbarRight>
        <ACLWrapper visibleToRoles={["SUPER_ADMIN"]}>
          <Button
            color="warning"
            // variant="light"
            // type="button"
            onClick={() => setIsDrawerOpen(true)}
          >
            Add Employee
          </Button>
        </ACLWrapper>
      </PageToolbarRight> */}
      <div className="card p-5">
        <div className="d-flex gap-3">
          <Input
            type="search"
            noMargin
            placeholder="Search ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <EmployeeContext.Provider
          value={{
            isDrawerOpen,
            onSubmit,
            onDrawerClose,
            updateData,
            isSubmitLoading,
            listData,
            handleUpdate,
            handleDelete,
          }}
        >
          <div className="mt-3">
            <UserTable
              listData={listData}
              // handleUpdate={handleUpdate}
              // handleDelete={handleDelete}
            />
            {isLoading && <ContentPreloader />}
            {!isLoading && !listData?.length && (
              <NoData details="No User Data Found!" />
            )}
          </div>

          {/* <Form
          isOpen={isDrawerOpen}
          onClose={onDrawerClose}
          updateData={updateData}
          onSubmit={onSubmit}
          submitLoading={isSubmitLoading}
          /> */}
        </EmployeeContext.Provider>
      </div>
      <ConfirmationModal
        title="Delete Confirmation"
        isOpen={isDeleteModal}
        onClose={onCancelDelete}
        onConfirm={onConfirmDelete}
        isSubmitting={isDeleteLoading}
        onConfirmLabel={"DELETE"}
      >
        Are you sure, you want to delete{" "}
        <b>{deleteData?.employee_name || null}</b> ?
      </ConfirmationModal>
    </>
  );
};
export default UsersList;
