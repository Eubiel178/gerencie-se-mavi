export function taskTagValidator(value?: string | null) {
  return taskTags.some(
    (tag) => tag?.value?.toLowerCase() === value?.toLowerCase()
  );
}

export const taskTags = [
  { label: "Estudo", value: "estudo" },
  { label: "Trabalho", value: "trabalho" },
  { label: "Exercício", value: "exercício" },
  { label: "Outros", value: "outros" },
];
