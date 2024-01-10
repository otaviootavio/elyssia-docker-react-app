import { AbsoluteCenter, Box, Divider } from "@chakra-ui/react";
import { user } from "../../types/user.d";
import { PizzaSlicesEatOne } from "./PizzaSlicesEatOne";

export const PizzaSlicesForm = ({ user }: { user: user | null }) => {
    return (<>
        <Box position="relative" padding="10">
            <Divider />
            <AbsoluteCenter bg="white" px="4">
                Add slices!
            </AbsoluteCenter>
        </Box>
        <PizzaSlicesEatOne user={user} />
        {/* <PizzaSlicesEatMany user={user} /> */}
    </>)
};
