import {motion} from "framer-motion";
import React from "react";
import {FiLogOut} from "react-icons/fi";

export default function InfoSection(props: {
    dashboard: boolean,
    fullName: string | undefined,
    phoneNumber: string | undefined,
    open: boolean | undefined,
    onClick: () => Promise<void>
}) {
    return <div className={`${props.dashboard ? "mb-3 border-b border-slate-300 pb-3" : "mb-0 border-none pb-0"}`}>
        <div className={
            `flex cursor-pointer items-center justify-between rounded-md transition-colors`
        }>
            <div className={`flex items-center gap-2 ${props.dashboard ? "flex-row" : "flex-row-reverse"}`}>
                <motion.div
                    layout
                    className="grid size-10 shrink-0 place-content-center rounded-md bg-indigo-600"
                >
                    <svg
                        width="24"
                        height="32"
                        viewBox="0 0 50 39"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-slate-50"
                    >
                        <path
                            d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
                            stopColor="#000000"
                        ></path>
                        <path
                            d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
                            stopColor="#000000"
                        ></path>
                    </svg>
                </motion.div>
                {!props.dashboard && (
                    <motion.div
                        layout
                        initial={{opacity: 0, y: 12}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.125}}
                        className={"text-end"}
                    >
                        <span className="block font-semibold">{props.fullName}</span>
                        <span className="block text-sm text-slate-500">{props.phoneNumber}</span>
                    </motion.div>
                )}
                {props.open && (
                    <motion.div
                        layout
                        initial={{opacity: 0, y: 12}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.125}}
                    >
                        <span className="block text-xs font-semibold">{props.fullName}</span>
                        <span className="block text-xs text-slate-500">{props.phoneNumber}</span>
                    </motion.div>
                )}
            </div>
            {props.open && props.dashboard &&
                <motion.div
                    initial={{scale: 0, opacity: 0}}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    transition={{delay: 0.5}}
                >
                    <FiLogOut className="mr-2 text-xl text-red-600" onClick={props.onClick}/>
                </motion.div>
            }
        </div>
    </div>;
}