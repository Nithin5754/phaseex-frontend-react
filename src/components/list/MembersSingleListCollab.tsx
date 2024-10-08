import {
  ListCollaboratorDetailType,
  SendAddCollabListType,
  useUpdateCollaboratorToListRoleMutation,
} from "@/app/redux/api/listapi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DeleteCollabListAssignee, UpdateRoleMemberCollab } from "./index";
import {  useEffect, useState } from "react";

import { toast } from "../ui/use-toast";
import UseSpaceRoles from "@/hooks/useSpaceRoles";

interface Props {
  collabList: ListCollaboratorDetailType;
  checkingDetails: SendAddCollabListType;
}

const MembersSingleListCollab = ({ collabList, checkingDetails }: Props) => {


  const isSpaceOwner=UseSpaceRoles({workspaceId:checkingDetails.workspaceId})

  const [isRole, setIsRole] = useState<"listManager" | "spaceOwner" | "viewer">(
    collabList.role
  );

  const [updateCollaboratorToListRole] =
    useUpdateCollaboratorToListRoleMutation();

  useEffect(() => {
    let sendResponseData: SendAddCollabListType & {
      role: "listManager" | "spaceOwner" | "viewer";
    } = {
      workspaceId: checkingDetails.workspaceId,
      folderId: checkingDetails.folderId,
      listId: checkingDetails.listId,
      collabId: checkingDetails.collabId,
      role: isRole,
    };

    const fetch = async () => {
      
      try {
  await updateCollaboratorToListRole(sendResponseData).unwrap();
  
} catch (error:any) {
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

    fetch();
  }, [isRole]);

  return (
    <li className="pb-3 sm:pb-4 w-full">
      <div className="flex justify-between items-center space-x-4 rtl:space-x-reverse">
        <div className="flex-shrink-0">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="w-14 h-14"
            />
            <AvatarFallback>{collabList.fullName.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-row justify-between items-center w-full min-w-0">
          <div className="flex flex-col">
            <p className="text-sm font-thin text-gray-900 truncate dark:text-white">
              {collabList.fullName}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {collabList.email}
            </p>
          </div>
          <>
          {
            isSpaceOwner&&(
              <div className="flex items-center gap-2">

              <UpdateRoleMemberCollab role={isRole} setIsRole={setIsRole} />
              <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <DeleteCollabListAssignee checkingDetails={checkingDetails} />
              </button>
            </div>
            )
          }
          
          
          </>
     
        </div>
      </div>
    </li>
  );
};
export default MembersSingleListCollab;
