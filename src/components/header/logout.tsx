"use client";

import { FiLogOut } from "react-icons/fi"; // ícone minimalista de logout
import { Button } from "@/components";
import { useUser } from "@/@core/presentation/hooks";
import { useRouter } from "next/navigation";
import { swalModal } from "@/utils";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      const { isConfirmed } = await swalModal({
        icon: "question",
        title: "Deseja realmente sair?",
        showCancelButton: true,
        confirmButtonText: "Sim",
        cancelButtonText: "Nao",
        reverseButtons: true,
      });

      if (!isConfirmed) return;

      if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          const subscription = await registration.pushManager.getSubscription();
          if (subscription) {
            await subscription.unsubscribe(); // cancela push no navegador
            console.log("Push desativado no navegador");
          }
        }
      }

      await localStorage.removeItem("token");

      swalModal({
        icon: "success",
        title: "Logout efetuado com sucesso!",
        text: "Voce sera redirecionado para a pagina de login",
      });

      router.push("/login");
    } catch (error) {}
  }

  return (
    <Button
      className="text-sm flex items-center gap-2 p-2 text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors"
      onClick={handleLogout}
    >
      <FiLogOut size={20} />
      Sair
    </Button>
  );
}
