import { Heading, List, ListItem } from '@chakra-ui/react'
import { user } from '../../types/user.d'
import UserItem from '../User/UserItem'


export const UsersInRoom = ({ users }: { users: user[] }) => {
    return (
        <>
            <Heading as="h3" size="md" mt={4}>
                Users in this Room:
            </Heading>
            <List spacing={3} mt={2}>
                {users.map((user) => (
                    <ListItem key={user.uuid}>
                        <UserItem user={user} />
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default UsersInRoom