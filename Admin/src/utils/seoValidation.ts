const MAX_HEAD_TAGS = 50;

type ValidationResult = {
  isValid: boolean;
  errors: string[];
};

const getTagName = (tagText: string) => {
  const match = tagText.match(/^<\s*([a-zA-Z0-9:-]+)/);
  return match ? match[1].toLowerCase() : '';
};

const parseAttributes = (tagText: string) => {
  const match = tagText.match(/^<\s*[a-zA-Z0-9:-]+\s*([^>]*)>/s);
  const attrChunk = match ? match[1] : '';
  const attrs: Record<string, string> = {};
  const attrRegex = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;

  let attrMatch = attrRegex.exec(attrChunk);
  while (attrMatch) {
    const key = attrMatch[1].toLowerCase();
    attrs[key] = attrMatch[2] !== undefined ? attrMatch[2] : attrMatch[3] || '';
    attrMatch = attrRegex.exec(attrChunk);
  }

  return attrs;
};

const splitHeadTagEntries = (headTagsInput: string) => {
  const input = String(headTagsInput || '').trim();
  if (!input) {
    return [];
  }

  const tags = [];
  const lines = input.split(/\r?\n/);
  let activeScript: { buffer: string[]; line: number } | null = null;

  for (let index = 0; index < lines.length; index += 1) {
    const rawLine = lines[index];
    const line = rawLine.trim();

    if (!line) {
      continue;
    }

    if (activeScript) {
      activeScript.buffer.push(rawLine);
      if (line.includes('</script>')) {
        tags.push({ text: activeScript.buffer.join('\n').trim(), line: activeScript.line });
        activeScript = null;
      }
      continue;
    }

    if (line.startsWith('<script') && !line.includes('</script>')) {
      activeScript = { buffer: [rawLine], line: index + 1 };
      continue;
    }

    tags.push({ text: line, line: index + 1 });
  }

  if (activeScript) {
    tags.push({ text: activeScript.buffer.join('\n').trim(), line: activeScript.line, unterminatedScript: true });
  }

  return tags;
};

const validateScriptJsonLd = (tagText: string, line: number, errors: string[]) => {
  const scriptTypeMatch = tagText.match(/type\s*=\s*(?:"([^"]+)"|'([^']+)')/i);
  const scriptType = (scriptTypeMatch?.[1] || scriptTypeMatch?.[2] || '').toLowerCase();

  if (scriptType && scriptType !== 'application/ld+json' && scriptType !== 'text/javascript') {
    errors.push(`Line ${line}: script tag type must be application/ld+json or text/javascript`);
  }

  if (scriptType === 'application/ld+json') {
    const jsonMatch = tagText.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
    const jsonContent = (jsonMatch?.[1] || '').trim();
    if (!jsonContent) {
      errors.push(`Line ${line}: JSON-LD script is empty`);
      return;
    }

    try {
      JSON.parse(jsonContent);
    } catch (error: any) {
      errors.push(`Line ${line}: JSON-LD parse error: ${error.message}`);
    }
  }
};

export const validateHeadTags = (headTagsInput: string): ValidationResult => {
  const entries = splitHeadTagEntries(headTagsInput);
  const errors: string[] = [];

  if (entries.length > MAX_HEAD_TAGS) {
    errors.push(`Head tags exceed max count (${MAX_HEAD_TAGS}).`);
  }

  for (const entry of entries) {
    const repaired = entry.text; // quoteUnquotedAttributes is a backend auto-repair. On frontend, we just validate.
    const line = entry.line;

    if (entry.unterminatedScript) {
      errors.push(`Line ${line}: unterminated <script> tag block`);
      continue;
    }

    if (!repaired.startsWith('<') || !repaired.endsWith('>')) {
      errors.push(`Line ${line}: malformed HTML tag`);
      continue;
    }

    const openAngles = (repaired.match(/</g) || []).length;
    const closeAngles = (repaired.match(/>/g) || []).length;
    if (openAngles !== closeAngles) {
      errors.push(`Line ${line}: unmatched angle brackets`);
    }

    const doubleQuotes = (repaired.match(/"/g) || []).length;
    const singleQuotes = (repaired.match(/'/g) || []).length;
    if (doubleQuotes % 2 !== 0 || singleQuotes % 2 !== 0) {
      errors.push(`Line ${line}: unmatched quotes in attributes`);
    }

    const tagName = getTagName(repaired);
    if (!['meta', 'link', 'script'].includes(tagName)) {
      errors.push(`Line ${line}: only <meta>, <link>, and <script> tags are allowed`);
      continue;
    }

    if (tagName === 'meta') {
      const attrs = parseAttributes(repaired);
      const hasName = Boolean(attrs.name);
      const hasProperty = Boolean(attrs.property);
      const hasContent = Boolean(attrs.content);

      if (!hasName && !hasProperty) {
        errors.push(`Line ${line}: meta tag requires name or property attribute`);
      }
      if (!hasContent) {
        errors.push(`Line ${line}: meta tag requires content attribute`);
      }
    }

    if (tagName === 'link') {
      const attrs = parseAttributes(repaired);
      if (!attrs.rel) {
        errors.push(`Line ${line}: link tag requires rel attribute`);
      }
      if (!attrs.href) {
        errors.push(`Line ${line}: link tag requires href attribute`);
      }
    }

    if (tagName === 'script') {
      validateScriptJsonLd(repaired, line, errors);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateSchemaJson = (schemaTextInput: string): ValidationResult => {
  const text = String(schemaTextInput || '').trim();
  if (!text) {
    return {
      isValid: true,
      errors: [],
    };
  }

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (error: any) {
    return {
      isValid: false,
      errors: [`Schema JSON parse error: ${error.message}`],
    };
  }

  const errors: string[] = [];

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    errors.push('Schema JSON must be a JSON object.');
  } else {
    if (!parsed['@context']) {
      errors.push('Schema JSON must include @context.');
    }

    if (!parsed['@type']) {
      errors.push('Schema JSON must include @type.');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
