import { parse } from 'acorn';
import { fullAncestor } from 'acorn-walk';
import { generate } from 'astring';
import type { Statement, BlockStatement } from 'estree';

export function protectLoops(jsCode: string): string {
  try {
    const ast = parse(jsCode, { ecmaVersion: 'latest' });
    let loopCounter = 0;

    fullAncestor(ast, (node, _state, ancestors) => {
      if (
        node.type !== 'ForStatement' &&
        node.type !== 'WhileStatement' &&
        node.type !== 'DoWhileStatement'
      ) {
        return;
      }

      const loopNode = node as Statement;
      const loopBody = (loopNode as { body: Statement }).body;

      // Wrap body in a block statement if it isn't already
      if (loopBody.type !== 'BlockStatement') {
        (loopNode as { body: Statement }).body = {
          type: 'BlockStatement',
          body: [loopBody],
        } as BlockStatement;
      }

      const block = (loopNode as { body: BlockStatement }).body;
      const varName = `__loopStart${loopCounter}`;
      loopCounter++;

      // Insert check at the beginning of the loop body
      const checkStmt: Statement = {
        type: 'IfStatement',
        test: {
          type: 'BinaryExpression',
          operator: '>',
          left: {
            type: 'BinaryExpression',
            operator: '-',
            left: {
              type: 'CallExpression',
              callee: {
                type: 'MemberExpression',
                object: { type: 'Identifier', name: 'Date' },
                property: { type: 'Identifier', name: 'now' },
                computed: false,
                optional: false,
              },
              arguments: [],
              optional: false,
            },
            right: { type: 'Identifier', name: varName },
          },
          right: { type: 'Literal', value: 500, raw: '500' },
        },
        consequent: {
          type: 'ThrowStatement',
          argument: {
            type: 'NewExpression',
            callee: { type: 'Identifier', name: 'Error' },
            arguments: [
              {
                type: 'Literal',
                value: 'Infinite Loop detected',
                raw: '"Infinite Loop detected"',
              },
            ],
          },
        },
        alternate: null,
      };

      block.body.unshift(checkStmt);

      // Insert var declaration before the loop in its parent
      const varDecl: Statement = {
        type: 'VariableDeclaration',
        kind: 'var',
        declarations: [
          {
            type: 'VariableDeclarator',
            id: { type: 'Identifier', name: varName },
            init: {
              type: 'CallExpression',
              callee: {
                type: 'MemberExpression',
                object: { type: 'Identifier', name: 'Date' },
                property: { type: 'Identifier', name: 'now' },
                computed: false,
                optional: false,
              },
              arguments: [],
              optional: false,
            },
          },
        ],
      };

      const parent = ancestors[ancestors.length - 2];
      if (!parent) return;

      if (parent.type === 'Program' || parent.type === 'BlockStatement') {
        const parentBody = (parent as unknown as { body: Statement[] }).body;
        const idx = parentBody.indexOf(loopNode);
        if (idx !== -1) {
          parentBody.splice(idx, 0, varDecl);
        }
      } else if (
        parent.type === 'FunctionDeclaration' ||
        parent.type === 'FunctionExpression' ||
        parent.type === 'ArrowFunctionExpression'
      ) {
        const funcBody = (parent as unknown as { body: BlockStatement | typeof parent }).body;
        if (funcBody.type === 'BlockStatement') {
          const idx = funcBody.body.indexOf(loopNode);
          if (idx !== -1) {
            funcBody.body.splice(idx, 0, varDecl);
          }
        }
      }
    });

    return generate(ast as unknown as Parameters<typeof generate>[0]);
  } catch {
    // If parsing fails (syntax error in student code), return original code unchanged
    return jsCode;
  }
}
