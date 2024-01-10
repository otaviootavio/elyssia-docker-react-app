import { Button, ButtonGroup, Center, Spinner } from "@chakra-ui/react";
import usePostPizzaToUser from "../../hooks/usePostPizzaToUser";
import { user } from "../../types/user.d";

export const PizzaSlicesEatOne = ({ user }: { user: user | null }) => {
    const { addSliceToUser, isLoading } = usePostPizzaToUser();

    const changeAmountSlices = (amount: number) => {
        if (!user) {
            throw new Error("User cannot be null!");
        }
        const currentPizzaSlices = user.slicesEaten;
        addSliceToUser(amount + currentPizzaSlices, user.uuid);
    };

    if (isLoading) {
        return (
            <Center>
                <Spinner size={"lg"} />
            </Center>
        );
    }
    return (
        <Center>
            <ButtonGroup>
                <Button onClick={() => { changeAmountSlices(1) }} width={"100px"}>+1</Button>
                <Button onClick={() => { changeAmountSlices(-1) }} width={"100px"}>-1</Button>
            </ButtonGroup>
        </Center>
    );
};
