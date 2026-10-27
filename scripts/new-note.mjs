#!/usr/bin/env node
import { existsSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const notesDir = resolve('src/content/notes');
const args = process.argv.slice(2);
const title = args[0];
const slugArg = args.find((arg) => arg.startsWith('--slug='))?.slice('--slug='.length) ?? args[1];

if (!title) {
  console.error('用法：pnpm new "标题" why-i-write');
  console.error('文件名需要小写英文、数字或连字符，因此第二个参数是必需的 slug。');
  process.exit(1);
}

if (!slugArg) {
  console.error('缺少 slug。示例：pnpm new "把工具做成习惯" tools-as-habits');
  console.error('中文标题不会自动转拼音，请同时给出一个简短的英文 slug。');
  process.exit(1);
}

const slug = slugArg.trim();
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error(`slug 不合法：${slug}`);
  console.error('只能使用小写字母、数字和连字符，例如 why-i-write。');
  process.exit(1);
}

const filePath = resolve(notesDir, `${slug}.md`);
if (existsSync(filePath)) {
  console.error(`文件已存在：${filePath}`);
  process.exit(1);
}

const today = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Shanghai',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(new Date());

const escapedTitle = title.replaceAll('"', '\\"');
const template = `---
title: "${escapedTitle}"
date: ${today}
summary: 在这里写一句话摘要，说明这篇笔记在讲什么，发布前替换。
tags: []
draft: true
---

开头一段说清楚这篇想讲什么。

## 一个小标题

正文。
`;

writeFileSync(filePath, template, { encoding: 'utf8', flag: 'wx' });

console.log(`已创建 ${filePath}`);

// 英文译文另存一份 <slug>.en.md（与中文原文同名 slug，靠 .en 后缀配对）。
// 译文不需要 date：构建时沿用中文原文的日期。不想翻译时删掉这个文件即可，
// 英文站会自动隐藏该篇，中文页的语言切换会回退到英文列表。
const enFilePath = resolve(notesDir, `${slug}.en.md`);
const enTemplate = `---
title: "English title of the note"
summary: One sentence explaining what this note is about, replace before publishing.
tags: []
draft: true
---

First paragraph in English.
`;

if (!existsSync(enFilePath)) {
  writeFileSync(enFilePath, enTemplate, { encoding: 'utf8', flag: 'wx' });
  console.log(`已创建英文译文 ${enFilePath}`);
}

console.log('下一步：补全 summary，把 draft 改成 false，然后运行 pnpm dev 预览。');
console.log(`英文版：翻译 src/content/notes/${slug}.en.md，或删掉它表示暂不翻译。`);
