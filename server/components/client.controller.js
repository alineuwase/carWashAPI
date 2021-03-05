import jwtDecode from 'jwt-decode';
import axios from 'axios';
import conn from '../config/config';
import crypto from 'crypto';

class clientController{
    static async booking(req, res){
        const { date, service, carType, price, phoneNumber, plateNo, requestTransactionId} = req.body;
        const post = {
            plate_no: plateNo,
            date: date,
            service: service,
            car_type: carType,
            phone_number: phoneNumber,
            price: price,
            pay_status: 'not paid',
            status: 'pending',
            request_transaction_id: requestTransactionId
        }
        conn.query('INSERT INTO bookings SET ?', post, function(error, results, fields) {
            if (error) throw error;
            console.log('The sulition is: ', results[0]);
            res.status(201).json({
                message: 'Booked successful',
                status: '201'
            });
        });

    }


    static async getServices(req, res){
        conn.query('SELECT * FROM services;', function (error, results, fields) {
            if (error) throw error;

            res.status('200').json({
                message: 'Get all services',
                status: 200,
                results: results
            });
        })
    }

    static async payService(req, res){
        const username = 'testa';
        const accountNo = '250160000011';
        const partnerPassword = 'pass123456789';

        function yyyymmdd() {
            const x = new Date();
            const y = x.getUTCFullYear().toString();
            let m = (x.getUTCMonth() + 1).toString();
            let d = x.getUTCDate().toString();
            let h = x.getUTCHours().toString();
            let min = x.getUTCMinutes().toString();
            let s = x.getUTCSeconds().toString();

            (d.length == 1) && (d = '0' + d);
            (m.length == 1) && (m = '0' + m);
            (h.length == 1) && (h = '0' + h);
            (min.length == 1) && (min = '0' + min);
            (s.length == 1) && (s = '0' + s);
            
            const yyyymmddhhmmss = y + m + d + h + min + s;
            return yyyymmddhhmmss;
        }

        const timestampp = yyyymmdd();
        const password = crypto.createHash('sha256').update(username+accountNo+partnerPassword+timestampp).digest('hex');
        const {phoneNumber, amount, requestTransId} = req.body;
        const tel = `25${phoneNumber}`;
        const data = {
            username: username,
            timestamp: timestampp,
            amount:amount,
            password: password,
            mobilephone: tel,
            requesttransactionid: requestTransId
        }
        const options = {
            method: 'post',
            url: 'https://www.intouchpay.co.rw/api/requestpayment/',
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }
        axios(options)
        .then((data) => {
            console.log(data)
            res.json(data.data)
        })
        .catch((err) => console.log(err))

    }
    
    static async checkPayment (req, res){
        const { requesttransactionid } = req.body;
        conn.query('SELECT * FROM bookings WHERE request_transaction_id=?', [requesttransactionid], function(error, results, fields){
            if (error) {
                return console.log('No request Id');
            }

            if(results[0].request_transaction_id === requesttransactionid){
                conn.query("UPDATE bookings SET pay_status = 'paid' WHERE request_transaction_id=?", [requesttransactionid], function (error, results, field) {
                    if (error) throw error

                    res.status(200).json({
                        message: 'success',
                        success: true,
                        request_id: requesttransactionid
                    });
                })
            }
        });

    }

    
}

export default clientController;
