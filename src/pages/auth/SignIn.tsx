import { signIn } from "@/api/sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

const signInForm = z.object({
  email: z.string().email("Digite um email válido."),
});

type SignInFormType = z.infer<typeof signInForm>;

const SignIn = () => {
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInFormType>({
    defaultValues: {
      email: searchParams.get("email") || "",
    },
  });

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  });

  const handleSubmitForm = async (values: SignInFormType) => {
    try {
      await authenticate({ email: values.email });

      toast.success("Enviamos um link de autenticação para o seu e-mail.");
    } catch (error) {
      toast.error("Credenciais Inválidas.");
    }
  };

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute top-8 right-8">
          <Link to="/sign-up">Novo estabelecimento</Link>
        </Button>

        <div className="w-[340px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhar suas vendas pelo painel do parceiro
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Acessar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
