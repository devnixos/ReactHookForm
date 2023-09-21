import React from "react";
import { z, ZodType } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type employee = {
  employeeId?: number;
  userId?: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  gender: string;
  maritalStatus?: string;
  pan?: string;
  aadhar?: string;
  bankAccount?: string;
  nationality?: string;
  otherNationality?: string;
  fatherName: string;
  spouseName?: string;
  nomineeName?: string;
  nomineeRelation?: string;
  supervisorId?: number;
  status?: string;
  mentorId?: number;
  defaultReportingManager?: number;
  employeeStatusCode?: string;
  employeeDeactivationReasonCode?: string;
  remarks?: string;
  employment?: {
    employeeId: number;
    employmentId: number;
    dateOfJoining: Date;
    departmentId: number;
    designationId: number;
    uan: string;
  };
};

const genders = [
  { id: "Male", gender: "Male" },
  { id: "Female", gender: "Female" },
];

const departments = [
  { id: 1, name: "Dot Net" },
  { id: 2, name: "React" },
];
const designations = [
  { id: 1, name: "SSE" },
  { id: 2, name: "MR" },
];

const validationSchema = z.object({
  firstName: z.string().nonempty({ message: "first name is required" }),
  middleName: z.string(),
  lastName: z.string().nonempty({ message: "last name is required" }),
  fatherName: z.string().nonempty({ message: "Father's name is required" }),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  dateOfBirth: z.date(),
  gender: z.string().nonempty({ message: "gender is required" }),
  employment: z.object({
    employeeId: z.number().min(1, { message: "employeeId is required" }),
    employmentId: z.number().min(1, { message: "employeeId is required" }),
    dateOfJoining: z.date(),
    departmentId: z.number().min(1, { message: "departmentId is required" }),
    designationId: z.number().min(1, { message: "designationId is required" }),
    uan: z.string().nonempty({ message: "uan is required" }),
  }),
});
const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<employee>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<employee> = (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 mx-4">
        <div className="row">
          <div className="col-12 col-sm-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                className={
                  errors.firstName ? "form-control error-input" : "form-control"
                }
                id="firstName"
                placeholder="First Name"
                {...register("firstName")}
              />
              <label htmlFor="firstName">First Name</label>
              {errors.firstName && (
                <span className="error-text">{errors.firstName?.message}</span>
              )}
            </div>
          </div>

          <div className="col-12 col-sm-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                className={
                  errors.middleName
                    ? "form-control error-input"
                    : "form-control"
                }
                id="middleName"
                placeholder="Middle Name"
                {...register("middleName")}
              />
              <label htmlFor="middleName">Middle Name</label>
              {errors.middleName && (
                <span className="error-text">{errors.middleName?.message}</span>
              )}
            </div>
          </div>

          <div className="col-12 col-sm-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                className={
                  errors.lastName ? "form-control error-input" : "form-control"
                }
                id="firstName"
                placeholder="Last Name"
                {...register("lastName")}
              />
              <label htmlFor="lastName">Last Name</label>
              {errors.lastName && (
                <span className="error-text">{errors.lastName?.message}</span>
              )}
            </div>
          </div>

          <div className="col-12 col-sm-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                className={
                  errors.fatherName
                    ? "form-control error-input"
                    : "form-control"
                }
                id="firstName"
                placeholder="Father Name"
                {...register("fatherName")}
              />
              <label htmlFor="fatherName">Father Name</label>
              {errors.fatherName && (
                <span className="error-text">{errors.fatherName?.message}</span>
              )}
            </div>
          </div>

          <div className="col-12 col-sm-4">
            <div className="form-floating mb-3">
              <input
                type="email"
                className={
                  errors.email ? "form-control error-input" : "form-control"
                }
                id="email"
                placeholder="Email"
                {...register("email")}
              />
              <label htmlFor="email">Email</label>
              {errors.email && (
                <span className="error-text">{errors.email?.message}</span>
              )}
            </div>
          </div>

          <div className="col-12 col-sm-4">
            <div className="form-floating mb-3">
              <input
                type="date"
                className={
                  errors.dateOfBirth
                    ? "form-control error-input"
                    : "form-control"
                }
                id="dateOfBirth"
                placeholder="Date of birth"
                {...register("dateOfBirth", { valueAsDate: true })}
              />
              <label htmlFor="dateOfBirth">Date of Birth</label>
              {errors.dateOfBirth && (
                <span className="error-text">
                  {errors.dateOfBirth?.message}
                </span>
              )}
            </div>
          </div>

          <div className="col-12 col-sm-4">
            <div className="form-floating mb-3">
              <select
                className={
                  errors.gender ? "form-select error-input" : "form-select"
                }
                id="gender"
                {...register("gender")}
              >
                <option value="" selected>
                  Select your gender
                </option>
                {genders &&
                  genders.map((item) => (
                    <option key={item.id} value={item.gender}>
                      {item.gender}
                    </option>
                  ))}
              </select>
              <label htmlFor="gender">Gender</label>

              {errors.gender && (
                <span className="error-text">{errors.gender?.message}</span>
              )}
            </div>
          </div>

          <div className="col-12 col-sm-4">
            <div className="form-floating mb-3">
              <input
                type="number"
                className={
                  errors.employment?.employeeId
                    ? "form-control error-input"
                    : "form-control"
                }
                id="employeeId"
                placeholder="Employee Id"
                {...register("employment.employeeId", { valueAsNumber: true })}
              />
              <label htmlFor="employeeId">Employee Id</label>
              {errors.employment?.employeeId && (
                <span className="error-text">
                  {errors.employment?.employeeId.message}
                </span>
              )}
            </div>
          </div>

          <div className="col-12 col-sm-4">
            <div className="form-floating mb-3">
              <input
                type="number"
                className={
                  errors.employment?.employmentId
                    ? "form-control error-input"
                    : "form-control"
                }
                id="employmentId"
                placeholder="Employment Id"
                {...register("employment.employmentId", {
                  valueAsNumber: true,
                })}
              />
              <label htmlFor="employmentId">Employment Id</label>
              {errors.employment?.employmentId && (
                <span className="error-text">
                  {errors.employment?.employmentId.message}
                </span>
              )}
            </div>
          </div>

          <div className="col-12 col-sm-4">
            <div className="form-floating mb-3">
              <input
                type="date"
                className={
                  errors.employment?.dateOfJoining
                    ? "form-control error-input"
                    : "form-control"
                }
                id="dateOfJoining"
                placeholder="Date of Joining"
                {...register("employment.dateOfJoining", { valueAsDate: true })}
              />
              <label htmlFor="dateOfJoining">Date of Joining</label>
              {errors.employment?.dateOfJoining && (
                <span className="error-text">
                  {errors.employment?.dateOfJoining.message}
                </span>
              )}
            </div>
          </div>

          <div className="col-12 col-sm-4">
            <div className="form-floating mb-3">
              <select
                className={
                  errors.employment?.departmentId
                    ? "form-select error-input"
                    : "form-select"
                }
                id="departmentId"
                {...register("employment.departmentId", {
                  valueAsNumber: true,
                })}
              >
                <option value={0} selected>
                  Select your department
                </option>
                {departments &&
                  departments.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
              <label htmlFor="gender">Department</label>

              {errors.employment?.departmentId && (
                <span className="error-text">
                  {errors.employment?.departmentId.message}
                </span>
              )}
            </div>
          </div>

          <div className="col-12 col-sm-4">
            <div className="form-floating mb-3">
              <select
                className={
                  errors.employment?.designationId
                    ? "form-select error-input"
                    : "form-select"
                }
                id="designationId"
                {...register("employment.designationId", {
                  valueAsNumber: true,
                })}
              >
                <option value={0} selected>
                  Select your Designation
                </option>
                {designations &&
                  designations.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
              <label htmlFor="designationId">Designation</label>

              {errors.employment?.designationId && (
                <span className="error-text">
                  {errors.employment?.designationId.message}
                </span>
              )}
            </div>
          </div>

          <div className="col-12 col-sm-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                className={
                  errors.employment?.uan
                    ? "form-control error-input"
                    : "form-control"
                }
                id="uan"
                placeholder="UAN"
                {...register("employment.uan")}
              />
              <label htmlFor="uan">UAN</label>
              {errors.employment?.uan && (
                <span className="error-text">
                  {errors.employment?.uan.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4 col-12">
            <button type="submit" className="btn btn-sm btn-primary">
              submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Form;
