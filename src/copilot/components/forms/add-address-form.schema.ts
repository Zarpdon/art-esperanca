import z from "zod";

const onlyLettersRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;

export const addAddressFormSchema = z.object({
  email: z.email("E-mail inválido."),

  fullName: z
    .string()
    .trim()
    .min(1, "Nome é obrigatório.")
    .regex(onlyLettersRegex, "Nome inválido."),

  cpf: z
    .string()
    .refine((v) => v.replace(/\D/g, "").length === 11, "CPF é obrigatório."),

  mobile: z
    .string()
    .refine(
      (v) =>
        v.replace(/\D/g, "").length >= 10 && v.replace(/\D/g, "").length <= 11,
      "Celular é obrigatório.",
    ),

  cep: z
    .string()
    .refine((v) => v.replace(/\D/g, "").length === 8, "Celular é obrigatório."),

  address: z.string().trim().min(1, "Endereço é obrigatório."),

  number: z.string().trim().min(1, "Número é obrigatório."),

  complement: z.string().optional(),

  neighborhood: z.string().trim().min(1, "Bairro é obrigatório."),

  city: z
    .string()
    .trim()
    .min(1, "Cidade é obrigatória.")
    .regex(onlyLettersRegex, "Cidade inválida."),

  state: z
    .string()
    .trim()
    .min(1, "Estado é obrigatório.")
    .regex(onlyLettersRegex, "Estado inválido."),
});

export type AddAddressFormValues = z.infer<typeof addAddressFormSchema>;
