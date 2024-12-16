import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { IconType } from "react-icons";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface OptionProps {
  Icon: IconType;
  title: string;
  pathName: string;
  open: boolean;
  isArticlesOpen: boolean;
  isConferencesOpen: boolean;
  setIsArticlesOpen: (
    value: ((prevState: boolean) => boolean) | boolean
  ) => void;
  setIsConferencesOpen: (
    value: ((prevState: boolean) => boolean) | boolean
  ) => void;
}

export const Option = ({
  Icon,
  title,
  pathName,
  open,
  isArticlesOpen,
  isConferencesOpen,
  setIsArticlesOpen,
  setIsConferencesOpen,

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
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
        pathname === pathName
          ? "bg-indigo-100 text-indigo-800"
          : "text-slate-500 hover:bg-slate-100"
      }
      ${pathname.startsWith('/dashboard/conferences') && title === "Conferences" && "bg-indigo-100 text-indigo-800"}
      ${pathname.startsWith('/dashboard/articles') && title === "Articles" && "bg-indigo-100 text-indigo-800"}
      `}
    >
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="font-medium"
        >
          {title}
        </motion.span>
      )}
      {title === "Conferences" && open && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          style={{ y: "-50%" }}
          transition={{ delay: 0.5 }}
          className="absolute right-2 top-1/2 flex size-4 items-center justify-center rounded bg-indigo-500 text-xs text-white"
        >
          {isConferencesOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </motion.span>
      )}
      {title === "Articles" && open && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          style={{ y: "-50%" }}
          transition={{ delay: 0.5 }}
          className="absolute right-2 top-1/2 flex size-4 items-center justify-center rounded bg-indigo-500 text-xs text-white"
        >
          {isArticlesOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </motion.span>
      )}
    </motion.button>
  );
};
