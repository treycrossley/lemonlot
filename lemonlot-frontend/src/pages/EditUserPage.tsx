import { useParams } from "react-router-dom";
import EditUserForm from "@/components/EditUserForm";

const EditUserPage: React.FC = () => {
  // Use the `useParams` hook to get the `userId` from the URL
  const { userId } = useParams<{ userId: string }>();

  // Ensure `userId` is present and is a valid number
  const userIdNumber = userId ? parseInt(userId, 10) : null;

  return (
    <div className="edit-user-page">
      <h1 className="mb-8 text-2xl font-bold">Edit User</h1>
      <p className="mb-4 text-lg text-gray-600">
        Change any fields you want and enter your password. Any blank fields
        will be kept the same.
      </p>
      {/* Pass the `userId` to the `EditUserForm` component */}
      <EditUserForm user_id={userIdNumber ? userId : undefined} />
    </div>
  );
};

export default EditUserPage;
