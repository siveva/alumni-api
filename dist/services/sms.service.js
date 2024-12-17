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
exports.sentTwilioSms = void 0;
const twilio_1 = __importDefault(require("twilio"));
const accountSid = "AC2f2d3e1f420aa7bcbf80aaf04fcd72b9";
const authToken = "252b06849aebd6871e6c5f9afe6bb198";
const from = "+12562554441";
const sentTwilioSms = (to, message) => __awaiter(void 0, void 0, void 0, function* () {
    const client = (0, twilio_1.default)(accountSid, authToken);
    const response = yield client.messages.create({
        body: message,
        from: from,
        to: "+63" + to
    });
    console.log('Message sent:', response.sid);
});
exports.sentTwilioSms = sentTwilioSms;
