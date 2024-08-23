import CreateCarForm from "@/components/CreateCarForm";

const CarCreationPage: React.FC = () => {
  return (
    <div className="registration-page">
      <h1 className="mb-8 text-2xl font-bold">Create New Car</h1>
      <CreateCarForm />
    </div>
  );
};
export default CarCreationPage;
