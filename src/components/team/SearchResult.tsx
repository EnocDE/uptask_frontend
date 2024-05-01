import { addUserToProject } from "@/api/TeamAPI";
import { TeamMember } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type SearchResultProps = {
	user: TeamMember;
};

export default function SearchResult({ user }: SearchResultProps) {
	const { projectId } = useParams();
  const navigate = useNavigate()
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: addUserToProject,
		onError: (error) => toast.error(error.message),
		onSuccess: (data) => {
			toast.success(data);
      navigate('', {replace: true})
			queryClient.invalidateQueries({ queryKey: ["projectTeam", projectId] });
		},
	});

	function handleAddUserToProject() {
		const data = {
			id: user._id,
			projectId: projectId!,
		};
		mutate(data);
	}

	return (
		<>
			<p className="mt-10 text-center font-bold">Resultado:</p>
			<div className="flex justify-between items-center">
				<p>{user.name}</p>
				<button
					onClick={handleAddUserToProject}
					className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer transition-colors"
				>
					Agregar al proyecto
				</button>
			</div>
		</>
	);
}
