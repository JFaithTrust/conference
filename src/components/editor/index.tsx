"use client"

import "@mdxeditor/editor/style.css";
import "./dark-editor.css";
import {
    BoldItalicUnderlineToggles,
    ConditionalContents, CreateLink, diffSourcePlugin,
    headingsPlugin, InsertTable, InsertThematicBreak,
    linkDialogPlugin,
    linkPlugin,
    listsPlugin, ListsToggle, markdownShortcutPlugin,
    MDXEditor,
    MDXEditorMethods, quotePlugin, Separator, tablePlugin, thematicBreakPlugin, toolbarPlugin, UndoRedo
} from "@mdxeditor/editor";
import {useTheme} from "next-themes";
import type {Ref} from "react";

interface Props {
    value: string;
    editorRef: Ref<MDXEditorMethods> | null;
    fieldChange: (value: string) => void;
}

const Editor = (
    {value, editorRef, fieldChange, ...props}: Props
) => {
    const {resolvedTheme} = useTheme();

    return (
        <MDXEditor
            key={resolvedTheme}
            markdown={value}
            ref={editorRef}
            className={"markdown-editor grid w-full rounded-md border"} // markdown-editor dark-editor
            onChange={fieldChange}
            plugins={[
                headingsPlugin(),
                listsPlugin(),
                linkPlugin(),
                linkDialogPlugin(),
                quotePlugin(),
                thematicBreakPlugin(),
                markdownShortcutPlugin(),
                tablePlugin(),
                diffSourcePlugin({viewMode: "rich-text", diffMarkdown: ""}),
                toolbarPlugin({
                    toolbarContents: () => (
                        <ConditionalContents
                            options={[
                                {
                                    fallback: () => (
                                        <>
                                            <UndoRedo/>
                                            <Separator/>

                                            <BoldItalicUnderlineToggles/>
                                            <Separator/>

                                            <ListsToggle/>
                                            <Separator/>

                                            <CreateLink/>
                                            <Separator/>

                                            <InsertTable/>
                                            <InsertThematicBreak/>
                                        </>
                                    )
                                }
                            ]}
                        />
                    )
                })
            ]}
            {...props}
        />
    )
}
export default Editor
