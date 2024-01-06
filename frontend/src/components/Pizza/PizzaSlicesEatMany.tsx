import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { user } from '../../types/user.d'
import usePostPizzaToUser from '../../hooks/usePostPizzaToUser';

const PizzaSlicesEatMany = ({ user }: { user: user | null }) => {
    const { addSliceToUser, isLoading } = usePostPizzaToUser();
    const [pizzaSlices, setPizzaSlices] = useState<number | null>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!pizzaSlices) {
            throw new Error("Pizza slices is null, zero or undefined!")
        }

        if (!user) {
            throw new Error("User cannot be null!")
        }
        const currentPizzaSlices = user.slicesEaten;
        addSliceToUser(pizzaSlices + currentPizzaSlices, user.uuid);
    }

    return (<>
        <FormControl>
            <FormLabel>Number of new slices!</FormLabel>
            <Input
                type="number"
                value={pizzaSlices || 0}
                onChange={(e) => setPizzaSlices(parseInt(e.target.value))}
                placeholder="Amount of slices"
            />
        </FormControl>
        <Button onClick={handleSubmit} isLoading={isLoading}>
            Eat!
        </Button>
    </>
    )
}

export default PizzaSlicesEatMany