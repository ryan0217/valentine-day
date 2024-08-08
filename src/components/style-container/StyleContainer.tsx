import React, { useEffect } from "react";
import Prism from "prismjs";
import "./index.css";

const StyleContainer: React.FC<{ code: string }> = ({ code }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const highlightCode = Prism.highlight(code, Prism.languages.css, "css");

  useEffect(() => {
    if (code.slice(-1) === "\n") {
      setTimeout(() => {
        ref.current?.scrollTo(0, 999999);
      }, 100);
    }
  }, [code]);

  return (
    <div ref={ref} className="style-container">
      <style dangerouslySetInnerHTML={{ __html: code }}></style>
      <pre dangerouslySetInnerHTML={{ __html: highlightCode }}></pre>
    </div>
  );
};

export default StyleContainer;
