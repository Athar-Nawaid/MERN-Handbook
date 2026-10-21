/**
 * Standalone Zero-Dependency Syntax Highlighter
 * Fast, resilient client-side token highlighter for technical documentation
 */

(function () {
  const LANGUAGES = {
    javascript: [
      { type: "comment", regex: /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g },
      { type: "string", regex: /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)/g },
      { type: "number", regex: /\b(0x[a-fA-F0-9]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b/g },
      { type: "keyword", regex: /\b(async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|export|extends|finally|for|function|if|import|in|instanceof|let|new|null|of|return|super|switch|this|throw|try|typeof|var|void|while|with|yield|undefined|true|false)\b/g },
      { type: "builtin", regex: /\b(console|Promise|Array|Object|String|Number|Boolean|Map|Set|Symbol|Error|JSON|Math|Date|RegExp|process|Buffer|window|document)\b/g },
      { type: "function", regex: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*\()/g },
      { type: "operator", regex: /(=>|===|!==|==|!=|<=|>=|\+\+|--|\+|-|\*|\/|%|&&|\|\||!|\?|:|=)/g }
    ],
    typescript: [
      { type: "comment", regex: /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g },
      { type: "string", regex: /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)/g },
      { type: "keyword", regex: /\b(interface|type|enum|declare|namespace|abstract|as|any|unknown|never|is|keyof|readonly|implements|async|await|break|case|catch|class|const|continue|default|delete|do|else|export|extends|finally|for|function|if|import|in|instanceof|let|new|null|return|super|switch|this|throw|try|typeof|var|while|yield|true|false)\b/g },
      { type: "builtin", regex: /\b(string|number|boolean|symbol|void|Record|Partial|Pick|Omit|Required|Promise|Array|Object|Map|Set)\b/g },
      { type: "function", regex: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*(\(|<))/g },
      { type: "operator", regex: /(=>|===|!==|==|!=|<=|>=|\+\+|--|\+|-|\*|\/|%|&&|\|\||!|\?|:|=)/g }
    ],
    sql: [
      { type: "comment", regex: /(--[^\n]*|\/\*[\s\S]*?\*\/)/g },
      { type: "string", regex: /('(?:\\.|[^'\\])*')/g },
      { type: "keyword", regex: /\b(SELECT|FROM|WHERE|INSERT|INTO|UPDATE|DELETE|JOIN|INNER|LEFT|RIGHT|FULL|OUTER|ON|GROUP|BY|ORDER|HAVING|LIMIT|OFFSET|AS|AND|OR|NOT|IN|EXISTS|BETWEEN|LIKE|IS|NULL|CREATE|TABLE|ALTER|DROP|INDEX|VIEW|PRIMARY|KEY|FOREIGN|REFERENCES|CONSTRAINT|TRANSACTION|BEGIN|COMMIT|ROLLBACK|UNION|ALL|DISTINCT|CASE|WHEN|THEN|ELSE|END|EXPLAIN|ANALYZE|CASCADE|SET)\b/gi },
      { type: "function", regex: /\b(COUNT|SUM|AVG|MIN|MAX|COALESCE|NOW|ROW_NUMBER|RANK|DENSE_RANK|LAG|LEAD)\b/gi },
      { type: "number", regex: /\b\d+(\.\d+)?\b/g }
    ],
    bash: [
      { type: "comment", regex: /(#[^\n]*)/g },
      { type: "string", regex: /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g },
      { type: "keyword", regex: /\b(npm|npx|node|git|docker|docker-compose|curl|sudo|chmod|chown|cat|grep|ps|kill|export|source|echo|cd|ls|mkdir|rm|systemctl)\b/g },
      { type: "operator", regex: /(\||&&|>|<|>>|&|\$)/g }
    ],
    json: [
      { type: "string", regex: /("(?:\\.|[^"\\])*")/g },
      { type: "number", regex: /\b\d+(\.\d+)?\b/g },
      { type: "keyword", regex: /\b(true|false|null)\b/g }
    ],
    html: [
      { type: "comment", regex: /(<!--[\s\S]*?-->)/g },
      { type: "string", regex: /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g },
      { type: "tag", regex: /(<\/?)([a-zA-Z0-9-]+)(?=[ >/])/g },
      { type: "attr-name", regex: /\b([a-zA-Z-]+)(?=\s*=)/g }
    ]
  };

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function highlight(code, lang) {
    const language = LANGUAGES[lang] || LANGUAGES.javascript;
    let tokens = [{ text: code, isToken: false }];

    language.forEach(({ type, regex }) => {
      let nextTokens = [];
      tokens.forEach((tok) => {
        if (tok.isToken) {
          nextTokens.push(tok);
          return;
        }

        let lastIndex = 0;
        let match;
        const re = new RegExp(regex.source, regex.flags);

        while ((match = re.exec(tok.text)) !== null) {
          if (match.index > lastIndex) {
            nextTokens.push({
              text: tok.text.substring(lastIndex, match.index),
              isToken: false
            });
          }
          nextTokens.push({
            text: match[0],
            isToken: true,
            type: type
          });
          lastIndex = re.lastIndex;
        }

        if (lastIndex < tok.text.length) {
          nextTokens.push({
            text: tok.text.substring(lastIndex),
            isToken: false
          });
        }
      });
      tokens = nextTokens;
    });

    return tokens
      .map((tok) => {
        if (tok.isToken) {
          return `<span class="token ${tok.type}">${escapeHtml(tok.text)}</span>`;
        }
        return escapeHtml(tok.text);
      })
      .join("");
  }

  function highlightAll() {
    document.querySelectorAll("pre code").forEach((block) => {
      if (block.dataset.highlighted) return;

      const classes = block.className.split(" ");
      let lang = "javascript";
      for (const cls of classes) {
        if (cls.startsWith("language-")) {
          lang = cls.replace("language-", "");
          break;
        }
      }

      const raw = block.textContent;
      block.innerHTML = highlight(raw, lang.toLowerCase());
      block.dataset.highlighted = "true";
    });
  }

  window.SimpleHighlighter = {
    highlight,
    highlightAll
  };

  document.addEventListener("DOMContentLoaded", () => {
    highlightAll();
  });
})();

