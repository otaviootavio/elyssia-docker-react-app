import React, { useState } from "react";
import usePostPizzaToUser from "../../hooks/usePostPizzaToUser";

const AddPizza = () => {
  const [pizzaSlices, setPizzaSlices] = useState<number>(0);
  const [userId, setUserId] = useState("");
  const { error, isLoading, linkUserToRoom, success } = usePostPizzaToUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    linkUserToRoom(pizzaSlices, userId);
  };

  return (
    <div>
      <h2>Add pizza to user!</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={pizzaSlices}
          onChange={(e) => setPizzaSlices(parseInt(e.target.value))}
          placeholder="Enter Room ID"
        />
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
        />
        <button type="submit" disabled={isLoading || !pizzaSlices || !userId}>
          Eat!
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {JSON.stringify(error)}</p>}
      {success && <p>Yooooo, eat that pizza!</p>}
    </div>
  );
};

export default AddPizza;
