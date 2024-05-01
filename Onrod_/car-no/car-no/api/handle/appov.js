const { db } = require("../config/configdb");

const createAppov = async (req, res) => {
    try {
        const {
            appointment_date,
            preferred_time,
            location,
            phone_customer,
            name_customer,
            customer_id,
            car_id,
            expertise_id
        } = req.body;
        const stmt = db.prepare(`INSERT INTO Appointment (
            appointment_date,
            preferred_time,
            location,
            phone_customer,
            name_customer,
            customer_id,
            appointment_status,
            car_id,
            expertise_id
        ) VALUES (?, ?, ?, ?, ?, ?, ? , ? , ?)`);

        const info = stmt.run(
            appointment_date,
            preferred_time,
            location,
            phone_customer,
            name_customer,
            customer_id,
            "pending",
            car_id,
            expertise_id
        );

        res.status(201).json({ success: true, message: 'Appointment created', appointmentId: info.lastInsertRowid });
    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
}

const getAppovById = async (req, res) => {
    try {
        const { id } = req.params;
        const appov = await new Promise((resolve, reject) => {
            db.get("SELECT * FROM Appointment WHERE car_id = ?", [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            })
        })
        if (appov) {
            res.status(200).json({
                success: true,
                message: "Appointment retrieved successfully",
                data: appov
            })
        } else {
            res.status(404).json({
                success: false,
                message: "Appointment not found"
            })
        }
    } catch (e) {
        res.status(500).send(e.message)
    }
}


const updateAppointmentSchedule = async (req, res) => {
    try {
        const { id, car_id } = req.params;
        const { appointment_date, preferred_time, location } = req.body;
        console.log(appointment_date, preferred_time, location, id, car_id)
        const stmt = db.prepare(`UPDATE Appointment SET appointment_date = ?, preferred_time = ?, location = ? WHERE id = ?`);
        const info = stmt.run(appointment_date, `${preferred_time.hour}:${preferred_time.minute}:${preferred_time.second}`, location, id);
        res.status(201).json({ success: true, message: 'Appointment updated', appointmentId: info.lastInsertRowid });
    } catch (e) {
        console.log(e)
        res.status(500).json({ success: false, message: e.message });
    }
}

const updateStatus = async (req, res) => {
    try {
        const { id, car_id } = req.params;
        const { status } = req.body;
        console.log(status, id, car_id)
        const stmt = db.prepare(`UPDATE Appointment SET appointment_status = ? WHERE id = ?`);
        const stmtCar = db.prepare(`UPDATE Car SET selling_status = ? WHERE id = ?`);
        const info = stmt.run(status, id);
        const infoCar = stmtCar.run(status, car_id);
        res.status(201).json({ success: true, message: 'Appointment updated', appointmentId: info.lastInsertRowid, infoCar });
    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
}

const getAppovAll = async (req, res) => {
    try {
        const appovs = await new Promise((resolve, reject) => {
            db.all("SELECT Appointment.*, Car.car_brand as car_name FROM Appointment JOIN Car ON Appointment.car_id = Car.id", (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
        if (appovs) {
            res.status(200).json({
                success: true,
                message: "Appointments retrieved successfully",
                data: appovs
            })
        } else {
            res.status(404).json({
                success: false,
                message: "Appointments not found"
            })
        }
    } catch (e) {
        res.status(500).send(e.message)
    }
}

const addComment = async (req, res) => {
    try {
        const { userId, carId } = req.params;
        const { comment, rating } = req.body;
        if (!userId || !carId || !comment) {
            return res.status(400).json({ success: false, message: 'Missing required parameters' });
        }
        const stmt = db.prepare(`INSERT INTO Comment (
            car_id,
            user_id,
            comment,
            rating
        ) VALUES (?, ?, ? , ?)`);
        const info = stmt.run(carId, userId, comment, rating);
        res.status(201).json({ success: true, message: 'Comment added', commentId: info.lastInsertRowid });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const getComment = async (req, res) => {
    try {
        const { carId } = req.params;
        const comments = await new Promise((resolve, reject) => {
            db.all("SELECT * FROM Comment WHERE car_id = ?", [carId], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            })
        })
        if (comments) {
            res.status(200).json({
                success: true,
                message: "Comments retrieved successfully",
                data: comments
            })
        }
    } catch (e) {
        res.status(500).send(e.message)
    }
}



module.exports = {
    createAppov,
    getAppovById,
    updateStatus,
    getAppovAll,
    addComment,
    getComment,
    updateAppointmentSchedule
};
