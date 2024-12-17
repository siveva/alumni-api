"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const morgan_1 = __importDefault(require("morgan"));
const token_1 = require("./utils/token");
const reaction_route_1 = __importDefault(require("./routes/reaction.route"));
const post_route_1 = __importDefault(require("./routes/post.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const comment_route_1 = __importDefault(require("./routes/comment.route"));
dotenv_1.default.config();
const port = "4000";
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)("tiny"));
const mainRouter = express_1.default.Router();
mainRouter.use((req, res, next) => {
    // Get the token from the request header
    const auth = req.headers['authorization'];
    const split = auth === null || auth === void 0 ? void 0 : auth.split(" ");
    const token = split === null || split === void 0 ? void 0 : split[1];
    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }
    try {
        // Verify token
        (0, token_1.verifyToken)(token);
        next();
    }
    catch (error) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
});
app.use('/uploads', express_1.default.static(__dirname + '/uploads/'));
app.use("/auth", auth_route_1.default);
app.use("/api", mainRouter);
mainRouter.use("/reactions", reaction_route_1.default);
mainRouter.use("/posts", post_route_1.default);
mainRouter.use("/users", user_route_1.default);
mainRouter.use("/comments", comment_route_1.default);
app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
});
