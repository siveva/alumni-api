"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = "williamSadam00817";
const signToken = (payload) => {
    //const expiresIn = 3600 * 8;
    const expiresIn = 31536000;
    return jsonwebtoken_1.default.sign(payload, secret !== null && secret !== void 0 ? secret : '', { expiresIn });
};
exports.signToken = signToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, secret !== null && secret !== void 0 ? secret : '');
};
exports.verifyToken = verifyToken;
