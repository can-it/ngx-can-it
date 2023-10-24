import { Permission } from './permission';

export default interface PermissionsState {
  allow: Permission[];
  deny?: Permission[];
}
