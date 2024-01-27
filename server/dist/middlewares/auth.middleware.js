"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("../load_envs");
const JWT_SECRET = process.env.JWT_SECRET_TOKEN || "default_secret_key";
const authenticateUser = (req, res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    console.log("Token from middleware:", token);
    if (!token) {
        res.status(401).json({ error: "Unauthorized: Missing token" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        console.error("Error authenticating user:", error);
        res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
};
exports.authenticateUser = authenticateUser;
