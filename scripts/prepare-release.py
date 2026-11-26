"""Publish locked placeholders while keeping future lecture source intact in dist."""
from pathlib import Path
import shutil
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / '.release'
if OUT.exists():
    shutil.rmtree(OUT)
shutil.copytree(ROOT / 'dist', OUT)
locked = []
for page in OUT.rglob('*.html'):
    relative = page.relative_to(OUT)
    first = relative.parts[0]
    week = next((n for n in (3, 4) if first.startswith(f'week{n}')), None)
    if week is None:
        continue
    prefix = '../' * (len(relative.parts) - 1)
    page.write_text(f'''<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{week}주차 / 추후 오픈</title><link rel="stylesheet" href="{prefix}design-tokens.css"><link rel="stylesheet" href="{prefix}deck.css"></head><body class="is-locked"><main class="locked-page"><div class="locked-mark">YF</div><div class="eyebrow">GROUP D / COMING SOON</div><h1>🔒 {week}주차 자료는<br>추후 오픈됩니다</h1><p>현재는 1주차와 2주차 강의 및 실습 자료를 확인해주세요.</p><div class="locked-actions"><a href="{prefix}index.html">홈으로</a><a href="{prefix}week1_deck.html">1주차 보기</a></div></main></body></html>''')
    locked.append(str(relative))
print(f'Prepared release: {len(locked)} lecture and practice pages locked')
