"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
// import dotenv from 'dotenv';
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
process.env.NODE_ENV !== "production" && app.use((0, morgan_1.default)('dev'));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname + `/config/${process.env.NODE_ENV}.env`) });
app.use((0, cors_1.default)({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express_1.default.json());
app.all('*', (req, res) => res.status(404).json({ message: "Undefinded Routes" }));
exports.default = app;
