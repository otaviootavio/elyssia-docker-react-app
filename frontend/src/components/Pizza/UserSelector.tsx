import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { user } from "../../types/user.d";
import { ChangeEvent } from "react";

export const UserSelector = ({ user, users, setUser }: {
    user: user | null, users: user[], setUser: React.Dispatch<React.SetStateAction<user | null>>
}) => {
    const handleOnChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        const currentUser = users.find(user => { return user.uuid == e.target.value })
        if (!currentUser) {
            throw new Error("User was not found on select!")
            return;
        }
        setUser(currentUser)
    }

    return (
        <FormControl>
            <FormLabel>Select user!</FormLabel>
            <Select
                value={user?.uuid || ""}
                onChange={(e) => handleOnChange(e)}
                placeholder="Name"
            >
                {users.map((user) => (
                    <option key={user.uuid} value={user.uuid}>
                        {user.name}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
}