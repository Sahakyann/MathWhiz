export function parseLatexToMath(latexFunction) {
    console.log("Raw input function:", latexFunction);

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

    console.log("Converted function:", latexFunction);
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