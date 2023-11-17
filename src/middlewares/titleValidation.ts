import { body } from "express-validator"
import { inputValidationMiddleware } from "./input-validation-middleware"

export const titleValidation = [
    body('title').trim().isLength({ min: 3, max: 20 }).withMessage('Length should be from 3 to 10'),
    inputValidationMiddleware
]
