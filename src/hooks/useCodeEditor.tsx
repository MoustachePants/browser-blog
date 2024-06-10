import onUpdate from "../utils/codemirror/onUpdate";
import useCodeMirror from "./useCodeMirror";
import { useEffect } from "react";
import { Extension } from "@codemirror/state";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  extensions: Extension[];
}

export function useCodeEditor({ value, onChange, extensions }: EditorProps) {
  const { ref, view } = useCodeMirror(value, [
    onUpdate(onChange),
    ...extensions,
  ]);

  useEffect(() => {
    if (view) {
      const editorValue = view.state.doc.toString();

      if (value !== editorValue) {
        view.dispatch({
          changes: {
            from: 0,
            to: editorValue.length,
            insert: value || "",
          },
        });
      }
    }
  }, [value, view]);

  return ref;
}
