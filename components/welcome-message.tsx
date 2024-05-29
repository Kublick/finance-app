"use client";
import { useUser } from "@clerk/nextjs";

const WelcomeMsg = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="mb-4 space-y-2">
      <h2 className={`text-2xl font-medium text-white lg:text-4xl`}>
        Bienvenido{isLoaded ? ", " : " "}
        {user?.fullName}
      </h2>
      <p className={"pb-16 text-sm text-[#89b6fd] lg:text-base"}>
        Este es tu resumen financiero
      </p>
    </div>
  );
};

export default WelcomeMsg;
