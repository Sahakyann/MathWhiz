export function parseLatex(text) {
    let cleanedLatex = text
        .replace(/\\documentclass{.*?}|\\usepackage{.*?}|\\begin{document}|\\end{document}|\\maketitle/gs, "")
        .replace(/\\(centering|label|begin{flushleft}|end{flushleft}|raggedright)/g, "")
        .trim();

    cleanedLatex = cleanedLatex
        .replace(/\\\[/g, "$$")
        .replace(/\\\]/g, "$$");

    cleanedLatex = cleanedLatex
        .replace(/\\\(/g, "$")
        .replace(/\\\)/g, "$");

    cleanedLatex = cleanedLatex.replace(/\\section\*{(.*?)}/g, (_, section) => {
        const id = section.toLowerCase().replace(/ /g, "-");
        return `## ${section} [#${id}]`;
    });

    cleanedLatex = cleanedLatex.replace(/\\begin{align\*}/g, "$$").replace(/\\end{align\*}/g, "$$");
    cleanedLatex = cleanedLatex.replace(/\\textbf{(.*?)}/g, "**$1**");
    cleanedLatex = cleanedLatex.replace(/\\includegraphics{(.*?),(.*?)}/g, "!TOGGLE[../$1|../$2]");

    cleanedLatex = cleanedLatex
        .replace(/\\begin{enumerate}/g, "<ul>")
        .replace(/\\end{enumerate}/g, "</ul>")
        .replace(/\\item (.*?);/g, "<li>$1</li>");
    
    return cleanedLatex;
}
