import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

// schéma toho, jak bude uživatelský dokument vypadat
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Prosím, zadejte jméno"],
  },
  email: {
    type: String,
    required: [true, "Prosím, zadejte email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Prosím, zadejte platnou emailovou adresu"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Prosím, zadejte heslo"],
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Prosím, potvrďte své heslo"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Hesla se musí shodovat!",
    },
  },
});

// před tím, než se dokument s uživatelskými daty uloží do databáze, se spustí tento middleware, který přehashuje heslo, a pak se to uloží s hashnutým heslem
userSchema.pre("save", async function (next) {
  // pokud se heslo nezměnilo = přeskočit
  if (!this.isModified("password")) return next();

  // hashing = encyrption (bcrypt algorithm)
  this.password = await bcrypt.hash(this.password, 12);

  // po validaci už nepotřebujeme passwordConfirm
  this.passwordConfirm = undefined;

  next();
});

// vytvoření instance metody, která porovnává hesla při loginu
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

export default User;
