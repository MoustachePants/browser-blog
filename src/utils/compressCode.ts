const compressedCode = (code: string) =>
  code.replace(/(\r\n|\n|\r|\s\s+)/gm, "");

export default compressedCode;
