const { body, validationResult } = require('express-validator');

exports.validateAlumno = [
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('surname').notEmpty().withMessage('El apellido es obligatorio'),
    body('age').isInt({ min: 0 }).withMessage('La edad debe ser un número entero positivo'),
];
