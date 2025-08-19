"use client";

import { useUser } from "@/@core/presentation/hooks";
import { useUserContext } from "@/providers";
import { swalModal } from "@/utils";
import { useState, useEffect } from "react";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return new Uint8Array([...rawData].map((c) => c.charCodeAt(0)));
}

export default function NotificationButton() {
  const [granted, setGranted] = useState(false);
  const [quicando, setQuicando] = useState(false);
  const { user } = useUserContext();
  const { fetcher } = useUser();

  // Função para registrar assinatura
  const registerSubscription = async () => {
    if (!user?._id) return;
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;

    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          "BHLOs2Z5r8k7u7bmOKqrMfnBQuOWnEc8bI2hJW-vTGHp4aNnNibOftiHa1R62CfoIbjTaaKhlBlNxUj4K54K_-k"
        ),
      });

      if ("serviceWorker" in navigator && "PushManager" in window) {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => {
            console.log("Service Worker registrado:", reg);
          })
          .catch((err) => {
            console.error("Erro ao registrar Service Worker:", err);
          });
      }

      await fetcher.notification({
        _id: user._id,
        subscription,
      });

      console.log("✅ Notificações registradas!", subscription);
    } catch (err) {
      console.error(err);
    }
  };

  // Verifica permissão ao iniciar
  useEffect(() => {
    if (!user?._id) return;

    if (Notification.permission === "granted") {
      setGranted(true);
      registerSubscription(); // já envia pro backend se permitido
    }
  }, [user?._id]);

  // Efeito para quicar suavemente
  useEffect(() => {
    if (granted) return;

    const interval = setInterval(() => {
      setQuicando(true);
      setTimeout(() => setQuicando(false), 600);
    }, 5000);

    return () => clearInterval(interval);
  }, [granted]);

  const handleNotificationClick = async () => {
    if (!user?._id) return;

    if (Notification.permission === "granted") {
      setGranted(true);
      swalModal({
        icon: "info",
        title: "Notificações já ativadas!",
      });
      return;
    }

    const permission = await Notification.requestPermission();

    if (permission === "denied") {
      swalModal({
        icon: "error",
        title: "Permissão negada. Habilite notificações nas configurações.",
      });
      return;
    }

    if (permission === "granted") {
      setGranted(true);
      await registerSubscription();
      swalModal({
        icon: "success",
        title: "Notificações ativadas com sucesso!",
      });
    }
  };

  return (
    <button
      onClick={handleNotificationClick}
      className={`relative p-0 rounded-full hover:scale-110 transition-transform duration-500 ease-in-out ${
        quicando ? "translate-y-[-5px]" : "translate-y-0"
      }`}
      title={granted ? "Notificações Ativadas" : "Ativar Notificações"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C8.67 6.165 7 8.388 7 11v3.159c0 .538-.214 1.055-.595 1.436L5 17h5m0 0v1a3 3 0 006 0v-1m-6 0H9"
        />
      </svg>

      {!granted && (
        <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
      )}
    </button>
  );
}
