import { useDispatch, useSelector } from "react-redux";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../ui/command";
import { LucidePlusSquare, UserCircle2Icon } from "lucide-react";
import noSearchUser from "../../../public/json/empty-user-1.json";
import { LottieAnimation } from "../lootie/Lootie";
import {
  selectTaskCollabSpace,
  setSearchTaskQuery,
} from "@/app/redux/slice/taskSlice";
import {
  SendAddCollabTaskType,
  useAddCollaboratorToTaskMutation,
} from "@/app/redux/api/taskapi";
import { toast } from "../ui/use-toast";

interface Props {
  workspaceId: string;
  folderId: string;
  taskId: string;
  listId: string;
}

const SuggestionTaskCollab = ({
  workspaceId,
  folderId,
  listId,
  taskId,
}: Props) => {
  const getTaskCollabSuggestion = useSelector(selectTaskCollabSpace);

  const dispatch = useDispatch();
  const [addCollaboratorToTask] = useAddCollaboratorToTaskMutation();

  const handleSubmit = async (collabId: string) => {
    let responseData: SendAddCollabTaskType = {
      workspaceId,
      folderId,
      listId,
      taskId,
      collabId,
    };
    try {
      await addCollaboratorToTask(responseData).unwrap();
    } catch (error: any) {
      if (!error.status) {
        toast({
          title: "no response",
          variant: "destructive",
        });
      } else if (error.status) {
        toast({
          title: `${error.data.message}`,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="border dark:border-border  m-auto   rounded-md absolute w-[300px]  mt-12 z-50    ">
      <Command>
        <CommandList>
          <CommandGroup heading="suggestions " className="bg-slate-900">
            {getTaskCollabSuggestion && getTaskCollabSuggestion.length > 0 ? (
              getTaskCollabSuggestion.map((query) => (
                <CommandItem className="flex flex-row justify-between w-full">
                  <div className="flex flex-row my-auto items-center  ">
                    <UserCircle2Icon
                      size={14}
                      className="mr-4"
                      onClick={() =>
                        dispatch(setSearchTaskQuery(query.fullName))
                      }
                    />
                    <span>{query.fullName}</span>
                  </div>
                  <LucidePlusSquare
                    size={14}
                    onClick={() => handleSubmit(query.id)}
                  />
                </CommandItem>
              ))
            ) : (
              <CommandEmpty>
                <LottieAnimation
                  animationData={noSearchUser}
                  height={100}
                  width={300}
                />
              </CommandEmpty>
            )}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};
export default SuggestionTaskCollab;
