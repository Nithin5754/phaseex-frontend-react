
import { Link, useLocation } from "react-router-dom";
import { SideBarItemsType } from "../../features/types/sideBarItemsType";
import SideBarButton from "./SideBar-btb";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {  LogOut, MoreHorizontal, Settings ,X as CloseButton } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";




interface SideBarDesktopProps {
  sidebarItems:SideBarItemsType
}

const SideBarDesktop = (props:SideBarDesktopProps) => {
 const [isClose,setClose]=useState<boolean>(false)

  const location=useLocation()
  const pathname=location.pathname


  const handleClose=()=>{
    setClose(!isClose)
  
  }




  return (
   <aside  className={`${isClose ? 'w-[270px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r hidden' : 'w-[270px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r block'}`}>
         <div className='h-full px-3 py-4'>
          <div className="flex justify-between m-auto">
          <h3 className='mx-3 text-lg font-semibold text-foreground'>Phaseex</h3>
          <CloseButton/>

            </div>  
         <div className='mt-5'>
         <div className='flex flex-col gap-1 w-full'>
              {
                props.sidebarItems.links.map((link,index)=>{
                  console.log(link);
                  
                  return (
                    <Link key={index} to={link.href}>
                    <SideBarButton
                     variant={pathname===link.href?'secondary':'ghost'}
                     icon={link.icon}
                     className="w-full"
                     >
                         {link.label}
                    </SideBarButton>
                </Link>
                  )
                })
              }
               {props.sidebarItems.extras}
         </div>
         <div className='absolute left-0 bottom-3 w-full px-3'>
            <Separator className='absolute -top-3 left-0 w-full' />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant='ghost' className='w-full justify-start'>
                  <div className='flex justify-between items-center w-full'>
                    <div className='flex gap-2'>
                      <Avatar className='h-5 w-5'>
                        <AvatarImage src='https://github.com/max-programming.png' />
                        <AvatarFallback>Nithin joji</AvatarFallback>
                      </Avatar>
                      <span>Nithin joji</span>
                    </div>
                    <MoreHorizontal size={20} />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className='mb-2 w-56 p-3 rounded-[1rem]'>
                <div className='space-y-1'>
                  <Link to='/'>
                    <SideBarButton size='sm' icon={Settings} className='w-full'>
                      Account Settings
                    </SideBarButton>
                  </Link>
                  <SideBarButton size='sm' icon={LogOut} className='w-full'>
                    Log Out
                  </SideBarButton>
                </div>
              </PopoverContent>
            </Popover>
          </div>
         </div>
         </div>

    </aside>
  )
}
export default SideBarDesktop