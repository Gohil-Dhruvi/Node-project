const Admin = require("../model/admin.model");
const { sendMail } = require("../config/mailConfig");

exports.logout = async (req, res) => {
    res.clearCookie("admin");
    return res.redirect("/");
}

exports.loginPage = async (req, res) => {
    if (req.cookies && req.cookies.admin && req.cookies.admin._id) {
        return res.redirect("/dashboard")
    } else {
        return res.render('login')
    }
}

exports.dashboard = async (req, res) => {
    if (req.cookies == null || req.cookies.admin == undefined || req.cookies.admin._id == undefined) {
        return res.redirect("/");

    } else {
        let admin = await Admin.findById(req.cookies.admin._id)
        return res.render('dashboard', { admin })
    }
}

exports.profilePage = async (req, res) => {
    try {
        if (req.cookies == null || req.cookies.admin == undefined || req.cookies.admin._id == undefined) {
            return res.redirect("/");
        }
        let admin = await Admin.findById(req.cookies.admin._id);
        return res.render("profile", { admin });
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};

exports.forgotpasswordPage = (req, res) => {
    try {
        return res.render("forgotpassword/forgotpassword")
    } catch (error) {
        console.log(error);

    }
}

exports.sendMail = async (req, res) => {
    try {
        let admin = await Admin.findOne({ email: req.body.email });

        if (admin) {
            let otp = Math.floor(100000 + Math.random() * 900000);
            await sendMail(req.body.email, otp);
            return res.render("forgotpassword/otp");
        } else {
            console.log("Admin not found");
            return res.redirect("back")
        }
    } catch (error) {
        console.log(error);
        return res.redirect("back");
    }
};

exports.verifyotp = async (req, res) => {
    try {
        let otp = req.cookies.otp;
        if (otp = req.body.otp) {
            return res.render('forgotpassword/newPassword')
        } else {
            console.log("Otp Mismatched");
            return res.redirect("back")
        }
    } catch (error) {

    }
}

// exports.changePassword = async (req, res) => {
//     try {
//         let { password, c_password } = req.body;
//         let email = req.cookies.email;

//         if (password === c_password) {
//             let admin = await Admin.findOne({ email });
//             if (admin) {
//                 await Admin.findOneAndUpdate({ email }, { password });
//                 console.log("Password Updated");
//                 return res.redirect("/");
//             } else {
//                 console.log("Admin not Found");
//                 return res.redirect("/");
//             }
//         } else {
//             console.log("Passwords do not match");
//             return res.redirect("back");
//         }
//     } catch (error) {
//         console.log(error);
//         return res.redirect("back");
//     }
// };

exports.changePassword = async (req, res) => {
    try {
        let password = req.body.password;
        let c_password = req.body.c_password;
        let email = req.cookies.email;

        if (password === c_password) {
            let admin = await Admin.findOneAndUpdate(
                { email: email },
                { password: password  },
                { new: true }
            );

            if (admin) {
                res.clearCookie("email");
                res.clearCookie("otp");
                console.log("Password Updated");
                return res.redirect("/"); 
            } else {
                console.log("Admin not found");
                return res.redirect("/");
            }
        } else {
            console.log("Password & Confirm Password not matched");
            return res.redirect("/");
        }
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};


exports.loginAdmin = async (req, res) => {
    try {
        let admin = await Admin.findOne({ email: req.body.email })
        if (admin) {
            if (admin.password == req.body.password) {
                res.cookie("admin", admin)
                return res.redirect("/dashboard")
            } else {
                console.log("Password is not matched");
                return res.redirect("back");
            }
        } else {
            console.log("Admin not Found");
            return res.redirect("back");
        }
    } catch (error) {
        return res.redirect("back");
    }
}

