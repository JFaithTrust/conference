// import React from 'react'

// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//     AlertDialogTrigger,
//   } from "@/components/ui/alert-dialog"
  
//   export default function ConfirmAlert() {
//     return (
//         <AlertDialog>
//         <AlertDialogTrigger>Open</AlertDialogTrigger>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//             <AlertDialogDescription>
//           {` This action cannot be undone. This will permanently make ${inactive} your account
//               and remove your data from our servers.`}
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction>Continue</AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
      
//     )
//   }
  



import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button';

interface ConfirmAlertProps {
    actionLabel: string;
    description: string;
    onConfirm: () => void;
    triggerLabel: string;
    isPending?: boolean;
}

export default function ConfirmAlert({
    actionLabel,
    description,
    onConfirm,
    triggerLabel,
    isPending = false,
}: ConfirmAlertProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger  disabled={isPending}>
               
                    {triggerLabel}
              
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>{actionLabel}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
