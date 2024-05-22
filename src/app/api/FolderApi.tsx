import { apiSlice } from "./apiSlice";

export interface ResponseFolderDataType {
  id: string;
  folder_title: string;
  folder_description: string;
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
}

export interface FolderDataType {
  folder_title: string;
  folder_description: string;
  workspaceId: string;
}

export const folderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    onCreateFolder: builder.mutation<ResponseFolderDataType, FolderDataType>({
      query: (credentials) => ({
        url: "/folder/space-folder",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["FolderSpace"],
    }),
    getAllFolder: builder.query<ResponseFolderDataType[], string>({
      query: (workspaceId: string) => ({
        url: `/folder/get-folder/${workspaceId}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),

      providesTags: ["FolderSpace"],
    }),
  }),
});


export const { useOnCreateFolderMutation ,useGetAllFolderQuery} = folderApiSlice;
