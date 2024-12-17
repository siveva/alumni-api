"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countUnapprovedUsers = exports.userApproved = exports.deleteUser = exports.updateUser = exports.getUserByid = exports.getAllUsers = exports.createUser = exports.getUserByUsername = void 0;
const db_1 = __importDefault(require("../utils/db"));
const getUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.user.findFirst({
        where: {
            username,
            isDeleted: false
        }
    });
});
exports.getUserByUsername = getUserByUsername;
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.user.create({
        data: Object.assign({}, payload),
    });
});
exports.createUser = createUser;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.user.findMany({
        where: {
            isDeleted: false,
            role: "USER"
        },
        orderBy: [{ firstname: "asc" }, { lastname: "asc" }]
    });
});
exports.getAllUsers = getAllUsers;
const getUserByid = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.user.findFirst({
        where: {
            id
        }
    });
});
exports.getUserByid = getUserByid;
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.user.update({
        where: {
            id
        },
        data: payload
    });
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.user.update({
        where: {
            id
        },
        data: {
            isDeleted: true
        }
    });
});
exports.deleteUser = deleteUser;
const userApproved = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.user.update({
        where: {
            id
        },
        data: {
            isApproved: true
        }
    });
});
exports.userApproved = userApproved;
const countUnapprovedUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.user.count({
        where: {
            isApproved: false
        }
    });
});
exports.countUnapprovedUsers = countUnapprovedUsers;
