import { SetMetadata } from '@nestjs/common';

export const AllowAnonymouse = () => {
  return SetMetadata('isPublic', true);
};
