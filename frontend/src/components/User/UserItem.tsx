import { useEffect } from "react";
import useGetUserById from "../../hooks/useGetUserById";

type Props = {
  userId: string;
};

const UserItem = (props: Props) => {
  const { user, isLoading, error, getUser } = useGetUserById();

  useEffect(() => {
    getUser(props.userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userId]);

  if (isLoading) {
    return <p>Loading rooms...</p>;
  }

  if (error) {
    return <p>Error loading rooms: {error.message}</p>;
  }

  return (
    <>
      <p>uuid: {user?.uuid}</p>
      <p>name: {user?.name}</p>
      <p>slicesEaten: {user?.slicesEaten}</p>
    </>
  );
};

export default UserItem;
