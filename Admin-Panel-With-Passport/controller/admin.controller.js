const Admin = require("../model/admin.model");
const path = require("path");
const fs = require("fs");

exports.addAdminPage = async (req, res) => {
  return res.render("add_admin");
};

exports.viewAllAdminPage = async (req, res) => {
  try {
    let admins = await Admin.find();
    return res.render("view_all_admin", { admins });
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};

exports.addNewAdmin = async (req, res) => {
  try {
    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
      req.body.image = imagePath;
    }

    await Admin.create(req.body);
    return res.redirect("/admin/view-admins"); 
  } catch (error) { 
    console.log(error);
    return res.redirect("back");
  }
};

exports.editAdminPage = async (req, res) => {
  try {
    let admin = await Admin.findById(req.params.id);
    if (admin) {
      return res.render("edit_admin", { admin });
    }
    return res.redirect("/admin/view-admins"); 
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    let admin = await Admin.findById(req.params.id);
    if (admin) {
      if (req.file) {
        let imagePath = "";
        if (admin.image) {
          imagePath = path.join(__dirname, "..", "public", admin.image);
          if (fs.existsSync(imagePath)) {
            try {
              fs.unlinkSync(imagePath); 
            } catch (error) {
              console.log("Error deleting old image:", error);
            }
          }
        }
        imagePath = `/uploads/${req.file.filename}`;
        req.body.image = imagePath;
      }

      let updateAdmin = await Admin.findByIdAndUpdate(admin._id, req.body, {
        new: true,
      });
      if (updateAdmin) {
        return res.redirect("/admin/view-admins");
      }
    }
    return res.redirect("back");
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    let admin = await Admin.findById(req.params.id);
    if (!admin) return res.redirect("/admin/view-admins");

    if (admin.image) {
      let imagePath = path.join(__dirname, "..", "public", admin.image);
      if (fs.existsSync(imagePath)) {
        try {
          fs.unlinkSync(imagePath); 
        } catch (error) {
          console.log("Error deleting image:", error);
        }
      }
    }

    await Admin.findByIdAndDelete(req.params.id);
    return res.redirect("/admin/view-admins");
  } catch (error) {
    console.error(error);
    return res.redirect("back");
  }
};
