const { db } = require("../config/configdb");
const createCar = async (req, res) => {
  try {
    const carData = req.body;
    const insertCarQuery =
      `INSERT INTO Car
      (user_id, user_name, contact_phone, car_price, car_brand, car_area, distance, type_of_car, car_description, reason, image_name , fuel , year_of_car , color, type_of_tranmission , selling_status  , car_name , car_mile) 
      VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ? , ? , ? , ? , ? , ? , ? ,?)`;

    const carValues = [
      carData.user_id,
      carData.user_name,
      carData.contact_phone,
      carData.car_price,
      carData.car_brand,
      carData.car_area,
      carData.distance,
      carData.type_of_car,
      carData.car_description,
      carData.reason,
      carData.image_name.join(','),
      carData.fuel,
      carData.year_of_car,
      carData.color,
      carData.type_of_tranmission,
      "pending",
      carData.car_name,
      carData.car_mile,
    ];

    db.run(insertCarQuery, carValues, function (err) {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ error: "Internal Server Error", success: false });
      }
      for (let i = 0; i < carData.image_name.length; i++) {
        const insertImageQuery =
          "INSERT INTO Image_car ( name , car_id ) VALUES ( ?, ? )";
        db.run(insertImageQuery, [carData.image_name[i], this.lastID], function (err) {
          if (err) {
            console.error(err.message);
          }
        });
      }
      res.status(201).json({
        message: "Car added successfully",
        carId: this.lastID,
        success: true,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Bad Request", success: false });
  }
};
const getall = async (req, res) => {
  const {
    car_brand,
    color,
    distance,
    fuel,
    type_of_car,
    type_of_tranmission,
    year_of_car,
    car_area,
    car_name,
    car_price,
  } = req.body; // Changed from req.query to req.body

  let query = "SELECT * FROM Car WHERE 1=1";

  const filterParams = {
    car_brand,
    type_of_car,
    distance,
    color,
    type_of_tranmission,
    fuel,
    year_of_car,
    car_area,
    car_name,
    car_price
  };
  const queryParams = [];
  Object.keys(filterParams).forEach((key) => {
    const value = filterParams[key];
    if (value !== null && value !== undefined && value !== '' && key !== 'distance' && key !== 'car_price' && key !== 'car_brand' && key !== 'car_area' && key !== 'color') {
      query += ` AND ${key} = ?`;
      queryParams.push(value);
    }
  });
  
  if (!!car_price) {
    query += ` AND car_price <= ?`;
    queryParams.push(Number(filterParams.car_price));
  }

  if (!!distance) {
    query += ` AND CAST(distance AS INT) <= ?`;
    queryParams.push(filterParams.distance);
  }

  if (!!car_brand) {
    query += ` AND LOWER(car_brand) = ?`;
    queryParams.push(filterParams.car_brand.toLowerCase());
  }

  if (!!car_area) {
    query += ` AND car_area LIKE ?`;
    queryParams.push(`%${filterParams.car_area}%`);
  }

  if (!!color) {
    query += ` AND LOWER(color) = ?`;
    queryParams.push(filterParams.color.toLowerCase());
  }

console.log(query)
console.log(queryParams)

  try {
    const cars = await new Promise((resolve, reject) => {
      db.all(query, queryParams, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    res.status(200).json({
      success: true,
      message: "Cars retrieved successfully",
      data: cars,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve cars",
      error: error.message,
    });
  }
};
const getbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await new Promise((resolve, reject) => {
      db.get("SELECT * FROM Car WHERE id = ?", [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
    if (car) {
      res.status(200).json({
        success: true,
        message: "Car retrieved successfully",
        data: car,
      });
    } else {
      res.status(404).json({ success: false, message: "Car not found" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve car",
      error: error.message,
    });
  }
};

const getCarByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const cars = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM Car WHERE selling_status = ?", [status], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      })
    })
    if (cars) {
      res.status(200).json({
        success: true,
        message: "Cars retrieved successfully",
        data: cars
      })
    } else[
      res.status(404).json({ success: false, message: "Cars not found" })
    ]
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve cars",
      error: e.message
    })
  }
}

module.exports = {
  createCar,
  getall,
  getbyId,
  getCarByStatus
};
