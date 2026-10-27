#!/usr/bin/env bash
#
# 构建产物校验：CI 与本地 `pnpm verify` 共用同一份，避免两边断言漂移。
#
# 这份检查存在的意义：曾经因为 ci.yml 与构建配置不一致（directory vs file 格式），
# 连续两次推送在 CI 里失败并触发失败通知邮件。把断言收在一个可本地运行的文件里，
# 推送前跑 `pnpm ci` 就能得到与 CI 完全一致的结果。
#
# 用法：bash scripts/verify-dist.sh   （需要先 pnpm build）
set -euo pipefail

cd "$(dirname "$0")/.."

fail() {
  echo "✗ $1"
  exit 1
}

# ---------- 必需产物 ----------
# build.format = 'file'：页面落在 about.html / en.html，URL 天然没有尾斜杠。
[ -f dist/index.html ] || fail "dist/index.html 缺失"
[ -f dist/about.html ] || fail "dist/about.html 缺失"
[ -f dist/notes.html ] || fail "dist/notes.html 缺失"
[ -f dist/rss.xml ] || fail "dist/rss.xml 缺失"

# 英文站
[ -f dist/en.html ] || fail "dist/en.html 缺失"
[ -f dist/en/about.html ] || fail "dist/en/about.html 缺失"
[ -f dist/en/work.html ] || fail "dist/en/work.html 缺失"
[ -f dist/en/notes.html ] || fail "dist/en/notes.html 缺失"
[ -f dist/en/rss.xml ] || fail "dist/en/rss.xml 缺失"

# ---------- 格式守卫 ----------
# 一旦退回 directory 格式（about/index.html），Cloudflare Pages 会给目录 URL 强制
# 补尾斜杠（/about → 308 /about/），与「URL 不带尾斜杠」的约定冲突；
# 再叠加 _redirects 就变成 /about ⇄ /about/ 无限重定向（线上实测过）。
if [ -f dist/about/index.html ] || [ -f dist/en/index.html ]; then
  fail "检测到 directory 格式产物：会和 _redirects 组成尾斜杠死循环，请把 build.format 改回 'file'"
fi

# ---------- 语言互链 ----------
grep -q 'hreflang="en"' dist/index.html || fail "中文首页缺少 en hreflang"
grep -q 'hreflang="zh-CN"' dist/en.html || fail "英文首页缺少 zh-CN hreflang"
grep -q '<html lang="en"' dist/en.html || fail "英文首页 lang 不是 en"
grep -q '<html lang="zh-CN"' dist/index.html || fail "中文首页 lang 不是 zh-CN"
grep -q 'class="lang-btn-text">EN' dist/index.html || fail "中文页语言按钮不是 EN"
grep -q 'class="lang-btn-text">CN' dist/en.html || fail "英文页语言按钮不是 CN"

# ---------- canonical 不带尾斜杠 ----------
# canonical 若带斜杠，会和站内链接、_redirects 目标指向两个地址，分散收录。
for page in dist/about.html dist/work.html dist/notes.html dist/en.html dist/en/work.html; do
  canonical=$(grep -o 'rel="canonical" href="[^"]*"' "$page" | head -1 | sed 's/.*href="//; s/"$//')
  [ -n "$canonical" ] || fail "$page 缺少 canonical"
  case "$canonical" in
    */) fail "$page 的 canonical 带尾斜杠：$canonical" ;;
  esac
done

# ---------- 重定向规则 ----------
[ -f dist/_redirects ] || fail "dist/_redirects 缺失（public/_redirects 未被复制）"
grep -q '^/en/  *\/en  *301' dist/_redirects || fail "_redirects 缺少 /en/ → /en 的 301 规则"
# 反向守卫：不能出现把无斜杠地址送去带斜杠版本的规则（死循环的形状）
if grep -qE '^/[^[:space:]]+[^/][[:space:]]+/[^[:space:]]+/[[:space:]]+30[12]' dist/_redirects; then
  fail "_redirects 存在「无斜杠 → 带斜杠」的 30x 规则，会与边缘规范化组成死循环"
fi

echo "✓ 构建产物检查通过"
