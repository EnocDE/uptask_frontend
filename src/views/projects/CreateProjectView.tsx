import { createProject } from "@/api/ProjectAPI";
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormData } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateProjectView() {
  
  const navigate = useNavigate();
  const initialValues: ProjectFormData = {
      projectName: "",
      clientName: "",
      description: ""
    }
  
  const {register, handleSubmit, formState: {errors}} = useForm<ProjectFormData>({defaultValues: initialValues})

  const { mutate } = useMutation({
    mutationFn: createProject,
    onError: (error) => {toast.error(error.message)},
    onSuccess: (data) => {
      toast.success(data);
		  navigate("/");
    }
  })

  const handleForm: SubmitHandler<ProjectFormData> = async (formData) => mutate(formData)

	return (
		<>
			<div className="max-w-3xl mx-auto">
				<h1 className="text-5xl font-black ">Crear Proyecto</h1>
				<p className="text-2xl font-light text-gray-500 mt-5">
					LLena el siguiente formulario para crear un nuevo proyecto
				</p>

				<nav className="my-5">
					<Link
						className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
						to="/"
					>
						Volver a proyectos
					</Link>
				</nav>

				<form
					className="mt-10 bg-white shadow-lg p-10 rounded-lg"
					onSubmit={handleSubmit(handleForm)}
					noValidate
				>

					<ProjectForm register={register} errors={errors} />

					<input
						type="submit"
						value="Crear proyecto"
						className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-bold cursor-pointer transition-colors text-xl"
					/>
				</form>
			</div>
		</>
	);
}
