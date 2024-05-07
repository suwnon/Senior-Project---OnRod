BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "User" (
	"Id"	INTEGER,
	"username"	TEXT,
	"email"	TEXT,
	"password"	TEXT,
	"phone"	TEXT,
	"fullName"	TEXT,
	"link"	TEXT,
	"role"	TEXT,
	"photo_certificate"	TEXT,
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "Image_car" (
	"Id"	INTEGER,
	"car_id"	INTEGER,
	"name"	TEXT,
	FOREIGN KEY("car_id") REFERENCES "Car"("Id"),
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "Comment" (
	"Id"	INTEGER,
	"car_id"	INTEGER,
	"user_id"	INTEGER,
	"rating"	TEXT,
	"comment"	TEXT,
	FOREIGN KEY("car_id") REFERENCES "Car"("Id"),
	FOREIGN KEY("user_id") REFERENCES "User"("Id"),
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "Appointment" (
	"Id"	INTEGER,
	"customer_id"	INTEGER,
	"expertise_id"	INTEGER,
	"appointment_date"	TEXT,
	"appointment_status"	TEXT,
	"location"	TEXT,
	"preferred_time"	TEXT,
	"name_customer"	TEXT,
	"phone_customer"	TEXT,
	"car_id"	INTEGER,
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "Car" (
	"Id"	INTEGER,
	"user_id"	INTEGER,
	"car_price"	INTEGER,
	"car_brand"	TEXT,
	"car_area"	TEXT,
	"year_of_car"	TEXT,
	"distance"	TEXT,
	"color"	TEXT,
	"type_of_tranmission"	TEXT,
	"fuel"	TEXT,
	"type_of_car"	TEXT,
	"car_description"	TEXT,
	"reason"	TEXT,
	"selling_status"	TEXT,
	"user_name"	TEXT,
	"contact_phone"	TEXT,
	"image_name"	TEXT,
	"car_name"	TEXT,
	"car_mile"	TEXT,
	CONSTRAINT "FK_Car_User" FOREIGN KEY("user_id") REFERENCES "User"("Id"),
	CONSTRAINT "CAR_PK" PRIMARY KEY("Id")
);
INSERT INTO "User" VALUES (1,'expert','exert@hotmail.com','123456','123123123123','12312331',NULL,'expert',NULL);
INSERT INTO "User" VALUES (2,'user','buyer@hotmail.com','123456','1231231212','312132',NULL,'buyer',NULL);
INSERT INTO "User" VALUES (3,'extest','extest@gmail.com','1234567','0987654321','Arrrrrr',NULL,'expert',NULL);
INSERT INTO "User" VALUES (4,'seller','seller@gmail.com','1234567','0987654321','Mamamama',NULL,'seller',NULL);
INSERT INTO "User" VALUES (5,'buyer','buytest@gmail.com','123456','0889765432','Narong',NULL,'buyer',NULL);
INSERT INTO "User" VALUES (6,'exex','exex@gmail.com','123456','0987654322','eieieiei',NULL,'expert',NULL);
INSERT INTO "User" VALUES (7,'Kritsada_StarGaze','kritsada.saetang@email.com','KritsadaSaet@ng','0982345678','Kritsada Saetang',NULL,'seller',NULL);
INSERT INTO "User" VALUES (8,'Nisarat_SunsetSoul','nisarat.phoosiri@email.co.th','NisaratPh0osiri','0813456789','Nisarat Phoosiri',NULL,'seller',NULL);
INSERT INTO "User" VALUES (9,'Anek_MoonRise','anek.siriwat@email.net','AnekS!riwat','0934567890','Anek Siriwat',NULL,'seller',NULL);
INSERT INTO "User" VALUES (10,'Preecha_Wisdom','preecha.wongwiwat@email.org','PreechaW0ngwiwat','645678901','Preecha Wongwiwat',NULL,'seller',NULL);
INSERT INTO "User" VALUES (11,'Wannisa_Mirage','wannisa.pukdeekarn@email.co.th','WannisaPukdeek@rn','0646789012','Wannisa Pukdeekarn',NULL,'seller',NULL);
INSERT INTO "User" VALUES (12,'Apinya_Starborn','apinya.nualsri@email.net','ApinyaNualsri_','0957890123','Apinya Nualsri',NULL,'seller',NULL);
INSERT INTO "User" VALUES (13,'SutinTh0ngpras3rt','sutin.thongprasert@email.co.th','SutinTh0ngpras3rt','0903456789','Sutin Thongprasert',NULL,'seller',NULL);
INSERT INTO "User" VALUES (14,'SomjitSuks0m','somjit.suksom@email.com','SomjitSuks0m','0984567890','Somjit Suksom',NULL,'seller',NULL);
INSERT INTO "User" VALUES (15,'Ananya_Luminous','ananya.lertkarn@email.org','AnanyaLertk@rn','0855678901','Ananya Lertkarn',NULL,'seller',NULL);
INSERT INTO "User" VALUES (16,'Nopporn_StarQuest','nopporn.thanomjit@email.co.th','N0ppornThanomjit','0666789012','Nopporn Thanomjit',NULL,'seller',NULL);
INSERT INTO "User" VALUES (17,'Pranee_Mystic','pranee.kiatjaroen@email.net','PraneeKiatjaroen','0807890123','Pranee Kiatjaroen',NULL,'seller',NULL);
INSERT INTO "User" VALUES (18,'Wichai_EtherealWanderer','wichai.sukwong@email.org','WichaiSukw0ng','0808901234','Wichai Sukwong',NULL,'seller',NULL);
INSERT INTO "User" VALUES (19,'Saowalak_EchoChaser','saowalak.intharapong@email.co.th','SaowalakInth@rapong','0909012345','Saowalak Intharapong',NULL,'seller',NULL);
INSERT INTO "User" VALUES (20,'Thossaporn_WhisperWind','thossaporn.jirapong@email.net','ThossapornJir@p0ng','0611234567','Thossaporn Jirapong',NULL,'seller',NULL);
INSERT INTO "User" VALUES (21,'Nitaya_Zen','nitaya.thamrongchai@email.org','NitayaTh@mrongchai','0912345678','Nitaya Thamrongchai',NULL,'seller',NULL);
INSERT INTO "User" VALUES (22,'Surin_Luminary','surin.yindee@email.co.th','SurinYindee_','0913456789','Surin Yindee',NULL,'seller',NULL);
INSERT INTO "User" VALUES (23,'Sasiporn_StarSeeker','sasiporn.khamphaeng@email.net','SasipornKh@mpaeng','0614567890','Sasiporn Khamphaeng',NULL,'seller',NULL);
INSERT INTO "User" VALUES (24,'Surachai_Silhouette','surachai.duangphet@email.org','SurachaiDuangph3t','0858901234','Surachai Duangphet',NULL,'seller',NULL);
INSERT INTO "User" VALUES (25,'Ketsara_EchoWave','ketsara.thongbai@email.co.th','KetsaraThongbai','0959012345','Ketsara Thongbai',NULL,'seller',NULL);
INSERT INTO "User" VALUES (26,'Natthaphong_SunSpirit','natthaphong.nanthasen@email.net','Natthaph0ngN@nth@s3n','0801234567','Natthaphong Nanthasen',NULL,'seller',NULL);
INSERT INTO "User" VALUES (27,'Thanida_WildBreeze','thanida.wongsa@email.org','ThanidaW0ngsa','0602345678','Thanida Wongsa',NULL,'seller',NULL);
INSERT INTO "User" VALUES (28,'u6388037','geejyy@gmail.com','123456','0811111111','Gee jyy',NULL,'buyer',NULL);
INSERT INTO "User" VALUES (29,'Buyyy01','buy0101@email.com','123456','0811111111','Buyyy01',NULL,'expert',NULL);
INSERT INTO "User" VALUES (30,'buyer','1231231@asdasd.com','123456','0123123123','นาย ภัคกพงษ์ สิทธิพร',NULL,'buyer',NULL);
INSERT INTO "User" VALUES (31,'Joey','winitjoe@hotmail.com','NitW@25600','0855573678','Winit Pangsriuthai','www.test01.com','expert','');
INSERT INTO "User" VALUES (32,'undefined','expert@hotmail.com','123456','0123123123','111112312',NULL,'expert',NULL);
INSERT INTO "User" VALUES (33,'undefined','ttttt@hotmail.com','123456','0123132132','01231555551','','expert','3973555.png');
INSERT INTO "User" VALUES (34,'undefined','userr@email.com','123456','0811445825','Parujee Pangsriuthai','www.Gee.com','expert','');
INSERT INTO "User" VALUES (35,'undefined','gg@email.com','123123','1231231231','PPPP','www.linkedout.com','expert','Funny cat moment.jpg');
INSERT INTO "User" VALUES (36,'undefined','test@555.com','123123','0988888888','Test 555','','expert','');
INSERT INTO "User" VALUES (37,'undefined','123@123.com','123123','1231231231','123123123','www.123123.com','expert','');
INSERT INTO "User" VALUES (38,'undefined','tt@tmail.com','123123','1231231231','123123123123','www.ttttest.com','expert','S__72933393.jpg');
INSERT INTO "Image_car" VALUES (1,1,'1532556.png');
INSERT INTO "Image_car" VALUES (2,1,'1532556.png');
INSERT INTO "Image_car" VALUES (3,2,'');
INSERT INTO "Image_car" VALUES (4,2,'');
INSERT INTO "Image_car" VALUES (5,3,'KritCar.jpeg');
INSERT INTO "Image_car" VALUES (6,3,'');
INSERT INTO "Image_car" VALUES (7,4,'IZZNis.jpg');
INSERT INTO "Image_car" VALUES (8,4,'');
INSERT INTO "Image_car" VALUES (9,5,'honnnndaa.webp');
INSERT INTO "Image_car" VALUES (10,5,'');
INSERT INTO "Image_car" VALUES (11,6,'tyt.jpeg');
INSERT INTO "Image_car" VALUES (12,6,'');
INSERT INTO "Image_car" VALUES (13,7,'wnshonda.jpeg');
INSERT INTO "Image_car" VALUES (14,7,'');
INSERT INTO "Image_car" VALUES (15,8,'apinhonda.jpeg');
INSERT INTO "Image_car" VALUES (16,8,'');
INSERT INTO "Image_car" VALUES (17,9,'susumazdrrraa.webp');
INSERT INTO "Image_car" VALUES (18,9,'');
INSERT INTO "Image_car" VALUES (19,10,'keketmizu.webp');
INSERT INTO "Image_car" VALUES (20,10,'');
INSERT INTO "Image_car" VALUES (21,11,'nattoyota.webp');
INSERT INTO "Image_car" VALUES (22,11,'');
INSERT INTO "Image_car" VALUES (23,12,'thinthinsan.jpeg');
INSERT INTO "Image_car" VALUES (24,12,'');
INSERT INTO "Image_car" VALUES (25,24,'Unknown-2-626x391.jpeg');
INSERT INTO "Image_car" VALUES (26,24,'');
INSERT INTO "Image_car" VALUES (27,25,'qnu1apvts7aL2xH1awB-o.jpg');
INSERT INTO "Image_car" VALUES (28,25,'');
INSERT INTO "Image_car" VALUES (29,26,'');
INSERT INTO "Image_car" VALUES (30,26,'');
INSERT INTO "Image_car" VALUES (31,27,'');
INSERT INTO "Image_car" VALUES (32,27,'');
INSERT INTO "Image_car" VALUES (33,28,'minicooper.jpg');
INSERT INTO "Image_car" VALUES (34,28,'');
INSERT INTO "Image_car" VALUES (35,29,'');
INSERT INTO "Image_car" VALUES (36,29,'');
INSERT INTO "Image_car" VALUES (37,30,'');
INSERT INTO "Image_car" VALUES (38,30,'');
INSERT INTO "Image_car" VALUES (39,31,'');
INSERT INTO "Image_car" VALUES (40,31,'');
INSERT INTO "Image_car" VALUES (41,32,'');
INSERT INTO "Image_car" VALUES (42,32,'');
INSERT INTO "Image_car" VALUES (43,33,'5968242.png');
INSERT INTO "Image_car" VALUES (44,33,'');
INSERT INTO "Comment" VALUES (1,25,1,'1','รถห่วยแตกงับ');
INSERT INTO "Comment" VALUES (2,7,1,'5','ผึ้งชอบสีแดง');
INSERT INTO "Comment" VALUES (3,15,1,'4','strong and handsome car in my mind');
INSERT INTO "Appointment" VALUES (1,2,1,'2024-04-21T17:00:00.000Z','approved','Nonthaburi','17:0:0','123123','123121',1);
INSERT INTO "Appointment" VALUES (2,5,1,'2024-04-23T17:00:00.000Z','pending','bbbb','[object Object]','aaaa','0987654321',5);
INSERT INTO "Appointment" VALUES (3,5,3,'2024-03-29','pending','bbbb','12:12','aaaa','0987654321',5);
INSERT INTO "Appointment" VALUES (4,5,3,'2024-03-19','pending','11','11:1','1111','11',5);
INSERT INTO "Appointment" VALUES (5,2,1,'2024-04-21T17:00:00.000Z','pending','Bangkok','[object Object]','123123','123123',7);
INSERT INTO "Appointment" VALUES (6,31,6,'2024-04-22','pending','Bangkok','[object Object]','Joey','0855573678',9);
INSERT INTO "Appointment" VALUES (7,2,1,'2024-04-29T17:00:00.000Z','pending','123123','[object Object]','123123','123121',3);
INSERT INTO "Appointment" VALUES (8,2,1,'2024-04-02','pending','12312312','0:31','1231','1111',3);
INSERT INTO "Appointment" VALUES (9,2,32,'2024-04-02','pending','1231232','0:31','12123','1211',3);
INSERT INTO "Appointment" VALUES (10,'',38,'','pending','','','','','');
INSERT INTO "Appointment" VALUES (11,'',38,'','pending','','','','','');
INSERT INTO "Appointment" VALUES (12,30,38,'2024-04-10','pending','LA','16:0','123123','123123123',21);
INSERT INTO "Car" VALUES (1,0,123,'testcar','123123','1992','123123',NULL,'12312',NULL,'123123','testtt',NULL,'approved','12312','123111','1532556.png,1532556.png','123',NULL);
INSERT INTO "Car" VALUES (2,2,NULL,'testcar','123123','1992','123123','pink','12312','Gasohol','123123',NULL,'1231','pending','12312','123111',',','123',NULL);
INSERT INTO "Car" VALUES (3,7,258800,'MG 3 ','Bangkapi (Bangkok)','2001','123000','black','Automatic','Diesel','Hatchback','The exterior shows signs of wear with minor scratches on the driver''s side door.',NULL,'pending','Kritsada Saetang','0982345678','KritCar.jpeg,','MG 3 ',NULL);
INSERT INTO "Car" VALUES (4,8,412300,'Izuzu','BangYai (Nontaburi)','2019','256230','white','Manual','','Pickup Truck','The upholstery in the back has a small tear, but overall, the car is in good condition.
','','pending','Nisarat Phoosiri','0982345678','IZZNis.jpg,','Isuzu D-Max ',NULL);
INSERT INTO "Car" VALUES (5,9,899000,'Honda','Huai Khwang (Bangkok)','2020','164830','silver','Automatic','Gasohol','sedan','The front bumper has a few scuff marks, but the engine runs smoothly.','','pending','Anek Siriwat','934567888','honnnndaa.webp,','Honda accord ',NULL);
INSERT INTO "Car" VALUES (6,10,361400,'Toyota','Mueang Chiang Mai (Chiang Mai)','2021','117480','blue','Automatic','','Hatchback','There are some paint chips on the hood, but the interior is clean and well-maintained.','','pending','Preecha Wongwiwat','0645678901','tyt.jpeg,','Toyata yaris ',NULL);
INSERT INTO "Car" VALUES (7,11,528700,'Honda','Mueang Phuket (Phuket)','2016','381640','red','Automatic','','sedan','The rearview mirror has a crack, but the tires are in excellent condition.','','pending','Wannisa Pukdeekarn','0646789012','wnshonda.jpeg,','Honda Civic ',NULL);
INSERT INTO "Car" VALUES (8,12,668200,'Honda','Mueang Krabi (Krabi)','2018','261840','gray','Automatic','','SUV','Minor dents are present on the passenger side, but the air conditioning works perfectly.','','pending','Apinya Nualsri','0657890123','apinhonda.jpeg,','Honda CRV',NULL);
INSERT INTO "Car" VALUES (9,24,354700,'Mazda','Mueang Ayutthaya (Ayutthaya)','2018','372910','gray','Automatic','Gasohol','Hatchback','The dashboard has a faded spot due to sun exposure, but the transmission is in great shape.',NULL,'pending','Surachai Duangphet','0858901234','susumazdrrraa.webp,','Mazda2',NULL);
INSERT INTO "Car" VALUES (10,25,356700,'Mizubishi','Mueang Chonburi (Chonburi)','2020','184570','black','Manual','Diesel','Pickup Truck','A dent on the rear fender is noticeable, but the brakes are recently replaced.','','pending','Ketsara Thongbai','0959012345','keketmizu.webp,','Mizubishi Triton',NULL);
INSERT INTO "Car" VALUES (11,26,416200,'Toyota','Mueang Surat Thani (Surat Thani)','2018','212340','yellow','Manual','','Pickup Truck','The driver''s seat shows some wear, but the car has a reliable service history.','','pending','Natthaphong Nanthasen','0901234567','nattoyota.webp,','Toyota Hilux Revo',NULL);
INSERT INTO "Car" VALUES (12,27,159000,'Nissan ','Mueang Nakhon Ratchasima (Nakhon Ratchasima)','2011','572390','black','Automatic','Gasohol','Hatchback','Scratches on the side panels, but the sound system is upgraded and sounds fantastic.','','pending','Thanida Wongsa','0802345678','thinthinsan.jpeg,','Nissan March ',NULL);
INSERT INTO "Car" VALUES (13,13,345500,'Ford','Mueang Songkhla (Songkhla)','2017','18349','Brown','Manual','Diesel','Pickup Truck','The paint has faded on the roof, but the suspension has been recently serviced.',NULL,'pending','Sutin Thongprasert','0803456789','sutinnieford.png','Ford Ranger',NULL);
INSERT INTO "Car" VALUES (14,14,425000,'Chevrolet','Mueang Ubon Ratchathani (Ubon Ratchathani)','2013','39227','Black','Automatic','Diesel','SUV','Small rust spots on the rear wheel wells, but the engine has low mileage.',NULL,'pending','Somjit Suksom','0804567890','suksomjitchev.jpg','Chevrolet Trailblazer ',NULL);
INSERT INTO "Car" VALUES (15,15,2225800,'Volvo','Phra Pathom Chedi (Nakhon Pathom)','2016','19834','White','Automatic','Plug-in Hybrid','SUV','The sunroof has a minor leak during heavy rain, but the leather seats are well-preserved.',NULL,'pending','Ananya Lertkarn','0905678901','anyavo.png','Volvo XC90',NULL);
INSERT INTO "Car" VALUES (16,16,234800,'Toyota','Mueang Samut Prakan (Samut Prakan)','2012','58923','White','Automatic','Petrol','Sedan','The glove compartment latch is broken, but all electronic features are fully functional.',NULL,'pending','Nopporn Thanomjit','0606789012','nopta.jpg','Toyota Corolla Altis ',NULL);
INSERT INTO "Car" VALUES (17,17,1176000,'BMW','Mueang Udon Thani (Udon Thani)','2019','18392','Brown','Automatic','Diesel','SUV','The alloy wheels have some curb rash, but the car has a sporty and responsive drive.',NULL,'pending','Pranee Kiatjaroen','0807890123','pranee.jpg','BMW X1',NULL);
INSERT INTO "Car" VALUES (18,18,688300,'Mazda','Mueang Rayong (Rayong)','2018','17493','Navy','Automatic','Diesel','SUV','The rear bumper has a scratch, but the car comes with a comprehensive maintenance record.',NULL,'pending','Wichai Sukwong','0808901234','wichaida.jpg','Mazda CX-5 ',NULL);
INSERT INTO "Car" VALUES (19,19,631500,'Honda','Mueang Pattani (Pattani)','2019','15383','Bronze','Automatic','Petrol','Sedan','The power windows on the rear doors need attention, but the fuel efficiency is commendable.',NULL,'pending','Saowalak Intharapong','0909012345','laklak.jpg','Honda Civic ',NULL);
INSERT INTO "Car" VALUES (20,20,437000,'Honda','Mueang Lopburi (Lopburi)','2019','28230','Bronze','Automatic','Petrol','Hatchback','A dent on the front fender, but the transmission shifts smoothly.',NULL,'pending','Thossaporn Jirapong','0911234567','pornhonda.png','Honda Jazz',NULL);
INSERT INTO "Car" VALUES (21,21,405600,'MG','Hua Hin (Prachuap Khiri Khan)','2020','18293','Maroon','Automatic','Petrol','SUV','The paint on the side mirrors is peeling, but the car has a classic and timeless design.',NULL,'pending','Nitaya Thamrongchai','0892345678','nittagee.jpg','MG ZS',NULL);
INSERT INTO "Car" VALUES (22,22,426700,'Suzuki','Mueang Lampang (Lampang)','2021','17823','Black','Automatic','Petrol','Hatchback','The exterior has some faded areas, but the fuel economy is excellent.',NULL,'pending','Surin Yindee','0913456789','surinsuki.jpg','Suzuki Swift ',NULL);
INSERT INTO "Car" VALUES (23,23,376900,'Toyota','Mueang Phitsanulok (Phitsanulok)','2012','68392','Bronze','Automatic','Petrol','Sedan','The driver side door has a dent, but the interior is spacious and well-kept.',NULL,'pending','Surin Yindee','0814567890','SIRIPOOORN.jpg','Toyota Camry',NULL);
INSERT INTO "Car" VALUES (24,4,123123,NULL,'Huai Khwang (Bangkok)',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'cancel',NULL,NULL,'Unknown-2-626x391.jpeg,',NULL,NULL);
INSERT INTO "Car" VALUES (25,4,2,'','','','','silver','','','','','','cancel','','','qnu1apvts7aL2xH1awB-o.jpg,',NULL,NULL);
INSERT INTO "Car" VALUES (26,4,0,'honda','Bangkok','1991','234234234','silver','Manual','Gasohol','Pickup truck',NULL,'want to sell','cancel','awdawdad','2342342342',',','awdawda',NULL);
INSERT INTO "Car" VALUES (27,4,0,'honda','0','1990','0','orange','Automatic','Electric','Minivan',NULL,'Other','cancel','0','0',',','0',NULL);
INSERT INTO "Car" VALUES (28,4,550400,'Mini cooper','UdonThani','2011','98000','red','Automatic','Petrol','Hatchback','Change the sound system to a new one.

',NULL,'pending','deejai','0912345555','minicooper.jpg,','2011 Mini cooper',NULL);
INSERT INTO "Car" VALUES (29,4,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Charitable Donation','cancel',NULL,NULL,',',NULL,NULL);
INSERT INTO "Car" VALUES (30,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'cancel',NULL,NULL,',',NULL,NULL);
INSERT INTO "Car" VALUES (31,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'cancel',NULL,NULL,',',NULL,NULL);
INSERT INTO "Car" VALUES (32,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'cancel',NULL,NULL,',',NULL,NULL);
INSERT INTO "Car" VALUES (33,2,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'The car broke down','cancel',NULL,NULL,'5968242.png,',NULL,NULL);
COMMIT;
