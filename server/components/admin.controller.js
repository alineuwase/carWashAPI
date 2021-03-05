import auth from '../helpers/authenticate';
import conn from '../config/config';

class adminController {
    static async addService(req, res){
        const { serviceName, price } =  req.body;
        const post = {
            service_name: serviceName,
            price: price
        }
        conn.query('INSERT INTO services SET ?', post, function (error, results, fields) {
            if(error) throw error;
            res.status(201).json({
                message: "Service added",
                status: 201
            });
        });
    }

    static async addReport(req, res){
        const { date, plateNo, carMark, cleanerName, status } = req.body;
        const post = {
            date: date,
            plate_no: plateNo,
            car_mark: carMark,
            cleaner_name: cleanerName,
            status: status
        }
        conn.query('INSERT INTO report SET ?', post, function (error, results, fields) {
            if(error) throw error;
            res.status(201).json({
                message: "report added",
                status: 201
            });
        });
    }

    static async addAdmin(req, res){
        const { names, phoneNumber} = req.body;
        const password = auth.hashPassword(req.body.password);
        const post = {
            names: names,
            phone_number: phoneNumber,
            user_type: 'admin',
            password: password,
        }
        conn.query('INSERT INTO users SET ?', post, function(error, results, fields){
            if (error) throw error;
            res.status(201).json({
                message: "Admin Added Successful",
                status: 201
            });
        });
    }

    static async bookings(req, res){
        conn.query('SELECT * FROM bookings;', function (error, results, fields) {
            if (error) throw error;
    
            res.status('200').json({
                message: 'Get all bookings',
                status: 200,
                results: results
            });
        })
    }

    static async booking(req, res){
        const {tel} = req.query;
        conn.query(`SELECT * FROM bookings WHERE phone_number=${tel};`, function (error, results, fields) {
            if (error) throw error;
    
            res.status('200').json({
                message: 'Get all bookings',
                status: 200,
                results: results
            });
        })
    }

    static async getReports(req, res){
        conn.query('SELECT * FROM report;', function (error, results, fields) {
            if (error) throw error;

            res.status('200').json({
                message: 'Get all services',
                status: 200,
                results: results
            });
        });
    }

    static async getUsers(req, res){
        conn.query('SELECT * FROM users;', function (error, results, fields){
            if (error) throw error;
            res.status('200').json({
                message: 'Get all Users',
                status: 200,
                results: results
            })
        })
    }

    static async deleteUsers(req, res){
        const { userid } = req.query;
        conn.query('DELETE FROM users WHERE user_id=?', [userid], function (error, results, fields) {
            if (error) throw error;
            res.status(202).json({
                message: 'Deleted Successfully',
                status: 202
            });
        })
    }

    static async deleteReport(req, res){
        const { plateno } = req.query;
        conn.query('DELETE FROM report WHERE plate_no=?', [plateno], function (error, results, fields) {
            if (error) throw error;
            res.status(202).json({
                message: 'Deleted Successfully',
                status: 202
            });
        })
    }

    static async deleteService(req, res){
        const { serviceid } = req.query;
        conn.query('DELETE FROM services WHERE service_id=?', [serviceid], function (error, results, fields) {
            if (error) throw error;
            res.status(202).json({
                message: 'Deleted Successfully',
                status: 202
            });
        })
    }

}   

export default adminController;
