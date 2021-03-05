import conn from '../config/config';
import auth from '../helpers/authenticate';

class userController {
    static async signUp(req, res){
        const { names, phoneNumber} = req.body;
        const password = auth.hashPassword(req.body.password);
        const post = {
            names: names,
            phone_number: phoneNumber,
            user_type: 'client',
            password: password,
        }
        conn.query('INSERT INTO users SET ?', post, function(error, results, fields){
            if (error) {
                return res.status(409).json({
                    errorMessage: "Phone number Already used!",
                    status: 409
                });
            };
            res.status(201).json({
                message: "Successful",
                status: 201
            });
        });
    }

    static async signIn(req, res){
        const {phoneNumber, password} = req.body;
        conn.query(`SELECT * FROM users WHERE phone_number=?;`,[phoneNumber], function (error, results, fields) {
            if (error) throw error;
            if (results[0]){
                const compare = auth.checkPassword(password, results[0].password);
                if(compare){
                    res.status(200).json({
                        message: 'Successful logged in',
                        status: 200,
                        token: auth.generateToken(results[0])
                    });
                }else{
                    return res.status(401).json({
                        status: 401,
                        errorMessage: 'Wrong credentials'
                    });
                }
            }else{
                return res.status(401).json({
                    status: 401,
                    errorMessage: 'Wrong credentials'
                });
            }
                
        });
    }
}

export default userController;
