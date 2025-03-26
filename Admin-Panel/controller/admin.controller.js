
const Admin = require("../model/admin.model");
const path = require("path");
const fs = require("fs");

exports.addAdminPage = async (req, res) => {
    if (!req.cookies?.admin?._id) {
        return res.redirect("/");
    }
    let admin = await Admin.findById(req.cookies.admin._id);
    return res.render("addAdmin", { admin });
};

exports.viewAdminPage = async (req, res) => {
    if (!req.cookies?.admin?._id) {
        return res.redirect("/");
    }

    let loginAdmin = await Admin.findById(req.cookies.admin._id);
    let admins = await Admin.find();
    return res.render("view-admin", { admins, admin: loginAdmin });
};

exports.addNewAdmin = async (req, res) => {
    try {
        if (req.file) {
            req.body.image = `/uploads/${req.file.filename}`;
        }
        await Admin.create(req.body);
        return res.redirect("back");
    } catch (error) {
        console.error(error);
        return res.redirect("back");
    }
};

exports.editAdminPage = async (req, res) => {
    try {
        let admin = await Admin.findById(req.params.id);
        if (admin) {
            return res.render("edit-admin", { admin });
        }
        return res.redirect("back");
    } catch (error) {
        console.error(error);
        return res.redirect("back");
    }
};

exports.updateAdmin = async (req, res) => {
    try {
        let admin = await Admin.findById(req.params.id);
        if (admin) {
            if (req.file) {
                let imagePath = path.join(__dirname, "..", admin.image);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
                req.body.image = `/uploads/${req.file.filename}`;
            }

            await Admin.findByIdAndUpdate(admin._id, req.body, { new: true });
            return res.redirect("/admin/view-admin");
        }
        return res.redirect("back");
    } catch (error) {
        console.error(error);
        return res.redirect("back");
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        let admin = await Admin.findById(req.params.id);
        if (!admin) return res.redirect("/view-admin");

        if (admin.image) {
            let imagePath = path.join(__dirname, "..", admin.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Admin.findByIdAndDelete(req.params.id);
        return res.redirect("back");
    } catch (error) {
        console.error(error);
        return res.redirect("back");
    }
};
