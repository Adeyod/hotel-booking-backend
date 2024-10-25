"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: [process.env.FRONTEND_URL || ''],
    credentials: true,
}));
app.use((0, helmet_1.default)());
app.use('/', (req, res) => {
    res.send('Welcome to the new hotel application...');
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});