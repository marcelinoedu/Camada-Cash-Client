import PrivateLayout from "@/components/layouts/PrivateLayout";

export default function Home() {
  return (
    <div>
      Welcome to Camada Cash
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <PrivateLayout>{page}</PrivateLayout>;
};
