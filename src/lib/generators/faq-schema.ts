export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQValidationError {
  itemId: string;
  field: "question" | "answer" | "both";
  message: string;
}

export interface FAQValidationResult {
  isValid: boolean;
  errors: FAQValidationError[];
  validCount: number;
  totalCount: number;
}

export function validateFAQItems(items: FAQItem[]): FAQValidationResult {
  const errors: FAQValidationError[] = [];
  let validCount = 0;

  items.forEach((item, index) => {
    const q = item.question.trim();
    const a = item.answer.trim();

    if (!q && !a) {
      errors.push({
        itemId: item.id,
        field: "both",
        message: `FAQ item #${index + 1} is empty. Enter both a question and an answer.`
      });
    } else if (!q) {
      errors.push({
        itemId: item.id,
        field: "question",
        message: `FAQ item #${index + 1} is missing a question.`
      });
    } else if (!a) {
      errors.push({
        itemId: item.id,
        field: "answer",
        message: `FAQ item #${index + 1} is missing an answer.`
      });
    } else {
      validCount++;
    }
  });

  return {
    isValid: errors.length === 0 && items.length > 0 && validCount > 0,
    errors,
    validCount,
    totalCount: items.length
  };
}

export interface FAQSchemaOptions {
  minified?: boolean;
  includeScriptTag?: boolean;
}

export function generateFAQSchemaObject(items: FAQItem[]) {
  const valid = items.filter((item) => item.question.trim().length > 0 && item.answer.trim().length > 0);

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: valid.map((item) => ({
      "@type": "Question",
      name: item.question.trim(),
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.trim()
      }
    }))
  };
}

export function generateFAQSchemaJson(
  items: FAQItem[],
  options: FAQSchemaOptions = {}
): string {
  const { minified = false, includeScriptTag = false } = options;
  const schemaObj = generateFAQSchemaObject(items);
  const jsonString = JSON.stringify(schemaObj, null, minified ? 0 : 2);

  if (includeScriptTag) {
    return `<script type="application/ld+json">\n${jsonString}\n</script>`;
  }

  return jsonString;
}
