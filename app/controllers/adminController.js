const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// var nodemailer = require("nodemailer");
const { errorHandler } = require("./errHandler");
// const adminSession = require('../models/AdminSession');
const admins = db.admins;
/*************************** **************************/
// create token on admin
// const createToken = async (admin) => {
//   try {
//     //generate access token
//     const token = jwt.sign({ id: admin.id }, process.env.JWT_TOKEN_KEY, {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
//     });
//     //generate refresh token
//     const refreshToken = jwt.sign(
//       { id: admin.id },
//       process.env.JWT_REFRESH_TOKEN_KEY
//     );

//     //insert the token in database adminsessions table.
//     let adminSession = await db.adminSessions.create({
//       userId: admin?.id,
//       refreshToken: refreshToken,
//     });

//     if (adminSession) {
//       console.log("adminSession", adminSession);
//       return {
//         accessToken: token,
//         refreshToken: refreshToken,
//       };
//     } else {
//       return { not_created: "tokens not added in." };
//     }
//     // save user token
//   } catch (err) {
//     console.log("error", err);
//     return { error: true };
//   }
// };

// create code for admin email verification
// const makeCode = async () => {
//   try {
//     var text = "";
//     var possible = "0123456789";
//     let notExist = true;
//     do {
//       for (var i = 0; i < 4; i++) {
//         text += possible.charAt(Math.floor(Math.random() * possible.length));
//       }
//       let resetCode = await db.adminResetCodes.findOne({
//         where: {
//           resetCode: text,
//         },
//         raw: true,
//       });
//       console.log("resetCode", resetCode);
//       if (!resetCode) {
//         notExist = false;
//       }
//     } while (notExist);
//     return text;
//   } catch (err) {
//     console.log("error", err);
//     return { error: true };
//   }
// };

//send email of forget password
// const forgetPasswordEmail = (toUser, emailSubject, emailMessage) => {
//   try {
//     return new Promise((resolve, reject) => {
//       var transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: "harisbakhabarpk@gmail.com",
//           pass: "cfivxreljrvzlqrt",
//         },
//       });

//       var mailOptions = {
//         from: "harisbakhabarpk@gmail.com",
//         to: toUser,
//         subject: emailSubject,
//         text: emailMessage,
//       };

//       let value = transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//           console.log(error);
//         } else {
//           console.log("Email sent: " + info.response);
//           resolve(true);
//         }
//       });
//     });
//   } catch (err) {
//     console.log("error", err);
//     return { error: true };
//   }
// };
/*********************** *********************/
exports.login = async (req, res, next) => {
  try {
    const email = req?.body?.email?.trim?.();
    const password = req?.body?.password?.trim?.();

    if (email && password) {
      let adminData = await admins.findOne({
        where: {
          email: email,
        },
        raw: true,
      });

      if (adminData) {
        let hash = adminData?.password;
        let result = bcrypt.compareSync(password, hash);
        if (result) {
          let tokens = await createToken(adminData);
          if (!tokens?.not_created && !tokens.error) {
            res.status(200).send({
              adminId: adminData?.id,
              adminEmail: adminData?.email,
              firstName: adminData?.firstName,
              lastName: adminData?.lastName,
              tokens: tokens,
            });
          } else if (tokens?.not_created) {
            res.send(errorHandler[400])
          } else if (tokens?.error) {
            res.send(errorHandler[503])
          } else {
            res.send(errorHandler[500])
          }
        } else {
          res.send(errorHandler[401])
        }
      } else {
        res.send(errorHandler[404])
      }
    } else {
      res.send(errorHandler[400])
    }
  } catch (err) {
    console.log("error", err);
    res.send(errorHandler[503])
  }
};

// same like forget password
// exports.resetPassword = async (req, res, next) => {
//   try {
//     receiverEmail = req?.body?.email?.trim();
//     if (receiverEmail) {
//       let emailVerify = await admins.findOne({
//         where: {
//           email: receiverEmail,
//         },
//         raw: true,
//       });
//       if (emailVerify) {
//         console.log("verified", emailVerify?.id);
//         let resetCode = await makeCode();
//         if (resetCode) {
//           let emailMessage =
//             "Hi " +
//             emailVerify?.firstName +
//             " here is your reset password verification code " +
//             resetCode +
//             ".";
//           let emailSubject = "Password Reset Request";
//           let toUser = receiverEmail;
//           let emailSend = await forgetPasswordEmail(
//             toUser,
//             emailSubject,
//             emailMessage
//           );
//           console.log("emailSend", emailSend);
//           if (emailSend) {
//             let existedCode = await db.adminResetCodes.findOne({
//               where: {
//                 userId: emailVerify?.id,
//               },
//             });
//             if (existedCode) {
//               await db.adminResetCodes.update(
//                 {
//                   resetCode: resetCode,
//                 },
//                 {
//                   where: {
//                     userId: emailVerify?.id,
//                   },
//                 }
//               );
//             } else {
//               await db.adminResetCodes.create({
//                 resetCode: resetCode,
//                 userId: emailVerify?.id,
//               });
//             }
//             res
//               .status(200)
//               .send({
//                 success: true,
//                 message:
//                   "reset password email with verification is send to you.",
//               });
//           } else if (emailSend?.error) {
//             console.log("could not send email.");
//             res.status(503).send({ success: false, message: "Server Error." });
//           } else {
//             console.log("something bad occured.");
//             res.send({ success: false, message: "something bad occured." });
//           }
//         } else if (resetCode?.error) {
//           console.log("could not send email.");
//           res.status(503).send({ success: false, message: "Server Error." });
//         } else {
//           console.log("no code found.");
//         }
//       } else {
//         console.log("this email is not verified.");
//         res
//           .status(401)
//           .send({ success: false, message: "email not verified." });
//       }
//     } else {
//       console.log("send proper data.");
//       res.status(400).send({ success: false, message: "Send Proper data." });
//     }
//   } catch (err) {
//     console.log("error", err);
//     res.status(503).send({ success: false, message: "Server Error." });
//   }
// };

// verify code after forget password, sent on email.
// exports.verifyCode = async (req, res, next) => {
//   try {
//     let resetCode = req?.body?.verifycode;
//     if (resetCode) {
//       let code = await db.adminResetCodes.findOne({
//         where: {
//           resetCode: resetCode,
//         },
//         raw: true,
//       });
//       if (code) {
//         res
//           .status(200)
//           .send({ success: true, verified: true, message: "code verified." });
//       } else {
//         res
//           .status(400)
//           .send({
//             success: false,
//             verified: false,
//             message: "code not found.",
//           });
//       }
//     } else {
//       res
//         .status(400)
//         .send({ success: false, message: "please send verify code." });
//     }
//   } catch (err) {
//     console.log("error", err);
//     res.status(503).send({ success: false, message: "Server Error." });
//   }
// };

// resend code if not received in email.
// exports.resendCode = async (req, res, next) => {
//   try {
//     receiverEmail = req?.body?.email?.trim();
//     if (receiverEmail) {
//       let emailVerify = await admins.findOne({
//         where: {
//           email: receiverEmail,
//         },
//         raw: true,
//       });
//       if (emailVerify) {
//         console.log("verified", emailVerify?.id);
//         let resetCode = await makeCode();
//         if (resetCode) {
//           let emailMessage =
//             "Hi " +
//             emailVerify?.firstName +
//             " here is your reset password verification code " +
//             resetCode +
//             ".";
//           let emailSubject = "Password Reset Request";
//           let toUser = receiverEmail;
//           let emailSend = await forgetPasswordEmail(
//             toUser,
//             emailSubject,
//             emailMessage
//           );
//           console.log("emailSend", emailSend);
//           if (emailSend) {
//             let existedCode = await db.adminResetCodes.findOne({
//               where: {
//                 userId: emailVerify?.id,
//               },
//             });
//             if (existedCode) {
//               await db.adminResetCodes.update(
//                 {
//                   resetCode: resetCode,
//                 },
//                 {
//                   where: {
//                     userId: emailVerify?.id,
//                   },
//                 }
//               );
//             } else {
//               await db.adminResetCodes.create({
//                 resetCode: resetCode,
//                 userId: emailVerify?.id,
//               });
//             }
//             res
//               .status(200)
//               .send({
//                 success: true,
//                 message:
//                   "reset password email with verification is send to you.",
//               });
//           } else if (emailSend?.error) {
//             console.log("could not send email.");
//             res.status(503).send({ success: false, message: "Server Error." });
//           } else {
//             console.log("something bad occured.");
//             res.send({ success: false, message: "something bad occured." });
//           }
//         } else if (resetCode?.error) {
//           console.log("could not send email.");
//           res.status(503).send({ success: false, message: "Server Error." });
//         } else {
//           console.log("no code found.");
//         }
//       } else {
//         console.log("this email is not verified.");
//         res
//           .status(401)
//           .send({ success: false, message: "email not verified." });
//       }
//     } else {
//       console.log("send proper data.");
//       res.status(400).send({ success: false, message: "Send Proper data." });
//     }
//   } catch (err) {
//     console.log("error", err);
//     res.status(503).send({ success: false, message: "Server Error." });
//   }
// };

// update password after email for admin.
// exports.updatePassword = async (req, res, next) => {
//   try {
//     let verificationCode = req?.body?.code;
//     let password = req?.body?.password?.trim();
//     let hashedPassword = bcrypt.hashSync(
//       password,
//       parseInt(process.env.BCRYPT_SALT)
//     );
//     let userData = await db.adminResetCodes.findOne({
//       where: {
//         resetCode: verificationCode,
//       },
//       raw: true,
//     });
//     if (userData) {
//       let updatedRows = await admins.update(
//         {
//           password: hashedPassword,
//         },
//         {
//           where: {
//             id: userData?.userId,
//           },
//         }
//       );
//       console.log("updatedRows", updatedRows);
//       if (updatedRows[0] > 0) {
//         // db.adminResetCodes.findOne({
//         // 	where: {
//         // 		resetCode: verificationCode
//         // 	},
//         // 	raw: true
//         // }).then(data => {
//         // 	console.log("data", data)
//         // 	data.destroy();
//         // 	res.status(200).send("password update.")
//         // })
//         await db.adminResetCodes.destroy({
//           where: {
//             resetCode: verificationCode,
//           },
//         });
//         res.status(200).send({ success: true, message: "password update." });
//       } else {
//         res
//           .status(400)
//           .send({ success: false, message: "could not reset password." });
//       }
//     } else {
//       res
//         .status(400)
//         .send({ success: false, message: "this code is not valid." });
//     }
//   } catch (err) {
//     console.log("error", err);
//     res.status(503).send({ success: false, message: "Server Error." });
//   }
// };


exports.getAdmins = async (req, res) => {
  try {
    const result = await admins.findAll();
    res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.send(errorHandler[500])
  }
}
exports.createAdmin = async (req, res) => {
  try {
    // Extract admin data from the request body
    const { firstName, lastName, email, password } = req.body;

    // Create a new admin using Sequelize
    const admin = await admins.create({
      firstName,
      lastName,
      email,
      password,
    });

    res.status(201).json({ data: admin });
  } catch (error) {
    console.error(error);
    res.send(errorHandler[500]);
  }
}
exports.status = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Find the admin by ID
    const admin = await admins.findByPk(id);

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    admin.status = status;
    await admin.save();

    res.json({ data: admin });
  } catch (error) {
    console.error(error);
    res.send(errorHandler[500]);
  }
}
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the admin by ID
    const admin = await admins.findByPk(id);

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Delete the admin
    await admin.destroy();

    res.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error(error);
    res.send(errorHandler[500]);
  }
}