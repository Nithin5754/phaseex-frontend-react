import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza"
import { Button } from "../ui/button"

import { LucideIcon } from "lucide-react";

import { WorkspaceForm } from "../work-space/index";







interface OpenModalProps{
  icon?:LucideIcon;
  title:string
}


  export  function OpenModal({title,icon:Icon}:OpenModalProps) {
  return (
    <Credenza  >
      <CredenzaTrigger asChild>
        <Button   className='w-full items-center gap-2 justify-center text-white'
     >{title} <span>{Icon &&<Icon size={20}/>} </span></Button>
      </CredenzaTrigger>
      <CredenzaContent  >
        <CredenzaHeader>
          <CredenzaTitle>Let's  build a Workspace</CredenzaTitle>
          <CredenzaDescription>
         We are creating a dedicated space for your project within our tool signifies the inception of a strategic journey towards achieving your objectives
          </CredenzaDescription>
        </CredenzaHeader>

        <CredenzaBody className="space-y-4 pb-4 text-center text-sm sm:pb-0 sm:text-left">
        <WorkspaceForm/>
        </CredenzaBody>
        <CredenzaFooter>
          <CredenzaClose asChild>
            <Button variant="outline">Close</Button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}