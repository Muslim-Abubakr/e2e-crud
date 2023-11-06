"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.titleValidation = void 0;
const express_validator_1 = require("express-validator");
exports.titleValidation = (0, express_validator_1.body)('title').trim().isLength({ min: 3, max: 20 }).withMessage('Length should be from 3 to 10');
