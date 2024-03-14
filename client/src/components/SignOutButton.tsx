import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ type: "SUCCESS", message: "Signed Out!" });
    },
    onError: (error: Error) => {
      showToast({ type: "ERROR", message: error.message });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <div
      onClick={handleClick}
      className="flex bg-white rounded-md items-center text-blue-400 px-3 font-bold hover:bg-gray-100"
    >
      Sign Out
    </div>
  );
};

export default SignOutButton;
