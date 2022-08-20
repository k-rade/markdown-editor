import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  markdown: string;
}

const MarkdownOutput = ({ markdown }: Props): JSX.Element => {
  return (
    <div className="w-full max-w-5xl m-auto mt-8 px-8 h-[calc(100vh-10rem)] sm:h-[calc(100vh-6rem)]">
      <div className="overflow-y-auto shadow-lg bg-white h-full p-8 rounded-md dark:bg-zinc-800 dark:border-zinc-700">
        <ReactMarkdown
          className="markdown-output-result"
          children={markdown}
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  style={atomDark}
                  language={match[1]}
                  PreTag="div"
                  spread={props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
      </div>
    </div>
  );
};

export default MarkdownOutput;
