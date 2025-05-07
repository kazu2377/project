import { Problem } from "../lib/types";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error(
    "OpenAI APIキーが設定されていません。環境変数VITE_OPENAI_API_KEYを確認してください。"
  );
}

export async function generateProblem(level: number): Promise<Problem> {
  try {
    if (!OPENAI_API_KEY) {
      throw new Error("OpenAI APIキーが設定されていません");
    }

    const prompt = `プログラミングの問題を1つ生成してください。
レベル: ${level}（1-10のスケールで、1が最も簡単）
条件:
- 問題文は日本語で
- 4つの選択肢を提供（A, B, C, D）
- 解説も日本語で
- JavaScriptのコードを含める場合はコードブロック(\`\`\`)で囲む

形式:
{
  "question": "問題文",
  "options": ["選択肢A", "選択肢B", "選択肢C", "選択肢D"],
  "answer": 0-3の数字（正解の選択肢のインデックス）,
  "explanation": "解説文"
}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate problem");
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    return {
      id: `ai-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`,
      question: result.question,
      options: result.options,
      answer: result.answer,
      explanation: result.explanation,
      level,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error generating problem:", error);
    return getDefaultProblem(level);
  }
}

function getDefaultProblem(level: number): Problem {
  const defaultProblems: Record<number, Problem> = {
    1: {
      id: "default-1",
      question:
        '次のJavaScriptコードの出力は何ですか？\n\n```javascript\nlet x = 5;\nlet y = "10";\nconsole.log(x + y);\n```',
      options: ["15", '"510"', "エラー", '5 + "10"'],
      answer: 1,
      explanation:
        'JavaScriptでは、数値と文字列を+演算子で結合すると、数値が文字列に変換され、文字列の連結が行われます。したがって、5 + "10" は "510" となります。',
      level: 1,
      createdAt: new Date().toISOString(),
    },
    2: {
      id: "default-2",
      question: "次の比較式の結果はどうなりますか？\n\n```javascript\nconsole.log(3 > 2 > 1);\n```",
      options: ["true", "false", "エラー", "比較不可能"],
      answer: 1,
      explanation:
        "この式は左から右に評価されます。まず `3 > 2` は `true` となり、次に `true > 1` が評価されます。JavaScriptでは `true` は `1` に変換されるため、実質的に `1 > 1` となり、これは `false` となります。",
      level: 2,
      createdAt: new Date().toISOString(),
    },
    3: {
      id: "default-3",
      question:
        '次のif文の出力は何になりますか？\n\n```javascript\nlet val = 0;\nif (val = 1) {\n  console.log("真");\n} else {\n  console.log("偽");\n}\n```',
      options: ["真", "偽", "エラー", "未定義"],
      answer: 0,
      explanation:
        'この場合、if文の条件部分で `=` （代入演算子）を使用しているため、valに1が代入されます。代入式は代入された値を返すため、条件は1（真）となり、"真"が出力されます。これは一般的なバグの原因となるため、条件式では `==` や `===` を使用するべきです。',
      level: 3,
      createdAt: new Date().toISOString(),
    },
    4: {
      id: "default-4",
      question:
        "次のループの実行回数は何回ですか？\n\n```javascript\nfor (let i = 0; i < 5; i += 2) {\n  console.log(i);\n}\n```",
      options: ["2回", "3回", "4回", "5回"],
      answer: 1,
      explanation:
        "iは0から始まり、2ずつ増加します。実行されるのは i=0, i=2, i=4 の3回です。i=6となったときはループ条件 i < 5 を満たさないため、ループは終了します。",
      level: 4,
      createdAt: new Date().toISOString(),
    },
    5: {
      id: "default-5",
      question:
        "次の関数の戻り値は何になりますか？\n\n```javascript\nfunction test() {\n  return\n  {\n    value: 42\n  }\n}\nconsole.log(test());\n```",
      options: ["{ value: 42 }", "undefined", "42", "エラー"],
      answer: 1,
      explanation:
        "JavaScriptでは、セミコロンが省略された場合に自動的に挿入されます。この場合、returnステートメントの後に改行があるため、そこにセミコロンが自動挿入され、return; となります。そのため、関数は undefined を返します。オブジェクトを返すには、波括弧を return と同じ行に書く必要があります。",
      level: 5,
      createdAt: new Date().toISOString(),
    },
    6: {
      id: "default-6",
      question:
        "次の配列操作の結果は何になりますか？\n\n```javascript\nconst arr = [1, 2, 3];\narr.push(4);\narr[0] = 0;\nconsole.log(arr.length);\n```",
      options: ["3", "4", "5", "エラー"],
      answer: 1,
      explanation:
        "配列に対して push メソッドを使用すると要素が末尾に追加され、配列の長さが1増えます。その後、インデックス0の要素を0に変更していますが、これは配列の長さには影響しません。したがって、最終的な配列の長さは4となります。",
      level: 6,
      createdAt: new Date().toISOString(),
    },
    7: {
      id: "default-7",
      question:
        "次のコードの出力は何になりますか？\n\n```javascript\nconst obj1 = { value: 10 };\nconst obj2 = obj1;\nobj2.value = 20;\nconsole.log(obj1.value);\n```",
      options: ["10", "20", "undefined", "エラー"],
      answer: 1,
      explanation:
        "JavaScriptでは、オブジェクトは参照によって渡されます。obj2 = obj1 という代入は、obj1の参照をobj2にコピーしているだけです。したがって、obj2.valueを変更すると、同じオブジェクトを参照しているobj1.valueも変更されます。",
      level: 7,
      createdAt: new Date().toISOString(),
    },
    8: {
      id: "default-8",
      question:
        '次のtry-catch文の出力は何になりますか？\n\n```javascript\ntry {\n  throw new Error("エラー発生");\n  console.log("A");\n} catch (e) {\n  console.log("B");\n} finally {\n  console.log("C");\n}\n```',
      options: ["A,B,C", "B,C", "C", "エラー"],
      answer: 1,
      explanation:
        'throw文でエラーが発生すると、その時点で実行が中断され、catchブロックに移ります。したがって、"A"は出力されません。catchブロックで"B"が出力され、finallyブロックは必ず実行されるので"C"も出力されます。結果として"B,C"が順に出力されます。',
      level: 8,
      createdAt: new Date().toISOString(),
    },
    9: {
      id: "default-9",
      question:
        "次のバブルソートの実装で、内側のループの条件として正しいものはどれですか？\n\n```javascript\nfunction bubbleSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < ???; j++) {\n      if (arr[j] > arr[j + 1]) {\n        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n      }\n    }\n  }\n  return arr;\n}\n```",
      options: ["arr.length", "arr.length - 1", "arr.length - i", "arr.length - i - 1"],
      answer: 3,
      explanation:
        "バブルソートでは、各パスで最大の要素が末尾に移動します。そのため、i回目のパスでは、末尾のi個の要素は既にソート済みとなっています。また、j+1との比較を行うため、配列の最後の要素まで見る必要はありません。したがって、内側のループの条件は arr.length - i - 1 が正しいです。",
      level: 9,
      createdAt: new Date().toISOString(),
    },
    10: {
      id: "default-10",
      question:
        "次の二分探索木の実装で、挿入メソッドの再帰呼び出しとして正しいものはどれですか？\n\n```javascript\nclass Node {\n  constructor(value) {\n    this.value = value;\n    this.left = null;\n    this.right = null;\n  }\n}\n\nclass BinarySearchTree {\n  constructor() {\n    this.root = null;\n  }\n\n  insert(value, node = this.root) {\n    if (!this.root) {\n      this.root = new Node(value);\n      return;\n    }\n    if (value < node.value) {\n      if (!node.left) {\n        node.left = new Node(value);\n      } else {\n        // ここに再帰呼び出しを入れる\n      }\n    } else {\n      if (!node.right) {\n        node.right = new Node(value);\n      } else {\n        // ここに再帰呼び出しを入れる\n      }\n    }\n  }\n}\n```",
      options: [
        "insert(value)",
        "this.insert(value, node.left || node.right)",
        "this.insert(value, value < node.value ? node.left : node.right)",
        "node.left.insert(value) || node.right.insert(value)",
      ],
      answer: 2,
      explanation:
        "二分探索木への値の挿入では、現在のノードの値と挿入する値を比較し、小さい場合は左部分木、大きい場合は右部分木に再帰的に挿入します。したがって、value < node.value の条件に基づいて node.left または node.right を次の再帰呼び出しのノードとして渡す必要があります。三項演算子を使用した this.insert(value, value < node.value ? node.left : node.right) が正しい実装となります。",
      level: 10,
      createdAt: new Date().toISOString(),
    },
  };

  return defaultProblems[level] || defaultProblems[1];
}

export async function generateExplanation(
  problem: Problem,
  selectedOption: number
): Promise<string> {
  try {
    if (!OPENAI_API_KEY) {
      throw new Error("OpenAI APIキーが設定されていません");
    }

    const prompt = `以下の問題に対する解説を生成してください。ユーザーの回答が${
      selectedOption === problem.answer ? "正解" : "不正解"
    }でした。
問題: ${problem.question}
選択肢: ${problem.options.join(", ")}
ユーザーの回答: ${problem.options[selectedOption]}
正解: ${problem.options[problem.answer]}

解説は以下の点を含めてください：
- なぜその答えが正解なのか
- よくある間違いとその理由（不正解の場合）
- 関連する概念の説明
- 実践的なアドバイス`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate explanation");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating explanation:", error);
    return problem.explanation;
  }
}
