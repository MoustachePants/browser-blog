import "./Note.css";
import { ReactNode } from "react";

type NoteProps = {
  children: ReactNode;
};

const Note = ({ children }: NoteProps) => {
  return <div className="note-container">{children}</div>;
};

export default Note;
