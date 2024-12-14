"use client"

import "@mdxeditor/editor/style.css";
import "./dark-editor.css";
import {
    BoldItalicUnderlineToggles,
    ChangeCodeMirrorLanguage,
    codeBlockPlugin, codeMirrorPlugin, ConditionalContents, CreateLink, diffSourcePlugin,
    headingsPlugin, imagePlugin, InsertCodeBlock, InsertImage, InsertTable, InsertThematicBreak,
    linkDialogPlugin,
    linkPlugin,
    listsPlugin, ListsToggle, markdownShortcutPlugin,
    MDXEditor,
    MDXEditorMethods, quotePlugin, Separator, tablePlugin, thematicBreakPlugin, toolbarPlugin, UndoRedo
} from "@mdxeditor/editor";
import {basicDark} from "cm6-theme-basic-dark";
import {useTheme} from "next-themes";
import type {Ref} from "react";

interface Props {
    value: string;
    editorRef: Ref<MDXEditorMethods> | null;
    fieldChange: (value: string) => void;
}

async function imageUploadHandler(image: File) {
    const formData = new FormData()
    formData.append('image', image)
    // send the file to your server and return
    // the URL of the uploaded image in the response
    const response = await fetch('/uploads/new', {
        method: 'POST',
        body: formData
    })
    const json = (await response.json()) as { url: string }
    return json.url
}

const Editor = (
    {value, editorRef, fieldChange, ...props}: Props
) => {
    const {resolvedTheme} = useTheme();

    const themeExTension = resolvedTheme === "dark" ? [basicDark] : [];

    return (
        <MDXEditor
            key={resolvedTheme}
            markdown={value}
            ref={editorRef}
            className={"markdown-editor dark-editor grid w-full border"} //background-light800_dark200 light-border-2
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
                imagePlugin({ imageUploadHandler }),
                codeBlockPlugin({defaultCodeBlockLanguage: ""}),
                diffSourcePlugin({viewMode: "rich-text", diffMarkdown: ""}),
                toolbarPlugin({
                    toolbarContents: () => (
                        <ConditionalContents
                            options={[
                                {
                                    when: (editor) => editor?.editorType === "codeblock",
                                    contents: () => <ChangeCodeMirrorLanguage/>
                                },
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
                                            <InsertImage/>
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
