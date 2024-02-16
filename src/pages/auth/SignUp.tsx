import { registerRestaurant } from "@/api/register-restaurant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

const SignUpForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email("Digite um email válido."),
});

type SignUpFormType = z.infer<typeof SignUpForm>;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpFormType>();

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  });

  const navigate = useNavigate();

  const handleSubmitForm = async (values: SignUpFormType) => {
    try {
      registerRestaurantFn({
        restaurantName: values.restaurantName,
        managerName: values.managerName,
        email: values.email,
        phone: values.phone,
      });
      toast.success("Restaurante cadastrado com sucesso.", {
        action: {
          label: "Login",
          onClick: () => {
            navigate(`/sign-in?email=${values.email}`);
          },
        },
      });
    } catch (error) {
      toast.error("Erro ao cadastrar restaurante.");
    }
  };

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute top-8 right-8">
          <Link to="/sign-in">Fazer login</Link>
        </Button>

        <div className="w-[340px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar uma conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register("restaurantName")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                id="managerName"
                type="text"
                {...register("managerName")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <Input id="phone" type="tel" {...register("phone")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>

            <Button
              className="w-full mt-2"
              type="submit"
              disabled={isSubmitting}
            >
              Finalizar cadastro
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{" "}
              <a className="underline underline-offset-2" href="#">
                Termos de serviço
              </a>{" "}
              e{" "}
              <a className="underline underline-offset-2" href="#">
                Politicas de privacidade
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
