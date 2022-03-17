import { create } from 'apisauce';
import { domain } from '../domain';

const apiClient = create({
  baseURL: domain
})

export default apiClient;