const { User } = require("../../models");
const { Conflict } = require("http-errors");
const {v4} = require("uuid")
const {sendEmail} = require("../../helpers")


const register = async (req, res) => {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict(`Use with ${email} alredy exist`)
    }

    const verificationToken = v4()
    const newUser = new User({ email, subscription, verificationToken });
    newUser.setPassword(password);

    await newUser.save();
    const mail = {
        to: email,
        subject: "Підтвердження email",
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Підтвердіть email</a>`
    };
    await sendEmail(mail);
    
    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            user: {
            email: "example@example.com",
            subscription: "starter", verificationToken
            }
        }
    })
}

module.exports = register;