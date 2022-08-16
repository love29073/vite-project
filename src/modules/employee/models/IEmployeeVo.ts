import type IDepartmentVo from "../../dpartment/models/IDepartmentVo";
export default interface IEmployeeVo {
  comm: number;
  empno: number;
  ename: string;
  hireDate: string;
  job: string;
  sal: number;
  deptVo: IDepartmentVo;
}
