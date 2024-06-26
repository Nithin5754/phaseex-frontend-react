import { SendTaskType, ResponseTaskType } from "@/features/types/index";
import { apiSlice } from "./apiSlice";
import {
  SendDescriptionTaskType,
  SendPriorityTaskType,
  SendStatusTaskType,
} from "@/features/types/taskType";
import { SendAddCollabListType } from "./listapi";

export interface SendAddCollabTaskType {
  workspaceId: string;
  folderId: string;
  listId: string;
  taskId: string;
  collabId: string;
}

export interface TResponseCollaboratorDetailType {
  id: string;
  fullName: string;
  email: string;
  imageUrl: string;
  role: string;
}

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    onCreateTask: builder.mutation<ResponseTaskType, SendTaskType>({
      query: (credentials) => ({
        url: "/task/create-task",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["TaskSpace", "ListSpace"],
    }),
    getAllTask: builder.query<
      ResponseTaskType[],
      { workspaceId: string; folderId: string; listId: string }
    >({
      query: ({ workspaceId, folderId, listId }) => ({
        url: `/task/get-all-task?workspaceId=${workspaceId}&folderId=${folderId}&listId=${listId}`,
        validateStatus: (
          response: { status: number },
          result: { isError: any }
        ) => {
          return response.status === 200 && !result.isError;
        },
      }),
      providesTags: (result, error, { workspaceId, folderId, listId }) => [
        { type: "TaskSpace", id: `${workspaceId}-${folderId}-${listId}` },
      ],
    }),

    onUpdatePriorityTask: builder.mutation<boolean, SendPriorityTaskType>({
      query: (credentials) => ({
        url: `/task/update-priority/${credentials.taskId}`,
        method: "PATCH",
        body: { ...credentials },
      }),
      invalidatesTags: (_result, _error, { workspaceId, folderId, listId }) => [
        { type: "TaskSpace", id: `${workspaceId}-${folderId}-${listId}` },
      ],
      async onQueryStarted(
        { workspaceId, folderId, listId },
        { dispatch, queryFulfilled }
      ) {
        try {
          await queryFulfilled;
          dispatch(
            taskApiSlice.util.invalidateTags([
              { type: "TaskSpace", id: `${workspaceId}-${folderId}-${listId}` },
            ])
          );
        } catch (error) {
          console.error("Update status failed", error);
        }
      },
    }),

    onUpdateStatusTask: builder.mutation<boolean, SendStatusTaskType>({
      query: (credentials) => ({
        url: `/task/update-task/${credentials.taskId}`,
        method: "PATCH",
        body: { ...credentials },
      }),
      invalidatesTags: (_result, _error, { workspaceId, folderId, listId }) => [
        { type: "TaskSpace", id: `${workspaceId}-${folderId}-${listId}` },
        "ListSpace",
      ],

      async onQueryStarted(
        { workspaceId, folderId, listId },
        { dispatch, queryFulfilled }
      ) {
        try {
          await queryFulfilled;
          dispatch(
            taskApiSlice.util.invalidateTags([
              { type: "TaskSpace", id: `${workspaceId}-${folderId}-${listId}` },
            ])
          );
        } catch (error) {
          console.error("Update status failed", error);
        }
      },
    }),

    getSingleTask: builder.query<
      ResponseTaskType,
      { workspaceId: string; folderId: string; listId: string; taskId: string }
    >({
      query: ({ workspaceId, folderId, listId, taskId }) => ({
        url: `/task/get-single-task?workspaceId=${workspaceId}&folderId=${folderId}&listId=${listId}&taskId=${taskId}`,
        validateStatus: (
          response: { status: number },
          result: { isError: any }
        ) => {
          return response.status === 200 && !result.isError;
        },
      }),
      providesTags: (
        result,
        error,
        { workspaceId, folderId, listId, taskId }
      ) => [
        {
          type: "TaskSpace",
          id: `${workspaceId}-${folderId}-${listId}-${taskId}`,
        },
      ],
    }),

    onUpdateDescriptionTask: builder.mutation<boolean, SendDescriptionTaskType>(
      {
        query: (credentials) => ({
          url: `/task/update-task-description/${credentials.taskId}`,
          method: "PATCH",
          body: { ...credentials },
        }),
        invalidatesTags: (
          _result,
          _error,
          { workspaceId, folderId, listId, taskId }
        ) => [
          {
            type: "TaskSpace",
            id: `${workspaceId}-${folderId}-${listId}-${taskId}`,
          },
        ],
      }
    ),

    /**
     * @returns {Promise<boolean>}
     * @param {workspaceId,folderId,listId,taskId,collabId}
     * @api /add-collab-task/:taskId
     */

    addCollaboratorToTask: builder.mutation<boolean, SendAddCollabTaskType>({
      query: (credentials) => ({
        url: `/task/add-collab-task/${credentials.taskId}`,
        method: "PATCH",
        body: { ...credentials },
      }),
      invalidatesTags: (
        _result,
        _error,
        { workspaceId, folderId, listId, taskId }
      ) => [
        {
          type: "TaskSpace",
          id: `${workspaceId}-${folderId}-${listId}-${taskId}`,
        },
      ],
    }),

    /**
  * @returns {Promise<id:string;fullName: string, email:string ,imageUrl:string, role:string []>}
  * @param { workspaceId, folderId, listId,taskId}
  */

    getCollabTaskById: builder.query<
      TResponseCollaboratorDetailType[],
      { workspaceId: string; folderId: string; listId: string; taskId: string }
    >({
      query: ({ workspaceId, folderId, listId, taskId }) => ({
        url: `/task/get-all-collab-task?workspaceId=${workspaceId}&folderId=${folderId}&listId=${listId}&taskId=${taskId}`,
        validateStatus: (
          response: { status: number },
          result: { isError: any }
        ) => {
          return response.status === 200 && !result.isError;
        },
      }),

      providesTags: (
        result,
        error,
        { workspaceId, folderId, listId, taskId }
      ) => [
        {
          type: "TaskSpace",
          id: `${workspaceId}-${folderId}-${listId}-${taskId}`,
        },
      ],
    }),

    /**
  *@returns {Promise<boolean>}

  * @param { workspaceId, folderId, listId,taskId,collabId }
  */

    deleteCollaboratorToTaskAssignee: builder.mutation<boolean, SendAddCollabTaskType>({
      query: (credentials) => ({
        url: `/task/delete-collabId-task/${credentials.collabId}`,
        method: "DELETE",
        body: { ...credentials },
      }),     
      invalidatesTags: (
        _result,
        _error,
        { workspaceId, folderId, listId, taskId }
      ) => [
        {
          type: "TaskSpace",
          id: `${workspaceId}-${folderId}-${listId}-${taskId}`,
        },
      ],
  
    }),






  }),
});

export const {
  useOnCreateTaskMutation,
  useGetAllTaskQuery,
  useOnUpdatePriorityTaskMutation,
  useOnUpdateStatusTaskMutation,
  useGetSingleTaskQuery,
  useOnUpdateDescriptionTaskMutation,
  useAddCollaboratorToTaskMutation,
  useGetCollabTaskByIdQuery,
  useDeleteCollaboratorToTaskAssigneeMutation
} = taskApiSlice;
