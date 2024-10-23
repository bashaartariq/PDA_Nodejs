const { user } = require('../Model');
const {body,validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const validateUser = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('gender').isIn(['male', 'female', 'other']).withMessage('Gender is required and must be one of: male, female, other'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('confirmPassword').custom((value, { req }) => value === req.body.password).withMessage('Passwords must match'),
    body('role').isIn(['admin', 'doctor', 'patient']).withMessage('Role is required and must be one of: admin, doctor, patient')
  ];

  const signin = async (req, res) => {
    console.log("I am running");
    const { email, password } = req.body;
    console.log(email,password);
  
    if (!email || !password) {
      return res.status(400).send({ error: 'Email and password are required' });
    }
  
    try {
      const foundUser = await user.findOne({ where: { email } });
      if (!foundUser) {
        return res.status(404).send({ error: 'User not found' });
      }
      const isPasswordValid = await bcrypt.compare(password, foundUser.password);
      if (!isPasswordValid) {
        return res.status(401).send({ error: 'Invalid credentials' });
      }
        const token = jwt.sign(
        { userId: foundUser.id, email: foundUser.email, role: foundUser.role },
        'your-secret-key',
        { expiresIn: '2h' }
      );
  
      return res.status(200).send({
        message: 'Login successful',
        token,
        user: {
          id: foundUser.id,
          email: foundUser.email,
          role: foundUser.role,
        },
      });
    } catch (err) {
      console.error('Error:', err);
      return res.status(500).send({ error: 'An error occurred during login' });
    }
  };
  

const signup = async(req,res)=>{
    console.log(req.body);
    // const errors = validationResult(req);
    // if(!errors.isEmpty())
    // {
    //     return res.status(400).json({
    //         message:'Validation failed'
    //     })
    // }
    const {firstName,middleName,lastName,gender,email,confirmPassword,role,password,dob } = req.body;

    console.log(dob);
    try {
        const existingUser = await user.findOne({ where: { email } });
        const PatientUnique = await user.findOne({where:{firstName,middleName,lastName,role:'patient',dob}});
        if (existingUser || PatientUnique) {
          return res.status(400).json({
            message: 'Email is already taken',
          });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await user.create({
            firstName,
            middleName,
            lastName,
            gender,
            email,
            password: hashedPassword,
            dob,
            role
          });

          const token = jwt.sign(
            { userId: newUser.id, email: newUser.email, role: newUser.role },
            'your-secret-key',
            { expiresIn: '2h' }
          );
            res.status(200).json({
            message: 'User created successfully',
            token:token,
            user: newUser
          });
        }
    catch(error)
    {
        console.error('Error creating user:', error);
        res.status(500).json({
          message: 'Error creating user',
          error: error.message
        });
    }
}
module.exports = {signin,signup};