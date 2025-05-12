import { validate as uuidValidate } from 'uuid';

export const isValidUUID = (id: string): boolean => uuidValidate(id);
