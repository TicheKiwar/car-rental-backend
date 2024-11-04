import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export function IsEcuadorianId(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isEcuadorianId',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (typeof value !== 'string' || value.length !== 10) return false;

                    const digits = value.split('').map(Number);
                    const provinceCode = parseInt(value.slice(0, 2), 10);

                    if (provinceCode < 1 || provinceCode > 24) return false;
                    if (value === "2222222222") return false
                    const verifierDigit = digits.pop();
                    const total = digits.reduce((acc, digit, index) => {
                        if (index % 2 === 0) {
                            digit *= 2;
                            if (digit > 9) digit -= 9;
                        }
                        return acc + digit;
                    }, 0);

                    const calculatedVerifier = 10 - (total % 10 === 0 ? 10 : total % 10);
                    return verifierDigit === calculatedVerifier;
                },
                defaultMessage(args: ValidationArguments) {
                    return 'El DNI proporcionado no es una cédula ecuatoriana válida';
                },
            },
        });
    };
}