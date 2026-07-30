"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateAddress } from "@/copilot/hooks/use-create-address";

import {
  addAddressFormSchema,
  type AddAddressFormValues,
} from "./add-address-form.schema";

const AddAddressForm = () => {
  const mutation = useCreateAddress();
  const form = useForm<AddAddressFormValues>({
    resolver: zodResolver(addAddressFormSchema),
    defaultValues: {
      email: "",
      fullName: "",
      cpf: "",
      mobile: "",
      cep: "",
      address: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
    },
  });

  const onSubmit = (values: AddAddressFormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        toast.success(
          <div>
            <span className="text-sm font-semibold text-sky-700">
              Endereço adicionado com sucesso
            </span>
          </div>,
        );
        form.reset({
          email: "",
          fullName: "",
          cpf: "",
          mobile: "",
          cep: "",
          address: "",
          number: "",
          complement: "",
          neighborhood: "",
          city: "",
          state: "",
        });
      },
      onError: () => {
        toast.error(
          <div>
            <span className="text-sm font-semibold text-red-700">
              Erro ao adicionar o endereço
            </span>
          </div>,
        );
      },
    });
  };

  return (
    <Card className="mt-4 mb-4 shadow-none ring-0">
      <CardHeader>
        <CardTitle className="text-base">Novo endereço</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardContent className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <PatternFormat
                      value={field.value ?? ""}
                      onValueChange={(values) =>
                        field.onChange(values.formattedValue)
                      }
                      onBlur={field.onBlur}
                      name={field.name}
                      format="###.###.###-##"
                      customInput={Input}
                      placeholder="Somente números"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <PatternFormat
                      value={field.value ?? ""}
                      onValueChange={(values) =>
                        field.onChange(values.formattedValue)
                      }
                      onBlur={field.onBlur}
                      name={field.name}
                      format="(##) ##### - ####"
                      customInput={Input}
                      placeholder="(11) 98765 - 4321 "
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cep"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <PatternFormat
                      value={field.value ?? ""}
                      onValueChange={(values) =>
                        field.onChange(values.formattedValue)
                      }
                      onBlur={field.onBlur}
                      name={field.name}
                      format="#####-###"
                      customInput={Input}
                      placeholder="00000-000"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu endereço" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o número" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="complement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complemento</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o complemento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o bairro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite a cidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado UF</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o estado" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <div className="w-full">
              <Button
                className="w-full p-4"
                type="submit"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Salvando..." : "Salvar endereço"}
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default AddAddressForm;
