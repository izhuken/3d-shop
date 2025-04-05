import { WrongResponse } from '@/entities';
import { AxiosResponse } from 'axios';

export function isWrongResponse(
  obj: AxiosResponse | WrongResponse,
): obj is WrongResponse {
  return 'code' in obj;
}
