const { check, validationResult } = require("express-validator");

exports.registerValidate = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name must contain only alphabetic characters and spaces")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  check("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["teacher", "student"])
    .withMessage("Role must be either  'teacher', or 'student'"),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&]/)
    .withMessage("Password must contain at least one special character"),
  check("phone")
    .isMobilePhone()
    .withMessage("Please enter a valid phone number"),
  check("address")
    .isLength({ min: 10 })
    .withMessage("Address must be at least 10 characters long"),
];

exports.loginvalidate = [
  check("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  check("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&]/)
    .withMessage("Password must contain at least one special character"),
];
