const Model = require("../system/core/Model");
module.exports = class User extends Model {
    constructor() {
        super();
    }
    getUserByEmail = async (res, email) => {
        await this.connectToDatabase();
        /* Start of mySql */
        const query = await this.qb.select().where(["email", "=", "?"]).get("users");
        const [rows, field] = await this.query(res, query, email);
        /* End of mySql */
        /* Start of pg */
        // const query = await this.qb.select().where(["email", "=", "$1"]).get("users");
        // const value = email;
        /* End of pg */
        /* Start of mongodb */
        // const table = "users";
        // const query = { email };
        // const rows = await this.mongoFind(res, table, query);
        /* End of mongodb */
        // const rows = await this.query(res, query, value);
        return rows;
    };

    createUser = async (res, values) => {
        await this.connectToDatabase();
        /* mySQL and Postgres */
        const query = await this.qb
            .values(["$1", "$2", "$3", "$4"])
            .insertInto("first_name", "last_name", "email", "password_hash")
            .set("users");
        return await this.query(res, query, values);
        // const table = "users";
        // return await this.mongoCreate(res, table, values);
    };
    validateRegister = async (post, res) => {
        const { firstName, lastName, email, password, confirmPassword } = post;
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return { type: "error", message: "Please fill in empty fields" };
        } else if (!this.helper.isBetween(firstName.length, 3, 45)) {
            return { type: "error", message: "Invalid first name length" };
        } else if (!this.helper.isBetween(lastName.length, 3, 45)) {
            return { type: "error", message: "Invalid last name length" };
        } else if (!this.helper.isBetween(email.length, 3, 100)) {
            return { type: "error", message: "Invalid email length" };
        } else if (!this.helper.isBetween(password.length, 6, 45)) {
            return { type: "error", message: "Invalid password length" };
        } else if (!this.helper.isBetween(confirmPassword.length, 6, 45)) {
            return { type: "error", message: "Invalid password confirm length" };
        } else if (!this.helper.isValidEmail(email)) {
            return { type: "error", message: "Invalid email" };
        } else if (!this.helper.isValidName(firstName)) {
            return { type: "error", message: "Invalid first name" };
        } else if (!this.helper.isValidName(lastName)) {
            return { type: "error", message: "Invalid last name" };
        } else if (password !== confirmPassword) {
            return { type: "error", message: "Password and confirm password does not match" };
        }
        /* Database verifications */
        const emailCheck = await this.getUserByEmail(res, email);
        if (emailCheck.length !== 0) {
            return { type: "error", message: "Email is already taken" };
        } else {
            const passwordHash = this.bcrypt.hashSync(password, 10);
            // mySQL and Postgres
            // const values = [firstName, lastName, email, passwordHash];
            const values = { first_name: firstName, last_name: lastName, email, password_hash: passwordHash };
            const addUser = await this.createUser(res, values);
            return {
                type: "success",
                message: "Successfully added user",
                data: { firstName: firstName, lastName: lastName, email: email },
            };
        }
    };
    validateSignin = async (post, res) => {
        const { email, password } = post;
        if (!email || !password) {
            return { type: "error", message: "Please fill in empty fields" };
        } else if (!this.helper.isBetween(email.length, 3, 100)) {
            return { type: "error", message: "Invalid email length" };
        } else if (!this.helper.isValidEmail(email)) {
            return { type: "error", message: "Invalid email" };
        } else if (!this.helper.isBetween(password.length, 6, 45)) {
            return { type: "error", message: "Invalid password length" };
            /* Database verification */
        }
        const user = await this.getUserByEmail(res, email);
        if (user === 0) {
            console.log("Wrong email");
            return { type: "error", message: "Wrong email/password" };
        }
        const verifyPassword = this.bcrypt.compareSync(password, user[0].password_hash);
        if (!verifyPassword) {
            console.log("Wrong password");
            return { type: "error", message: "Wrong email/password" };
        } else {
            console.log("Log in");
            return {
                type: "success",
                message: "Successfully log in",
                data: { firstName: user[0].first_name, lastName: user[0].last_name, email: email },
            };
        }
    };
};
