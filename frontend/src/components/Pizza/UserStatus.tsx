import { AbsoluteCenter, Box, Divider } from "@chakra-ui/react";
import UserItem from "../User/UserItem";
import useGetUserById from "../../hooks/useGetUserById";
import { useLastUpdateTimeContext } from "../../providers/useLastUpdateTimeContext";
import { useEffect } from "react";
import { PizzaSlicesForm } from "./PizzaSlicesForm";

export const UserStatus = ({ userUuid }: { userUuid: string }) => {
    const { lastUpdateTime } = useLastUpdateTimeContext();
    const { user, getUser } = useGetUserById()

    useEffect(() => {
        getUser(userUuid);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastUpdateTime]);

    return (
        <>
            <Box position="relative" padding="10">
                <Divider />
                <AbsoluteCenter bg="white" px="4">
                    User status!
                </AbsoluteCenter>
            </Box>
            <UserItem user={user} />
            <PizzaSlicesForm user={user} />
        </>
    );
}