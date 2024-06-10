// use-code-mirror.ts
import { useEffect, useRef, useState } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState, Extension } from "@codemirror/state";

const useCodeMirror = (defaultCode: string, extensions: Extension[]) => {
  const ref = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<EditorView>();

  useEffect(() => {
    let startState = EditorState.create({
      doc: defaultCode,
      extensions: [basicSetup, ...extensions],
    });

    let view = new EditorView({
      state: startState,
      parent: ref.current!,
    });

    setView(view);

    return () => {
      view.destroy();
      setView(undefined);
    };
  }, []);

  return { ref, view };
};

export default useCodeMirror;
