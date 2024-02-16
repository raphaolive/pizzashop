import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  GetManagedRestaurantResponse,
  getManagedRestaurant,
} from "@/api/get-managed-restaurant";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "@/api/update-profile";
import { toast } from "sonner";

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
});

type StoreProfileDialogSchema = z.infer<typeof storeProfileSchema>;

export const StoreProfileDialog = () => {
  const queryClient = useQueryClient();

  const { data: managedRestaurant } = useQuery({
    queryKey: ["managed-restaurant"],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileDialogSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? "",
      description: managedRestaurant?.description ?? "",
    },
  });

  function updateManagedRestaurantCache({
    name,
    description,
  }: StoreProfileDialogSchema) {
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      "managed-restaurant",
    ]);

    if (cached) {
      queryClient.setQueryData<GetManagedRestaurantResponse>(
        ["managed-restaurant"],
        {
          ...cached,
          name,
          description,
        },
      );
    }

    return { cached };
  }

  const { mutateAsync: upDateProfileFn } = useMutation({
    mutationFn: updateProfile,

    onMutate({ name, description }) {
      const { cached } = updateManagedRestaurantCache({ name, description });

      return { previousProfileCache: cached };
    },

    onError(_, __, context) {
      if (context?.previousProfileCache) {
        updateManagedRestaurantCache(context.previousProfileCache);
      }
    },
  });

  async function handleUpdateProfile(values: StoreProfileDialogSchema) {
    try {
      await upDateProfileFn({
        name: values.name,
        description: values.description,
      });

      toast.success("Pefil atualizado com sucesso!");
    } catch {
      toast.error("Falha ao atualizar o perfil.");
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualiza as informações do seu estabelecimento.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input
              className="col-span-3"
              id="description"
              {...register("name")}
            />
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-3"
              id="name"
              {...register("description")}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button variant="success" type="submit" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
