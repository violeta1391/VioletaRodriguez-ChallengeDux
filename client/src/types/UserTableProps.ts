import { User } from "./User";

export interface UserTableProps {
    users: User[];
    rows: number;
    first: number;
    setRows: (value: number) => void;
    setFirst: (value: number) => void;
    onUserClick: (user: User) => void;
}
