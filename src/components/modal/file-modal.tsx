



  

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"


import { EclipseIcon, Ellipsis, File, PinIcon} from "lucide-react"
import { useState } from "react";
import { AttachMentDetails} from "../attachment/index";
import { Attachment } from "@/features/types/attachment";

interface Props {
 attachment:Attachment
}

export function ViewMoreAttachmentModal({attachment}:Props) {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
     
      <button >
        <Ellipsis  size={16} /> 
      </button>
      </DialogTrigger>
      <DialogContent className=" dark:border-border">

        <AttachMentDetails attachment={attachment}/>
        <DialogFooter>
        <DialogTrigger asChild>
        <Button type="submit" onClick={handleClose}>close</Button>
      </DialogTrigger>
   
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}