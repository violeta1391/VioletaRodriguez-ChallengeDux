import { User } from "./User";

export interface UserModalProps {
    visible: boolean;
    header: string;
    initialData?: Partial<User>;
    onHide: () => void;
    onSubmit: (user: Omit<User, 'id'>) => void;
    onDelete?: (user: User) => void;
    deleting?: boolean;
}
