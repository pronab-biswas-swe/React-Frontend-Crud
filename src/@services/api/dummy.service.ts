import { axiosIns } from "config/api.config";

export const DummyService = {
  getEmployeeList: async (): Promise<any> =>
    await axiosIns.get("/api/v1/employees"),

  employeeCreate: async (payload): Promise<any> =>
    await axiosIns.post("/api/v1/create", payload),

  employeeUpdate: async (id: string, payload): Promise<any> =>
    await axiosIns.put(`/api/v1/update/${id}`, payload),

  employeeDelete: async (id: string): Promise<any> =>
    await axiosIns.delete(`/api/v1/delete/${id}`),
};
