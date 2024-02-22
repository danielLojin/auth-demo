import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, statusCode, res) => {
  // generování tokenu
  const token = signToken(user._id);

  // nastavení cookies
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: "strict",
  };

  // poslání cookie
  res.cookie("jwt", token, cookieOptions);

  // odebrání hesla
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const signUp = async (req, res) => {
  try {
    // vytvoření uživatele na základně hodnot z requestu
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
    });

    // poslání cookie a nového uživatele zpět
    createAndSendToken(newUser, 201, res);
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
    console.log("Error in signup: ", error.message);
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // pokud nebylo zadán email nebo heslo = vrátit error
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Prosím, zadejte email a heslo",
      });
    }

    // najít uživatele podle emailu v db
    const user = await User.findOne({ email }).select("+password");

    // pokud byl zadán neplatný email nebo heslo = vrátit error
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(400).json({
        status: "error",
        message: "Neplatný email nebo heslo",
      });
    }

    // poslání cookie a uživatele zpět
    createAndSendToken(user, 200, res);
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
    console.log("Error in login: ", error.message);
  }
};

export const logOut = (req, res) => {
  try {
    // smazání cookie
    res.cookie("jwt", "", {
      maxAge: 1,
      httpOnly: true,
    });

    res.status(200).json({
      status: "success",
      message: "Uživatel byl odhlášen",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Neautorizováno, prosím, přihlašte se",
      });
    }

    // promisifyování funcke jwt.verify(), abych mohli použít await a tudíž počkat, až se to ověří
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // zkontrolovat, jestli uživatel ještě existuje
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: "error",
        message: "Uživatel, ke kterému patří tento token, již neexistuje",
      });
    }

    // udělení přístupu tak, že do requestu přidáme uživatele, kterého to našlo na základě jwt tokenu
    req.user = currentUser;

    next();
  } catch (error) {
    res.status(401).json({
      status: "error",
      message: error.message,
    });

    console.log("Error in protect: ", error.message);
  }
};

export const restrict = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "error",
        message: "Nemáte oprávnění k tomuto úkonu",
      });
    }

    next();
  };
};
