import { fetchAllUsers } from '@/services/userService';
import { UsersList } from './UsersList';

export async function UsersListWrapper() {
  const users = await fetchAllUsers();
  return <UsersList initialUsers={users} />;
}
