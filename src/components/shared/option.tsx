import {motion} from "framer-motion";
import {IconType} from "react-icons";
import {usePathname, useRouter} from "next/navigation";

interface OptionProps {
    Icon: IconType,
    title: string,
    pathName: string,
    open: boolean,
    setIsArticlesOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    setIsConferencesOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

export const Option = ({
                           Icon,
                           title,
                           pathName,
                           open,
                           setIsArticlesOpen,
                           setIsConferencesOpen
                       }: OptionProps) => {

    const pathname = usePathname();
    const router = useRouter();

    return (
        <motion.button
            onClick={() => {
                router.push(pathName);
                if (title === "Articles") {
                    setIsArticlesOpen((prev) => !prev);
                } else if (title === "Conferences") {
                    setIsConferencesOpen((prev) => !prev);
                }
            }}
            layout
            className={`relative flex h-10 w-full items-center rounded-md transition-colors ${pathname === pathName ? "bg-indigo-100 text-indigo-800" : "text-slate-500 hover:bg-slate-100"}`}
        >
            <motion.div
                layout
                className="grid h-full w-10 place-content-center text-lg"
            >
                <Icon/>
            </motion.div>
            {open && (
                <motion.span
                    layout
                    initial={{opacity: 0, y: 12}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.125}}
                    className="text-xs font-medium"
                >
                    {title}
                </motion.span>
            )}
        </motion.button>
    );
};
