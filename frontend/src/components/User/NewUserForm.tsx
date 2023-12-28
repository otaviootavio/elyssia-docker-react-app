import React, { useState } from "react";
import usePostNewUser from "../../hooks/usePostNewUser";

const NewUserForm = () => {
  const [name, setName] = useState("");
  const { user, isLoading, error, postUser } = usePostNewUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postUser(name);
  };

  return (
    <div>
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
        <button type="submit" disabled={isLoading || !name}>
          Submit
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {user && (
        <p>
          User Created: {user.name} {user.uuid}
        </p>
      )}
    </div>
  );
};

export default NewUserForm;
