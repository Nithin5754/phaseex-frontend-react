import { useGetSingleFolderQuery } from "@/app/redux/api/FolderApi";

import { OpenModal } from "../modal/folderEdit-modal";
import { OpenModal as CreateListModal } from "../modal/list-create-modal";

import { EllipsisIcon, Plus } from "lucide-react";

import UseSpaceRoles from "@/hooks/useSpaceRoles";
interface Props {
  id: string;
  folderId: string;
}

const FolderDetails = ({ id, folderId }: Props) => {
  const isSpaceOwner = UseSpaceRoles({ workspaceId: id });
  const { data: singleFolder, isLoading } = useGetSingleFolderQuery(
    { spaceId: id, folderId },
    {
      pollingInterval: 120000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );
  const truncateDesc = (desc: string) => {
    return desc.length > 10 ? desc.substring(0, 10) + "..." : desc;
  };

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  return (
    <div className="flex flex-row w-full  gap-2  items-center justify-around ">
      <div className="flex flex-1 bg-white border border-gray-200 rounded-lg h-36 p-4 dark:bg-background  dark:text-primary dark:border-border">
        {singleFolder && (
          <div className="flex flex-row ">
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-row justify-between">
                <h1 className="font-sfpro text-lg mb-2">
                  Folder {singleFolder.folder_title}
                </h1>
                <div className="my-auto items-center">
                  {isSpaceOwner && (
                    <OpenModal title={""} icon={EllipsisIcon} spaceId={id} />
                  )}
                </div>
              </div>

              <p className="text-gray-600 text-sm font-sfpro mb-4 dark:text-primary">
                Description: {truncateDesc(singleFolder.folder_description)}
              </p>
              <h1 className="text-slate-600 text-sm font-sfpro dark:text-foreground ">
                Created at {singleFolder.createdAt}
              </h1>
            </div>
          </div>
        )}
      </div>

      <>
        {isSpaceOwner && (
          <>
            <div className="flex items-center w-[350px] justify-center bg-white border border-gray-200 rounded-lg h-36 dark:bg-background  dark:text-primary dark:border-border">
              <div className="text-center">
                <CreateListModal
                  title={"create list"}
                  icon={Plus}
                  spaceId={id}
                  folderId={folderId}
                />
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );
};
export default FolderDetails;
