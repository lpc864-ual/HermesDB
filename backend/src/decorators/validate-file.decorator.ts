import { registerDecorator, ValidationOptions } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function IsFileExtensionAndSize(
  allowedExtensions: string[],
  maxSizeKb: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isFileExtensionAndSize',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        // @ts-ignore
        validate(file: Express.Multer.File) {
          if (!file) return false;
          const extension = file.originalname.split('.').pop()?.toLowerCase();
          const isValidExtension = allowedExtensions.includes(`.${extension}`);
          const isValidSize = file.size <= maxSizeKb * 1024;

          return isValidExtension && isValidSize;
        },
        defaultMessage() {
          return `The file must have one of the allowed extensions (${allowedExtensions.join(', ')}) and not exceed ${maxSizeKb} KB.`;
        },
      },
    });
  };
}
