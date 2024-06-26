

export interface ResponseTaskAttachmentType {
  file_name:string;
  attachment:string
}


export interface ResponseTaskCollaboratorType {
  assigneeId: string; 
  role: string;
}


export interface ResponseTaskType {
  id:string;
  task_title:string,
  workspaceId:string;
  folderId:string;
  listId:string;
  priority_task:string;
  status_task:string;
  task_start_date:string;
  task_description:string;
  task_activity:Array<string>;
  task_attachment:ResponseTaskAttachmentType[];
  task_collaborators:ResponseTaskCollaboratorType[];
  createdAt:string,
  updatedAt:string

}


export interface SendTaskType {
  task_title: string;
  task_description: string;
  priority_task: string;
  workspaceId:string;
  folderId:string;
  listId:string;
}



export interface SendPriorityTaskType {
  priority: string;
  workspaceId: string;
  folderId: string;
  taskId:string;
  listId: string;
}


export interface SendStatusTaskType {
  status: string;
  workspaceId: string;
  folderId: string;
  taskId:string;
  listId: string;
}



export interface ResponseTaskCountWiseType 
  {
    "to-do": number;
    "in_progress": number;
    "complete": number;
  } 




  
export interface SendDescriptionTaskType {
  task_description: string;
  workspaceId: string;
  folderId: string;
  taskId:string;
  listId: string;
}






