import { BlockMath, InlineMath } from "react-katex";
import React from "react";

export function parseLatexToMath(latexFunction) {
    //console.log("input function:", latexFunction);

    latexFunction = latexFunction.replace(/\\left/g, '');
    latexFunction = latexFunction.replace(/\\right/g, '');

    latexFunction = latexFunction.replace(/f\s*\(x\)\s*=/g, '');
    latexFunction = latexFunction.replace(/f\\left\(x\\right\)\s*=/g, '');
    latexFunction = latexFunction.replace(/\\cdot/g, '*');
    latexFunction = latexFunction.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '($1/$2)');

    const latexToMath = [
        ["\\\\sin", "sin"],
        ["\\\\cos", "cos"],
        ["\\\\tan", "tan"],
        ["\\\\exp", "exp"],
        ["\\\\sqrt", "sqrt"],
        ["\\\\log", "log"],
        ["\\\\ln", "log"],
        ["e\\^\\{", "exp("],
        ["\\\\pi", "pi"]
    ];

    for (const [latex, mathFunc] of latexToMath) {
        latexFunction = latexFunction.replace(new RegExp(latex, 'g'), mathFunc);
    }


    latexFunction = latexFunction.replace(/(?<!\w)e\^({[^}]+}|\w+)/g, "exp($1)");
    latexFunction = latexFunction.replace(/(?<=\))(?=[a-zA-Z])/g, '*');
    latexFunction = latexFunction.replace(/(?<=[0-9a-zA-Z])(?=\s*(sin|cos|tan|exp|sqrt|log|ln|pi)\s*\()/g, '*');
    latexFunction = latexFunction.replace(/{/g, '(');
    latexFunction = latexFunction.replace(/}/g, ')');

    //console.log("Converted function:", latexFunction);
    return latexFunction;
}

export function fixMultiplication(processedInput) {
    const knownFunctions = ['sin', 'cos', 'tan', 'log', 'sqrt', 'exp', 'ln'];
    const placeholders = [];

    for (const func of knownFunctions) {
        processedInput = processedInput.replace(
            new RegExp(`${func}\\s*\\(`, 'g'),
            match => {
                placeholders.push(match.trim());
                return `@${placeholders.length - 1}@`;
            }
        );
    }

    processedInput = processedInput
        .replace(/([0-9])([a-zA-Z])/g, '$1*$2')
        .replace(/([a-zA-Z])([0-9])/g, '$1*$2')
        .replace(/([a-zA-Z])([a-zA-Z])/g, '$1*$2');

    for (let i = 0; i < placeholders.length; i++) {
        processedInput = processedInput.replace(`@${i}@`, placeholders[i]);
    }

    return processedInput;
}


export function parseLatexToJsx(input) {
    const elements = [];
    let remaining = input;
    let key = 0;

    const BLOCK_REGEX = /\\\[(.+?)\\\]/gs;
    let blockMatch;

    while ((blockMatch = BLOCK_REGEX.exec(remaining)) !== null) {
        const [fullMatch, latex] = blockMatch;
        const before = remaining.slice(0, blockMatch.index);
        if (before) {
            elements.push(...parseMarkdownLines(before, key));
            key += 1000;
        }
        elements.push(<BlockMath math={latex.trim()} key={key++} />);
        remaining = remaining.slice(blockMatch.index + fullMatch.length);
        BLOCK_REGEX.lastIndex = 0;
    }

    if (remaining) {
        elements.push(...parseMarkdownLines(remaining, key));
    }

    return <>{elements}</>;
}

function parseMarkdownLines(text, keyOffset = 0) {
    const lines = text.split('\n');
    const elements = [];
    let key = keyOffset;

    for (let line of lines) {
        line = line.trim();
        if (!line) continue;

        if (line.startsWith('#### ')) {
            elements.push(<h4 style={{marginTop: "10px"}} key={key++}>{parseInlineLatex(line.replace('#### ', ''))}</h4>);
        } 
        else if (line.startsWith('### ')) {
            elements.push(<h3 style={{marginTop: "25px"}} key={key++}>{parseInlineLatex(line.replace('### ', ''))}</h3>);
        } else if (line.startsWith('## ')) {
            elements.push(<h2 style={{marginTop: "30px"}} key={key++}>{parseInlineLatex(line.replace('## ', ''))}</h2>);
        } else if (line.startsWith('# ')) {
            elements.push(<h1 style={{marginTop: "35px"}} key={key++}>{parseInlineLatex(line.replace('# ', ''))}</h1>);
        } else {
            const withBold = line.replace(/\*\*(.+?)\*\*/g, (_, boldText) => `<b>${boldText}</b>`);
            elements.push(<p key={key++}>{parseInlineLatex(withBold)}</p>);
        }
    }

    return elements;
}


function parseInlineLatex(text) {
    const parts = [];
    let lastIndex = 0;
    let match;
    const regex = /\\\((.+?)\\\)/gs;
    let key = 0;

    while ((match = regex.exec(text)) !== null) {
        const [fullMatch, latex] = match;
        const before = text.slice(lastIndex, match.index);
        if (before) parts.push(...renderHtmlAndText(before, key++));
        parts.push(<InlineMath math={latex.trim()} key={key++} />);
        lastIndex = match.index + fullMatch.length;
    }

    const after = text.slice(lastIndex);
    if (after) parts.push(...renderHtmlAndText(after, key++));

    return parts;
}

function renderHtmlAndText(text, key) {
    const boldRegex = /<b>(.*?)<\/b>/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = boldRegex.exec(text)) !== null) {
        const before = text.slice(lastIndex, match.index);
        if (before) parts.push(<React.Fragment key={`${key}-b-before-${lastIndex}`}>{before}</React.Fragment>);
        parts.push(<strong key={`${key}-b-${match.index}`}>{match[1]}</strong>);
        lastIndex = match.index + match[0].length;
    }

    const after = text.slice(lastIndex);
    if (after) parts.push(<React.Fragment key={`${key}-b-after-${lastIndex}`}>{after}</React.Fragment>);

    return parts;
}
