import { create } from "zustand";

const useCarFilterStore = create<{
  data: {
    car_brand: string;
    year_of_car: string;
    distance: string;
    color: string;
    type_of_tranmission: string;
    fuel: string;
    type_of_car: string;
    car_area: string;
    car_name: string;
  };
  setCars: (cars: {
    car_brand: string;
    year_of_car: string;
    distance: string;
    color: string;
    type_of_tranmission: string;
    fuel: string;
    type_of_car: string;
    car_area: string;
    car_name: string;
  }) => void;
}>((set) => ({
  data: {
    car_brand: "",
    year_of_car: "",
    distance: "",
    color: "",
    type_of_tranmission: "",
    fuel: "",
    type_of_car: "",
    car_area: "",
    car_name: "",
  },
  setCars: (cars: {
    car_brand: string;
    year_of_car: string;
    distance: string;
    color: string;
    type_of_tranmission: string;
    fuel: string;
    type_of_car: string;
    car_area: string;
    car_name: string;
  }) =>
    set({
      data: cars,
    }),
}));

const useApprove = create<{
  data: {
    appointment_date: string;
    preferred_time: string;
    location: string;
    phone_customer: string;
    name_customer: string;
    customer_id: string;
    expertise_id?: string;
    car_id: string;
  };
  setApprove: (data: {
    appointment_date: string;
    preferred_time: string;
    location: string;
    phone_customer: string;
    name_customer: string;
    customer_id: string;
    expertise_id?: string;
    car_id: string;
  }) => void;
}>((set) => ({
  data: {
    appointment_date: "",
    preferred_time: "",
    location: "",
    phone_customer: "",
    name_customer: "",
    customer_id: "",
    expertise_id: "",
    car_id: "",
  },
  setApprove: (data: {
    appointment_date: string;
    preferred_time: string;
    location: string;
    phone_customer: string;
    name_customer: string;
    customer_id: string;
    expertise_id?: string;
    car_id: string;
  }) => set({ data }),
}));
export { useCarFilterStore, useApprove };
