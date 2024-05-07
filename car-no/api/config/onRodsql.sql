CREATE TABLE `User` (
  `Id` int PRIMARY KEY,
  `username` string,
  `email` string,
  `password` string,
  `phone` string,
  `fullName` string,
  `link` string,
  `role` string,
  `photo_certificate` string
);

CREATE TABLE `Role` (
  `Id` int PRIMARY KEY,
  `name` string
);

CREATE TABLE `Car` (
  `Id` int PRIMARY KEY,
  `user_id` int,
  `car_price` int,
  `car_brand` string,
  `car_area` string,
  `year_of_car` string,
  `distance` string,
  `color` string,
  `type_of_tranmission` string,
  `fuel` string,
  `type_of_car` string,
  `car_description` string,
  `image_id` int,
  `reason` string,
  `selling_status` string
);

CREATE TABLE `Image_car` (
  `Id` int PRIMARY KEY,
  `car_id` int,
  `name` string
);

CREATE TABLE `Comment` (
  `Id` int PRIMARY KEY,
  `car_id` int,
  `user_id` int,
  `rating` string
);

CREATE TABLE `Appointment` (
  `Id` int PRIMARY KEY,
  `customer_id` int,
  `expertise_id` int,
  `appointment_date` string,
  `appointment_status` string,
  `location` string
);

ALTER TABLE `Car` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`Id`);

ALTER TABLE `Comment` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`Id`);

ALTER TABLE `Comment` ADD FOREIGN KEY (`car_id`) REFERENCES `Car` (`Id`);

ALTER TABLE `Image_car` ADD FOREIGN KEY (`car_id`) REFERENCES `Car` (`Id`);

CREATE TABLE `User_Appointment` (
  `User_Id` int,
  `Appointment_customer_id` int,
  PRIMARY KEY (`User_Id`, `Appointment_customer_id`)
);

ALTER TABLE `User_Appointment` ADD FOREIGN KEY (`User_Id`) REFERENCES `User` (`Id`);

ALTER TABLE `User_Appointment` ADD FOREIGN KEY (`Appointment_customer_id`) REFERENCES `Appointment` (`customer_id`);


CREATE TABLE `User_Appointment(1)` (
  `User_Id` int,
  `Appointment_expertise_id` int,
  PRIMARY KEY (`User_Id`, `Appointment_expertise_id`)
);

ALTER TABLE `User_Appointment(1)` ADD FOREIGN KEY (`User_Id`) REFERENCES `User` (`Id`);

ALTER TABLE `User_Appointment(1)` ADD FOREIGN KEY (`Appointment_expertise_id`) REFERENCES `Appointment` (`expertise_id`);

