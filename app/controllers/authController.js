const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const { Admin, Member } = require("../models");
const ApiError = require("../utils/apiError");

const register = async (req, res, next) => {
  const { name, age, address, email, password, confirmPassword } = req.body;
  try {
    if (!name && !age && !address && !email && !password) {
      return next(
        new ApiError("Name, Age, Address, Email, Password are required!", 400)
      );
    }

    const member = await Member.findOne({
      where: {
        email,
      },
    });

    if (member) {
      return next(new ApiError("Email has already taken", 400));
    }

    const passwordLength = password.length <= 8;
    if (passwordLength) {
      return next(new ApiError("Minimum password must be 8 characters", 400));
    }

    if (password !== confirmPassword) {
      return next(new ApiError("Password does not match", 400));
    }

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const newMember = await Member.create({
      name,
      age,
      address,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      status: "success",
      data: {
        newMember,
      },
    });
  } catch (error) {
    return next(new ApiError(error.message, 400));
  }
};

// const login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     // Coba mencari pengguna di tabel admin
//     const admin = await Admin.findOne({
//       where: {
//         email,
//       },
//       attributes: [
//         "id",
//         "name",
//         "age",
//         "address",
//         "role",
//         "email",
//         "password",
//         "createdAt",
//         "updatedAt",
//       ],
//     });
//     console.log(admin);
//     // console.log(admin.password);
//     // console.log(password);

//     // Jika admin ditemukan dan kata sandi cocok
//     if (admin && bcrypt.compare(password, admin.password)) {
//       // Buat token untuk admin
//       const token = jwt.sign(
//         {
//           id: admin.id,
//           name: admin.name,
//           email: admin.email,
//           role: admin.role,
//         },
//         process.env.JWT_SECRET
//       );

//       res.status(200).json({
//         status: "Success",
//         message: "Berhasil login",
//         data: token,
//       });
//     } else {
//       // Jika pengguna tidak ditemukan atau kata sandi tidak cocok
//       next(new ApiError("Email atau kata sandi salah", 400));
//     }
//   } catch (err) {
//     next(new ApiError(err.message, 500));
//   }
// };

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Coba mencari pengguna di tabel admin
    const admin = await Admin.findOne({
      where: {
        email,
      },
      attributes: [
        "id",
        "name",
        "age",
        "address",
        "role",
        "email",
        "password",
        "createdAt",
        "updatedAt",
      ],
    });

    // Jika admin ditemukan dan kata sandi cocok
    if (admin && bcrypt.compare(password, admin.password)) {
      // Buat token untuk admin
      const token = jwt.sign(
        {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
        process.env.JWT_SECRET
      );

      res.status(200).json({
        status: "Success",
        message: "Berhasil login",
        data: token,
      });
    } else {
      // Jika admin tidak ditemukan, coba mencari pengguna di tabel member
      const member = await Member.findOne({
        where: {
          email,
        },
      });

      // Jika member ditemukan dan kata sandi cocok
      if (member && bcrypt.compare(password, member.password)) {
        // Buat token untuk member
        const token = jwt.sign(
          {
            id: member.id,
            name: member.name,
            email: member.email,
            password: member.password,
          },
          process.env.JWT_SECRET
        );

        res.status(200).json({
          status: "Success",
          message: "Berhasil login",
          data: token,
        });
      } else {
        // Jika pengguna tidak ditemukan atau kata sandi tidak cocok
        return next(new ApiError("Email atau kata sandi salah", 400));
      }
    }
  } catch (err) {
    return next(new ApiError(err.message, 500));
  }
};

const checkToken = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "success",
      data: {
        user: req.user,
      },
    });
  } catch (err) {
    return next(new ApiError(err.message, 500));
  }
};

module.exports = {
  register,
  login,
  checkToken,
};
