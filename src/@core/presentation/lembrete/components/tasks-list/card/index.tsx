import { useState } from "react";
import { useReminder } from "@/@core/presentation/hooks/";
import { dateFormatedToFront, swalModal } from "@/utils";
import { useUserContext } from "@/providers";
import { IReminder } from "@/@core/domain";

export function Card({ reminder }: { reminder: IReminder }) {
  const { fetcher } = useReminder();
  const { mutate } = useUserContext();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const MAX_LENGTH = 100;

  const descriptionToShow =
    !showFullDescription && reminder?.description.length > MAX_LENGTH
      ? reminder?.description.slice(0, MAX_LENGTH) + "..."
      : reminder?.description;

  function formatarDataISOParaBR(isoString?: string) {
    if (!isoString) return "";
    const data = new Date(isoString);
    const dia = String(data.getUTCDate()).padStart(2, "0");
    const mes = String(data.getUTCMonth() + 1).padStart(2, "0");
    const ano = data.getUTCFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  const remindAt = formatarDataISOParaBR(reminder?.remindAt);

  // Verifica se o lembrete expirou (comparando apenas datas)
  function isDataPassada(remindAt?: string, notificado?: boolean) {
    if (!remindAt) return false;
    const hoje = formatarDataISOParaBR(new Date().toISOString());
    const lembrete = formatarDataISOParaBR(remindAt);
    console.log(hoje, "hj");
    console.log(lembrete, "lembrete");

    return lembrete < hoje && !notificado;
  }

  const passouData = isDataPassada(reminder?.remindAt, reminder?.notificado);

  async function handleRemindRemove() {
    try {
      const { isConfirmed } = await swalModal({
        title: "Tem certeza?",
        text: `Você realmente deseja excluir o lembrete: ${reminder?.title}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, excluir!",
        cancelButtonText: "Não, cancelar!",
      });

      if (isConfirmed) {
        await fetcher.delete({ _id: reminder?._id });
        await mutate();
        await swalModal({
          icon: "success",
          title: "Lembrete excluído com sucesso!",
        });
      }
    } catch (error) {
      swalModal({
        icon: "error",
        title: "Erro ao excluir lembrete!",
      });
    }
  }

  return (
    <li>
      <div
        className={`relative p-4 rounded-lg shadow mb-3 flex flex-col h-full ${
          reminder.notificado
            ? "bg-green-100 border border-green-300"
            : passouData
              ? "bg-red-100 border border-red-300"
              : "bg-yellow-100 border border-yellow-300"
        }`}
      >
        {/* Botão X */}
        <button
          onClick={async () => await handleRemindRemove()}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 transition-colors"
        >
          ✕
        </button>
        {/* Título */}
        <h3 className="font-semibold text-lg mb-1">{reminder.title}</h3>
        {/* Descrição */}
        <p
          className={`text-sm ${
            reminder.notificado
              ? "text-green-700"
              : passouData
                ? "text-red-700"
                : "text-yellow-700"
          }`}
        >
          {descriptionToShow}
          {reminder.description.length > MAX_LENGTH && (
            <button
              className={`ml-1 underline ${
                reminder.notificado
                  ? "text-green-600"
                  : passouData
                    ? "text-red-600"
                    : "text-yellow-600"
              }`}
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? "mostrar menos" : "ler mais"}
            </button>
          )}
        </p>
        {/* Datas */}
        <div className="mt-3 text-xs text-gray-600 space-y-1">
          <p>
            📅 <span className="font-medium">Criado em:</span>{" "}
            {dateFormatedToFront(reminder?.createdAt, true)}
          </p>
          <p>
            ⏰{" "}
            <span className="font-medium">Data programada para lembrar:</span>{" "}
            {remindAt}
          </p>
          {reminder.notificado && reminder?.remindedAt && (
            <p>
              ✅ <span className="font-medium">Notificado em:</span>{" "}
              {dateFormatedToFront(reminder?.remindedAt, true)}
            </p>
          )}
          {passouData && !reminder.notificado && (
            <p className="text-red-700 font-medium">
              ⚠️ Lembrete expirado! Data passou.
            </p>
          )}
        </div>
        {/* Status */}
        <small
          className={`block mt-auto font-medium ${
            reminder.notificado
              ? "text-green-800"
              : passouData
                ? "text-red-800"
                : "text-yellow-800"
          }`}
        >
          {reminder.notificado
            ? "✅ Já foi notificado"
            : passouData
              ? "❌ Não foi lembrado! Data passou"
              : "⏳ Aguardando notificação"}
        </small>
      </div>
    </li>
  );
}
