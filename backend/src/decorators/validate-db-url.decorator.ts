import { registerDecorator, ValidationOptions } from 'class-validator';

const SUPPORTED_PROTOCOLS = ['postgres:', 'postgresql:'];

// eslint-disable-next-line @typescript-eslint/naming-convention
export function IsDatabaseUrl(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isDatabaseUrl',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          try {
            const url = new URL(value);

            const hasAllParts =
              url.username &&
              url.password &&
              url.hostname &&
              url.pathname &&
              url.pathname !== '/';

            return !!(
              SUPPORTED_PROTOCOLS.includes(url.protocol) && hasAllParts
            );
          } catch {
            return false;
          }
        },
        defaultMessage() {
          return `It must be a valid URL for connecting to a supported database (${SUPPORTED_PROTOCOLS.join(', ').replace(':', '')})`;
        },
      },
    });
  };
}
