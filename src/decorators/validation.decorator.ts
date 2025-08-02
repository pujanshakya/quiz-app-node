import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

export const IsPasswordConfirmed = (
  property: string,
  validationOptions?: ValidationOptions
) => {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isPasswordConfirmed",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const relatedValue = (args.object as any)["confirmPassword"];
          return value === relatedValue; // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
};
