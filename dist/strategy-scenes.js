/* Teaching strategy: decision, reason, worked example, evidence. */
(() => {
const scenes = {
  "기업의 채용 변화": [
    "research",
    "STRATEGY / WEEK 01",
    "AI를 개발하는 역량과 업무에 쓰는 역량은 다릅니다",
    "<p class=\"strategy-purpose\">지원 직무에 따라 준비할 프로젝트의 깊이와 보여줄 증거가 달라집니다.</p><div class=\"strategy-compare\"><section><span>AI 기술을 만드는 역할</span><h4>모델과 시스템을 설계</h4><p>데이터 처리, 개발, 성능 평가 등<br>공고가 요구하는 기술 수준을 확인합니다.</p></section><section><span>AI를 활용하는 역할</span><h4>담당 업무의 결과를 개선</h4><p>업무 기준, 도구 활용, 검수와 수정 등<br>직무 수행 과정을 보여줍니다.</p></section></div><div class=\"strategy-takeaway\">이 과정의 초점: 희망 직무의 일을 AI와 함께 수행하고, <b>내 선택과 결과를 설명하는 경험</b></div><p class=\"theory-source\"><a href=\"https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/4-workforce-strategies/\" target=\"_blank\" rel=\"noopener\">WEF 2025 / AI 도구 개발 인재와 AI 활용 인재의 채용 계획을 구분. 위 설명은 수업용 해석 ↗</a></p>"
  ],
  "기업이 AI 인재를 찾는 이유": [
    "research",
    "STRATEGY / WEEK 01",
    "기업이 도입을 판단하는 단위는 도구가 아니라 업무입니다",
    "<p class=\"strategy-purpose\">AI를 써본 사실만으로는 비용, 품질과 사용자의 업무가 어떻게 바뀌는지 알 수 없습니다.</p><div class=\"strategy-ledger\"><header><b>업무에서 확인할 것</b><b>AI 활용의 가능성</b><b>함께 확인할 비용</b></header><section><p>반복해서 읽고 옮기는 시간</p><p>분류와 초안을 먼저 제안</p><p>자료 준비 + 결과 검수 시간</p></section><section><p>누락과 들쭉날쭉한 처리</p><p>공통 기준으로 초안 작성</p><p>틀린 판단을 찾고 고치는 비용</p></section><section><p>결과 이후의 의사결정</p><p>근거와 후보를 모아 비교</p><p>담당자가 실제로 채택하는가</p></section></div><div class=\"strategy-takeaway\">포트폴리오에서도 <b>누구의 어떤 일을 바꿨고, 그 결과를 어떻게 확인했는지</b> 보여줍니다.</div><p class=\"theory-source\"><a href=\"https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/business-strategy-plan\" target=\"_blank\" rel=\"noopener\">Microsoft / 사업 효과, 기술적 실행 가능성, 사용자 수용성 평가. 위 표는 수업용 적용 ↗</a></p>"
  ],
  "프로젝트에서 지원서까지": [
    "research",
    "STRATEGY / WEEK 01",
    "지원 직무에서 보여줄 행동을 정하고 증거를 거꾸로 설계합니다",
    "<p class=\"strategy-purpose\">완성한 뒤 직무에 끼워 맞추면 예쁜 화면만 남고, 나의 역량을 설명하기 어려워집니다.</p><div class=\"strategy-chain\"><section><span>01</span><h4>보여줄 행동</h4><p>고객 반응을 해석하고<br>콘텐츠 주제를 제안한다.</p></section><i aria-hidden=\"true\">→</i><section><span>02</span><h4>필요한 증거</h4><p>리뷰 원문 → 분류 근거<br>→ 후보 선택 이유</p></section><i aria-hidden=\"true\">→</i><section><span>03</span><h4>만들 작은 과제</h4><p>리뷰에서 사용 안내가<br>필요한 주제 1개 고르기</p></section></div><div class=\"strategy-takeaway\">기획한 행동을 실제로 해보고 기록합니다. <b>이 지침서는 실행 계획이며, 성과 증거는 이후에 쌓습니다.</b></div>"
  ],
  "희망 산업과 직무 좁히기": [
    "research",
    "STRATEGY / WEEK 01",
    "같은 리뷰라도 담당자의 결정이 다르면 과제가 달라집니다",
    "<p class=\"strategy-purpose\">산업 이름만 바꾸지 말고, 그 직무가 결과를 보고 무엇을 결정하는지 정해야 합니다.</p><div class=\"strategy-ledger\"><header><b>같은 입력: 제품 리뷰</b><b>직무가 내릴 결정</b><b>필요한 결과물</b></header><section><p>콘텐츠 마케팅</p><p>어떤 사용 안내를 먼저 만들까</p><p>불편의 근거와 콘텐츠 후보</p></section><section><p>품질 관리</p><p>어떤 증상을 우선 확인할까</p><p>증상별 원문과 추가 점검 항목</p></section><section><p>상품 기획</p><p>어떤 요구를 다음 기획에 검토할까</p><p>요구 묶음과 확인할 가설</p></section></div>"
  ],
  "자동화 후보 평가 프레임": [
    "research",
    "STRATEGY / WEEK 01",
    "효과가 있어 보여도 자료와 검수 기준이 없으면 범위를 줄입니다",
    "<p class=\"strategy-purpose\">직무 관련성이 있는 후보끼리 비교한 뒤, 이번 기간에 끝까지 확인할 수 있는 것을 고릅니다.</p><div class=\"strategy-ledger\"><header><b>후보 비교 / 수업용 가정</b><b>자료와 판단 조건</b><b>선택</b></header><section><p>매출을 올리는 마케팅 에이전트</p><p>광고 계정, 집행 예산, 성과 측정 필요</p><p>이번 범위에서 보류</p></section><section><p>리뷰 기반 안내 주제 검토표</p><p>사용 가능한 리뷰 + 분류 기준<br>원문으로 결과를 대조할 수 있음</p><p>작은 과제로 선택</p></section><section><p>리뷰 키워드 빈도표</p><p>자료 확보와 집계는 쉬움<br>불편의 의미와 주제 판단은 남음</p><p>보조 기능으로 사용</p></section></div><div class=\"strategy-takeaway\">선정 근거: <b>직무에서 필요한가 → 자료를 구할 수 있나 → 결과를 검수할 수 있나</b></div><p class=\"theory-source\"><a href=\"https://docs.uipath.com/automation-hub/automation-suite/2023.10/user-guide/information-about-the-detailed-assessment-algorithm\" target=\"_blank\" rel=\"noopener\">UiPath 평가 요소를 개인 과제 비교에 적용 / 공식 점수 산식이나 채용 평가표가 아님 ↗</a></p>"
  ],
  "현재 업무 단계 나누기": [
    "research",
    "STRATEGY / WEEK 01",
    "업무를 나누면 AI를 넣을 위치와 남길 책임이 보입니다",
    "<p class=\"strategy-purpose\">“리뷰 분석을 자동화한다”만으로는 무엇을 맡기고 무엇을 확인할지 정할 수 없습니다.</p><div class=\"strategy-chain\"><section><span>01</span><h4>자료 확보</h4><p>ID와 원문을 모으고<br>출처, 빈칸, 중복 확인</p></section><i aria-hidden=\"true\">→</i><section><span>02</span><h4>의미 해석</h4><p>표현이 다른 불편을 읽어<br>분류와 근거 초안 작성</p></section><i aria-hidden=\"true\">→</i><section><span>03</span><h4>주제 선택</h4><p>근거를 검수하고<br>안내 콘텐츠 후보 확정</p></section></div><div class=\"strategy-takeaway\">이번에 바꿀 곳은 가운데 단계입니다. <b>자료 확보와 최종 채택까지 자동화할 이유는 아직 없습니다.</b></div>"
  ],
  "문제와 해결책의 차이": [
    "research",
    "STRATEGY / WEEK 01",
    "챗봇을 만들기 전에, 지금 막힌 결정을 설명합니다",
    "<p class=\"strategy-purpose\">해결책을 먼저 정하면 챗봇이 없어도 되는 문제까지 같은 형태로 만들게 됩니다.</p><div class=\"strategy-compare\"><section><span>해결책부터 정한 문장</span><h4>리뷰 분석 챗봇을 만들겠다</h4><p>누가 왜 필요한지,<br>어떤 결과가 맞는지 알 수 없습니다.</p></section><section><span>업무에서 시작한 문장</span><h4>다음 안내 주제를 고르기 어렵다</h4><p>콘텐츠 담당자가 리뷰의 사용 불편을<br>반복해서 읽고 비교한다는 가설입니다.</p></section></div><div class=\"strategy-takeaway\">확인할 질문: 현재는 어떻게 고르는가, 어디에서 다시 읽는가?<br><b>불편이 확인된 뒤</b> 분류표, 검색 도구, 챗봇 중 알맞은 방식을 고릅니다.</div>"
  ],
  "문제 범위 줄이기": [
    "research",
    "STRATEGY / WEEK 01",
    "첫 실행은 한 번의 입력과 한 가지 결정으로 닫습니다",
    "<p class=\"strategy-purpose\">작게 만든다는 것은 설명을 줄이는 것이 아니라, 성공과 실패를 판단할 경계를 세우는 것입니다.</p><div class=\"strategy-chain\"><section><span>01</span><h4>입력 경계</h4><p>합성 리뷰 3건<br>제품 설명서는 아직 없음</p></section><i aria-hidden=\"true\">→</i><section><span>02</span><h4>처리 경계</h4><p>불편 분류 + 원문 인용<br>애매하면 보류</p></section><i aria-hidden=\"true\">→</i><section><span>03</span><h4>결과 경계</h4><p>안내 주제 후보 1개<br>추가 확인 자료 제시</p></section></div><div class=\"strategy-takeaway\">이번 범위 밖: 실제 사용법 작성, 콘텐츠 게시, 매출 효과 예측.<br>끝났다는 기준: <b>담당자가 근거를 보고 후보를 채택하거나 보류할 수 있다.</b></div>"
  ],
  "사실과 가설 구분": [
    "research",
    "STRATEGY / WEEK 01",
    "어떤 근거가 있는지에 따라 포트폴리오 문장의 강도가 달라집니다",
    "<p class=\"strategy-purpose\">같은 결과표라도 연습을 했다는 증거와 현업 효과를 냈다는 증거는 다릅니다.</p><div class=\"strategy-ledger\"><header><b>근거 단계</b><b>지금 쓸 수 있는 문장</b><b>다음 확인</b></header><section><p>관찰</p><p>합성 R01에 세척 순서를 모른다는 표현이 있다</p><p>실제 리뷰에도 반복되는가</p></section><section><p>문제 가설</p><p>사용 안내 주제를 고르는 데 도움이 될 수 있다</p><p>담당자의 현재 방식과 필요 확인</p></section><section><p>효과 검증</p><p>현재는 문의 감소를 주장할 수 없다</p><p>실제 적용 후 전후 기록 비교</p></section></div><div class=\"strategy-takeaway\">이번 주에는 확인한 사실과 가설을 나누어 씁니다. <b>모르는 것을 표시하는 것도 설계의 정확성입니다.</b></div>"
  ],
  "왜 AI를 선택했나": [
    "research",
    "STRATEGY / WEEK 01",
    "표현은 달라도 같은 불편을 찾아야 할 때 AI를 검토합니다",
    "<p class=\"strategy-purpose\">판단이 모두 고정 규칙으로 적힌다면 시트나 코드가 더 단순할 수 있습니다.</p><div class=\"strategy-compare\"><section><span>키워드 규칙</span><h4>“세척”이라는 단어 찾기</h4><p>“물통은 매번 씻어야 하나요?”는<br>같은 문제지만 단어가 다릅니다.</p></section><section><span>AI 의미 분류</span><h4>관리 방법을 묻는 표현 묶기</h4><p>다양한 표현을 후보로 묶을 수 있지만<br>없는 불만을 덧붙일 수 있어 검수가 필요합니다.</p></section></div><div class=\"strategy-takeaway\">선택 이유: <b>의미 해석은 AI로 보조</b>하고, 원문 인용과 사람 검수로 오분류를 찾습니다.<br>정확한 건수 계산은 규칙으로 처리합니다.</div>"
  ],
  "AI 적용 방식 선택": [
    "research",
    "STRATEGY / WEEK 01",
    "정해진 순서로 끝나는 일은 작업 흐름부터 설계합니다",
    "<p class=\"strategy-purpose\">에이전트가 필요한지는 AI가 실행 중에 다음 행동과 도구를 골라야 하는지로 판단합니다.</p><div class=\"strategy-ledger\"><header><b>방식</b><b>누가 다음 순서를 정하나</b><b>이번 예시에서의 선택</b></header><section><p>대화형 AI 보조</p><p>사람이 자료와 요청을 전달</p><p>한 번 주고받기 (Single-turn)<br>대화 이어가기 (Multi-turn)</p></section><section><p>고정 작업 흐름</p><p>사람이 단계와 분기를 미리 정의</p><p>반복 실행 시 분류 → 검수로 구현</p></section><section><p>에이전트</p><p>AI가 상황에 따라 도구와 다음 행동 선택</p><p>필요성이 생긴 뒤 확장 검토</p></section></div><div class=\"strategy-takeaway\">이번 리뷰 과제는 절차가 정해져 있습니다. <b>복잡한 자율 실행보다 판단 기준을 먼저 검증합니다.</b></div><p class=\"theory-source\"><a href=\"https://www.anthropic.com/engineering/building-effective-agents\" target=\"_blank\" rel=\"noopener\">Anthropic / Building effective agents. 대화는 수업 진행 방식, workflow와 agent는 실행 구조의 구분 ↗</a></p>"
  ],
  "검수와 중단 조건": [
    "research",
    "STRATEGY / WEEK 01",
    "틀린 답과 답하면 안 되는 상황을 실행 전에 정합니다",
    "<p class=\"strategy-purpose\">출력을 본 뒤 마음에 드는 기준을 고르면, 내 방식이 작동하는지 확인할 수 없습니다.</p><div class=\"strategy-ledger\"><header><b>시험 입력</b><b>기대 행동</b><b>왜 필요한가</b></header><section><p>“맛은 괜찮은데 필터를 어떻게 버리죠?”<span class=\"strategy-ai-term\">(의도 분류 / Intent classification)</span></p><p>사용 안내로 분류<br>맛 불만을 추가하지 않음</p><p>긍정과 불편이 섞인 문장 구분</p></section><section><p>원문이 빈 행<span class=\"strategy-ai-term\">(엣지 케이스 / Edge case)</span></p><p>분류하지 않고 보류</p><p>모르는 내용을 채우는지 확인</p></section><section><p>설명서 없이 실제 세척법 요청<span class=\"strategy-ai-term\">(할루시네이션 / Hallucination)</span></p><p>설명서 확인을 요청</p><p>입력 밖의 제품 지식을 단정하지 않기</p></section></div><div class=\"strategy-takeaway\">완료 조건은 “답이 나왔다”가 아니라 <b>근거가 맞고, 부족할 때 멈추는가</b>입니다.</div>"
  ],
  "모델을 고르는 기준": [
    "research",
    "STRATEGY / WEEK 01",
    "모델의 차이는 내 과제의 오류와 검수 시간으로 확인합니다",
    "<p class=\"strategy-purpose\">큰 모델이나 최신 모델이라는 이유만으로 내 작업의 전체 비용이 낮아지지는 않습니다.</p><div class=\"strategy-ledger\"><header><b>비교 조건을 고정</b><b>관찰할 결과</b><b>기록할 것</b></header><section><p>같은 자료 + 같은 지침</p><p>누락, 오분류, 근거 왜곡</p><p>모델명 / 날짜 / 자료 버전</p></section><section><p>같은 완료 기준</p><p>초안 생성 후 고친 항목</p><p>생성 + 검수 + 수정 시간</p></section><section><p>새로운 사례에 적용</p><p>기존 예시 외에도 기준이 유지되는가</p><p>통과한 항목과 실패 이유</p></section></div><div class=\"strategy-takeaway\">이번 주에는 사용 가능한 모델 하나로 시작합니다.<br><b>첨부 자료를 참고하는 것과 모델을 새로 학습시키는 것은 다릅니다.</b></div>"
  ],
  "검증 지표 고르는 법": [
    "research",
    "STRATEGY / WEEK 01",
    "샘플 통과와 현업 성과를 구분해서 기록합니다",
    "<p class=\"strategy-purpose\">한 번 잘 나온 예시는 가능성을 보여주지만, 반복 사용의 신뢰성을 보장하지 않습니다.</p><div class=\"strategy-ledger\"><header><b>확인할 수준</b><b>측정 방법</b><b>말할 수 있는 범위</b></header><section><p>출력 품질</p><p>새 리뷰 2건의 분류와 인용 대조</p><p>두 사례에서 기준을 지켰는가</p></section><section><p>작업 효율</p><p>수작업 vs 준비 + 생성 + 검수 + 수정</p><p>같은 조건에서 걸린 시간</p></section><section><p>업무 효과</p><p>실제 담당자의 채택과 후속 결과 확인</p><p>실제 적용 자료가 있을 때만 효과 주장</p></section></div><div class=\"strategy-takeaway\">R04와 R05는 지침을 만든 후 처음 적용합니다.<br><b>오답을 보고 기준을 고쳤다면, 그 사례는 더 이상 새로운 평가 자료가 아닙니다.</b></div>"
  ],
  "최종 산출물 묶음": [
    "research",
    "STRATEGY / WEEK 01",
    "지침서는 다음 실행에서 내 판단을 재사용하기 위한 문서입니다",
    "<p class=\"strategy-purpose\">채팅에만 남긴 조건은 빠뜨리기 쉽습니다. 확정한 기준을 파일로 관리하면 무엇을 바꿨는지 비교할 수 있습니다.</p><div class=\"strategy-chain\"><section><span>01</span><h4>문제와 근거</h4><p>왜 이 작업인가<br>어떤 자료를 읽을 것인가</p></section><i aria-hidden=\"true\">→</i><section><span>02</span><h4>처리 기준</h4><p>무엇을 AI에 맡기는가<br>어떤 결과를 반환해야 하는가</p></section><i aria-hidden=\"true\">→</i><section><span>03</span><h4>확인 조건</h4><p>무엇이 맞는 결과인가<br>언제 보류할 것인가</p></section></div><div class=\"strategy-takeaway\"><b>1주차: 기준을 MD로 설계 → 2주차: 같은 기준으로 실행 → 3주차: 실패와 개선 확인</b><br>최종 포트폴리오에는 이 선택과 검증을 근거로 설명합니다.</div>"
  ],
  "지침서 작성 양식": [
    "research",
    "STRATEGY / WEEK 01",
    "추상적인 지시를 입력, 기준, 예외가 보이는 문장으로 바꿉니다",
    "<p class=\"strategy-purpose\">다른 사람이 같은 자료로 실행해도 무엇을 확인해야 하는지 알 수 있어야 합니다.</p><div class=\"strategy-ledger\"><header><b>지침서의 위치</b><b>불충분한 문장</b><b>실행 가능한 문장</b></header><section><p>목적과 입력</p><p>리뷰를 잘 분석해줘</p><p>reviews.csv의 ID와 원문에서<br>사용 안내가 필요한 불편을 찾는다.</p></section><section><p>작업과 결과</p><p>알아서 적절히 분류해줘</p><p>사용 순서와 관리 방법은 사용 안내.<br>ID, 분류와 원문 인용을 반환한다.</p></section><section><p>검수와 예외</p><p>틀리지 말고 정확하게</p><p>빈 원문은 보류하고 이유를 적는다.<br>실제 사용법은 설명서 없이는 만들지 않는다.</p></section></div><div class=\"strategy-takeaway\">내 과제도 이 기준으로 문장을 고칩니다. <a href=\"assets/demo/instructions-template.md\" download>MD 양식</a> / <a href=\"assets/demo/instructions-example.md\" download>전체 완성 예시</a></div>"
  ],
  "포트폴리오 서술 완성 예시": [
    "research",
    "STRATEGY / WEEK 01",
    "방금 고친 판단을 지침서의 규칙으로 남깁니다",
    "<p class=\"strategy-purpose\">오류를 그때그때 고치는 데서 끝내지 않고, 다음 실행이 따라야 할 기준으로 바꿉니다.</p><div class=\"strategy-ledger\"><header><b>시연에서 내린 판단</b><b>지침서에 넣을 위치</b><b>확정할 문장</b></header><section><p>R03은 배송 지연이 아닌 안내 부재</p><p>4. 역할과 판단 기준</p><p>배송 일정 정보에 관한 불편은 배송 안내로 분류한다. 지연 여부는 추정하지 않는다.</p></section><section><p>원문이 없으면 의미를 알 수 없음</p><p>6. 검수와 중단 조건</p><p>원문이 빈 행은 분류하지 않고 보류 이유를 기록한다.</p></section><section><p>주제는 골라도 실제 사용법은 모름</p><p>5. 출력 형식</p><p>후보와 근거 ID, 추가 확인 자료를 반환한다. 설명서 없이 사용법을 생성하지 않는다.</p></section></div><div class=\"strategy-takeaway\">이 문장을 고친 이유까지 남기면 <b>AI가 만든 초안과 내가 설계한 기준</b>을 구분할 수 있습니다.</div>"
  ],
  "새 자료에 기준 적용": [
    "research",
    "STRATEGY / WEEK 01",
    "같은 기준을 새 문장에도 적용할 수 있어야 합니다",
    "<p class=\"strategy-purpose\">시연을 이해했는지 확인하려면, 보았던 답을 기억하는 대신 새 원문에서 근거를 찾아야 합니다.</p><div class=\"strategy-compare\"><section><span>R04 / 합성 리뷰</span><h4>“사용 후 어느 부분까지 분리해서<br>닦아도 되는지 궁금해요.”</h4><p>먼저 직접 적기<br>분류 1개 + 원문 근거 1개</p></section><section><span>R05 / 합성 리뷰</span><h4>“도착 전에 일정 안내를<br>받을 수 있으면 좋겠어요.”</h4><p>조건을 바꿔 생각하기<br>원문이 빈칸이면 어떻게 할까요?</p></section></div><div class=\"strategy-takeaway\">2분 개인 메모: 분류와 근거를 적고, <b>빈 원문은 보류한다</b>는 규칙을 MD에 넣습니다.<br>빠르게 끝났다면: 두 불편이 한 문장에 섞일 때의 처리 기준도 정해봅니다.</div>"
  ],
  "과제 코치로 시작": [
    "research",
    "STRATEGY / WEEK 01",
    "코치의 초안을 받되, 선택과 기준은 내가 확정합니다",
    "<p class=\"strategy-purpose\">시작 전에 희망 산업과 직무, 문제 후보 한 줄을 준비합니다. 대화는 내 판단을 구체화하는 데 씁니다.</p><div class=\"strategy-chain\"><section><span>01</span><h4>처음 5분 / 문제</h4><p>누구의 어떤 작업인가?<br>문제 한 문장 + 근거 또는 가설 표시</p></section><i aria-hidden=\"true\">→</i><section><span>02</span><h4>다음 5분 / 선택</h4><p>왜 이 후보를 남겼나?<br>제외한 후보 1개 + 이유</p></section><i aria-hidden=\"true\">→</i><section><span>03</span><h4>마지막 5분 / 기준</h4><p>무엇이 맞는 결과인가?<br>정상 1건 + 보류 1건의 기대 결과</p></section></div><div class=\"strategy-takeaway\">막히면 제공된 리뷰 예시의 목적과 검수 문장부터 고칩니다.<br><a href=\"assets/demo/과제 코치.md\" download>과제 코치.md</a> / <a href=\"workbook.html\" target=\"_blank\">작성 워크북</a> / 더 할 수 있다면 새 예외를 추가하고 수정 이유를 남깁니다.</div>"
  ],
  "HTML 제출 전 점검": [
    "research",
    "STRATEGY / WEEK 01",
    "문제, 선택 이유, 확인 방법이 내 문장으로 설명되어야 합니다",
    "<p class=\"strategy-purpose\">파일이 열리는지만 확인하지 말고, 다른 사람이 지침을 읽고 같은 작업을 시작할 수 있는지 봅니다.</p><div class=\"strategy-ledger\"><header><b>내용 점검</b><b>충분한 상태</b><b>부족하면 고칠 것</b></header><section><p>직무에 맞는 문제인가</p><p>대상 업무와 근거 또는 가설이 있다</p><p>“AI 앱 만들기”를 구체적인 업무 장면으로</p></section><section><p>AI를 쓰는 이유가 있는가</p><p>비교한 대안과 맡긴 단계가 있다</p><p>“편해서”를 표현 해석 등 필요한 기능으로</p></section><section><p>결과를 확인할 수 있는가</p><p>출력 칸과 정상, 보류 조건이 있다</p><p>“정확하게”를 원문 대조와 기대 결과로</p></section></div><div class=\"strategy-takeaway\">같은 내용의 MD와 HTML을 저장하고 <a href=\"workbook.html#submit-title\">워크북 제출 안내</a>에 따라 공유합니다.<br><b>다음 주에는 이 기준으로 실행하고, 예상과 달랐던 부분을 고칩니다.</b></div>"
  ]
};
scenes['오프닝']=['cover','ZEROBASE / AI PORTFOLIO / WEEK 01','희망 직무에서 보여줄<br>AI 프로젝트 설계하기',`<div class="strategy-opening"><section><span>4주 과정의 시작</span><p>업무 문제를 찾고, AI로 실행하고,<br>검증한 과정을 포트폴리오로 정리합니다.</p><div class="opening-output"><small>오늘의 도착점</small><strong>AI 작업 지침서.md</strong><p>다음 주 실행에 사용할 기준을 정하고<br>같은 내용의 HTML로 제출합니다.</p></div><small>이유진 / YUJIN FLOW</small></section><ol><li><b>보여줄 업무 역량</b><span>누구의 어떤 문제를 고를까</span></li><li><b>해결할 방식</b><span>자료와 AI의 역할을 어떻게 정할까</span></li><li><b>확인할 증거</b><span>무엇이 맞는 결과인지 어떻게 알까</span></li></ol></div>`];
const purposes = {"마케팅 JD 원문": "공고의 AI라는 단어만 떼지 않고, 함께 적힌 담당 업무에서 보여줄 행동을 찾습니다.", "문제를 데이터 열로 바꾸기": "원문과 결과를 다시 연결할 수 있어야 오분류를 찾아 고칠 수 있습니다.", "강사 시연 시작": "앞에서 정한 기준을 실제 응답에 적용합니다. 관찰할 것은 답변의 유창함보다 근거, 오류와 수정 이유입니다."};
scenes['AI를 잘 쓰는 사람들']=['research','01 / AI를 쓰는 태도','AI를 잘 쓰는 사람들',`
<div class="people-gallery">
 <a href="https://www.youtube.com/watch?v=vq5WhoPCWQ8" target="_blank" rel="noopener"><img src="assets/people/gabriel.jpg" alt="가브리엘 페테르손 인터뷰 썸네일"><h4>가브리엘 페테르손 ↗</h4><small>OpenAI 연구원</small><p>문제에서 시작해<br>이해될 때까지 되묻기</p></a>
 <a href="https://www.youtube.com/watch?v=jHbNYb6Eg_s" target="_blank" rel="noopener"><img src="assets/people/park.jpg" alt="박현우 교수 인터뷰 썸네일"><h4>박현우 ↗</h4><small>서울대 교수</small><p>아는 것을 확인하고<br>결과를 검증하기</p></a>
 <a href="https://www.youtube.com/watch?v=XwjfzwR4XO0" target="_blank" rel="noopener"><img src="assets/people/drew.jpg" alt="드류 벤트 인터뷰 썸네일"><h4>드류 벤트 ↗</h4><small>앤트로픽 교육 총괄</small><p>답을 얻는 데서<br>이해하는 데로 나아가기</p></a>
 <a href="https://github.com/torvalds/linux/commit/818bebeb63dd6bf5f4e07e145f6cdbace520a34c" target="_blank" rel="noopener"><img src="assets/people/linus-commit.png" alt="리누스 토발즈의 Linux 커밋 818bebe 기록"><h4>리누스 토발즈 ↗</h4><small>리눅스 창시자</small><p>막힌 이유를 추적하며<br>검증과 수정 계속하기</p></a>
</div><p class="people-note">인터뷰와 커밋 기록의 수업용 요약 / 직함은 영상 소개 기준 / 이미지를 누르면 원문으로 이동합니다.</p>`];
scenes['현업의 AI 활용상황']=['research','01 / AI AT WORK','현업에서는 업무의 한 단계를 AI에 맡깁니다',`
<div class="workplace-cases">
 <section><div class="case-identity"><small>서비스 운영 / 배달의민족</small><h4>메뉴 이미지 검수</h4><p>많은 이미지의 반려 여부를<br>공통 정책에 맞춰 판단하는 일</p></div><div class="case-route"><div><span>입력</span><b>메뉴 사진 + 반려 기준</b></div><i>↓</i><div><span>AI가 맡은 일</span><b>해당 정책과 판단 이유 반환</b></div><i>↓</i><div><span>사람이 확인</span><b>오검수와 어려운 정책 검토</b></div></div></section>
 <section><div class="case-identity"><small>소비재 마케팅 / Reckitt</small><h4>소비자 정보 분석</h4><p>비정형 자료에서 소비자 반응을<br>읽고 마케팅 아이디어로 잇는 일</p></div><div class="case-route"><div><span>입력</span><b>소비자 관련 자료</b></div><i>↓</i><div><span>AI가 맡은 일</span><b>패턴과 인사이트 도출 지원</b></div><i>↓</i><div><span>사람이 확인</span><b>마케터가 해석하고 활용</b></div></div></section>
</div><p class="case-lesson">우리도 <b>자료 → AI가 맡을 작업 → 사람이 확인할 기준</b>을 정합니다.</p>
<p class="case-sources"><a href="https://techblog.woowahan.com/20408/" target="_blank" rel="noopener">우아한형제들 기술블로그 / 2024.12.19 ↗</a><a href="https://www.microsoft.com/en/customers/story/23761-reckitt-power-bi" target="_blank" rel="noopener">Microsoft 고객 사례 / 2025.06.26 ↗</a><span>기업이 공개한 사례의 흐름을 수업용으로 재구성했습니다.</span></p>`];
scenes['시연 실행 요청']=['research','LIVE DEMO / PROMPT','첫 요청은 맥락, 목표, 출력 형식으로 씁니다',`
<div class="request-triptych"><section><span>01</span><h4>맥락</h4><p>누구의 결정에 쓸 자료인가</p><div>소형가전 콘텐츠 담당자가<br>다음 사용 안내 주제를 고릅니다.<br>합성 리뷰 R01~R03을 읽어주세요.</div></section><section><span>02</span><h4>목표</h4><p>할 일과 지켜야 할 조건</p><div>사용 안내 / 배송 안내 / 기타로<br>분류하세요. 원문 밖의 원인을<br>추정하지 말고, 빈칸은 보류하세요.</div></section><section><span>03</span><h4>출력 형식</h4><p>다음 업무에 바로 쓸 모양</p><div>ID / 분류 / 원문 근거 /<br>보류 이유를 표로 정리하세요.<br>안내 주제 후보 1개를 제안하세요.</div></section></div>
<div class="request-role"><b>역할은 관점을 정할 때</b><p>“콘텐츠 담당자가 주제를 고를 수 있게”처럼 씁니다.<br>“너는 전문가야”만으로 자료와 검수 기준을 대신할 수는 없습니다.</p></div>
<p class="case-sources"><a href="assets/demo/리뷰 분류 시연 요청.md" download>실행 요청 전문 내려받기 ↗</a><span>Claude에 요청문을 넣고 실행합니다. 모델명과 실행 날짜를 기록합니다.</span></p>`];
scenes['시연 수정 요청']=['research','LIVE DEMO / FOLLOW-UP','다음 요청에는 고칠 항목과 근거를 넣습니다',`
<div class="followup-rows"><header><b>이럴 때</b><b>이렇게 이어서 요청</b></header><section><div><small>정보가 부족할 때 / 인터뷰</small><h4>먼저 물어보게 하기</h4></div><p>“주제를 고르기 전에 필요한 정보가 있으면<br>추측하지 말고 나에게 질문해 줘.”</p></section><section><div><small>기준이 모호할 때 / 요청 다듬기</small><h4>모호한 조건 구체화</h4></div><p>“‘잘 분류해’라는 요청을 고쳐 줘.<br>분류 기준과 보류 조건을 구분해서 써 줘.”</p></section><section><div><small>결과를 받았을 때 / 원문 대조</small><h4>오류의 근거 짚기</h4></div><p>“R03에는 배송 지연의 근거가 없어.<br>예정일 안내 부재로 수정하고 이유를 남겨 줘.”</p></section></div>
<div class="case-lesson">시연: R02와 R03을 대조한 뒤 수정 요청을 보냅니다.<br><b>실제 출력에 오류가 없다면 억지로 바꾸지 않습니다.</b></div><p class="case-sources"><a href="assets/demo/리뷰 분류 수정 요청.md" download>수정 요청 전문 내려받기 ↗</a><span>후속 대화로 고친 기준은 마지막에 지침서 MD에 반영합니다.</span></p>`];
/* Service strategy: target decision, first capability and measurable use. */
Object.assign(scenes,{
  "오프닝": [
    "cover",
    "ZEROBASE / AI PORTFOLIO / WEEK 01",
    "기업이 원하는 역량을<br>AI 프로젝트로 증명하는 법",
    "<div class=\"strategy-opening\"><section><span>오늘의 핵심</span><p>희망 직무의 일을 이해하고,<br>쓸모 있는 서비스를 설계하는 경험.</p><div class=\"opening-output\"><small>오늘 남길 실행 계획</small><strong>AI 작업 지침서.md</strong><p>서비스의 목적과 기능, 검증 기준을 적고<br>같은 내용의 HTML로 제출합니다.</p></div><small>이유진 / YUJIN FLOW</small></section><ol><li><b>문제 선정</b><span>지원 직무에서 중요한 문제를 고른다</span></li><li><b>전략 설계</b><span>사용자와 목표에 맞게 기능을 선택한다</span></li><li><b>성과 검증</b><span>작동 여부와 실제 쓰임을 확인한다</span></li></ol></div>"
  ],
  "프로젝트에서 지원서까지": [
    "research",
    "STRATEGY / CAREER EVIDENCE",
    "내 판단을 보여주는 세 단계",
    "<svg class=\"career-judgment-map\" viewBox=\"0 0 1152 336\" role=\"img\" aria-labelledby=\"judgment-map-title judgment-map-desc\" xmlns=\"http://www.w3.org/2000/svg\">\n<title id=\"judgment-map-title\">문제 선정에서 전략 설계, 성과 검증으로 이어지는 세 단계</title>\n<desc id=\"judgment-map-desc\">1. 문제 선정: 무엇을 개선할까? 문제의 근거를 남긴다. 2. 전략 설계: 어떤 방식을 쓸까? 선택한 이유를 남긴다. 3. 성과 검증: 무엇으로 확인할까? 결과와 수정 기록을 남긴다.</desc>\n<defs><marker id=\"judgment-arrow\" markerWidth=\"8\" markerHeight=\"8\" refX=\"8\" refY=\"4\" orient=\"auto\"><path d=\"M0 0L8 4L0 8\" fill=\"none\" stroke=\"#bea3d5\" stroke-width=\"1.6\"/></marker></defs>\n<g fill=\"none\" stroke=\"#bea3d5\" stroke-width=\"2.4\" marker-end=\"url(#judgment-arrow)\"><path d=\"M252 104H492\"/><path d=\"M652 104H892\"/></g>\n<g fill=\"#ede5f8\"><circle cx=\"176\" cy=\"104\" r=\"56\"/><circle cx=\"576\" cy=\"104\" r=\"56\"/><circle cx=\"976\" cy=\"104\" r=\"56\"/></g>\n<g fill=\"#736c7e\" font-size=\"16\" text-anchor=\"middle\"><text x=\"176\" y=\"24\">01</text><text x=\"576\" y=\"24\">02</text><text x=\"976\" y=\"24\">03</text></g>\n<g transform=\"translate(144 72)\" fill=\"none\" stroke=\"#7048b5\" stroke-width=\"2.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"8\" y=\"4\" width=\"36\" height=\"48\" rx=\"4\"/><path d=\"M16 16H36 M16 24H28\"/><circle cx=\"40\" cy=\"40\" r=\"12\" fill=\"#ede5f8\"/><path d=\"M48 48L60 60\"/></g>\n<g transform=\"translate(544 72)\" fill=\"none\" stroke=\"#7048b5\" stroke-width=\"2.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"0\" y=\"20\" width=\"16\" height=\"24\" rx=\"4\"/><path d=\"M16 32H32 M32 12V52 M32 12H48 M32 52H48\"/><rect x=\"48\" y=\"4\" width=\"16\" height=\"16\" rx=\"4\" fill=\"#7048b5\"/><rect x=\"48\" y=\"44\" width=\"16\" height=\"16\" rx=\"4\"/><path d=\"M52 12L56 16L60 8\" stroke=\"#fff\" stroke-width=\"2\"/></g>\n<g transform=\"translate(944 72)\" fill=\"none\" stroke=\"#7048b5\" stroke-width=\"2.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"12\" y=\"8\" width=\"40\" height=\"52\" rx=\"4\"/><rect x=\"24\" y=\"4\" width=\"16\" height=\"8\" rx=\"4\" fill=\"#ede5f8\"/><path d=\"M24 32L32 40L44 24 M24 48H40\"/></g>\n<g text-anchor=\"middle\" font-family=\"inherit\"><g font-size=\"32\" font-weight=\"700\" fill=\"#25212d\"><text x=\"176\" y=\"216\">문제 선정</text><text x=\"576\" y=\"216\">전략 설계</text><text x=\"976\" y=\"216\">성과 검증</text></g><g font-size=\"24\" fill=\"#63596d\"><text x=\"176\" y=\"260\">무엇을 개선할까?</text><text x=\"576\" y=\"260\">어떤 방식을 쓸까?</text><text x=\"976\" y=\"260\">무엇으로 확인할까?</text></g><g font-size=\"20\" fill=\"#7048b5\"><text x=\"176\" y=\"308\">남길 것: 문제의 근거</text><text x=\"576\" y=\"308\">남길 것: 선택한 이유</text><text x=\"976\" y=\"308\">남길 것: 결과와 수정 기록</text></g></g>\n</svg><div class=\"strategy-takeaway\"><b>이번 주: 판단 기준을 MD에 정리</b> / 이후: 실행하고 검증</div>"
  ],
  "테크블로그에서 업무 찾기": [
    "research",
    "CASE / AI SOLVED A WORK PROBLEM",
    "배민은 GPT로 메뉴 이미지 검수 대기를 줄였습니다",
    "<div class=\"ai-case-detail\"><div class=\"ai-case-reading\"><section><span>01 / 기존 문제</span><h4>운영자가 대량의 사진을 직접 검수</h4><p>하루 최소 1만 건의 요청.<br>검수 대기와 잦은 정책 변경에 대응해야 했습니다.</p></section><section><span>02 / AI 설계</span><h4>사진 + 반려 기준 → 정책 번호와 이유</h4><p>GPT의 판단을 정해진 형식으로 받아<br>서비스에서 결과와 반려 사유를 처리합니다.</p></section><section><span>03 / 예외와 평가</span><h4>정책별 오검수 확인 + 운영자 분기</h4><p>프롬프트 변경을 기록하며 오검수를 확인.<br>처리하기 어려운 정책은 사람이 검수합니다.</p></section></div><figure><img src=\"assets/research/baemin-ai-output.png\" alt=\"우아한형제들 기술블로그의 GPT 검수 응답 예시. 복숭아 사진에 정책 번호 8과 판단 이유를 반환한다.\"><figcaption>공식 글에 실린 GPT 응답 예시 / 정책 번호와 이유</figcaption><div class=\"ai-case-insight\"><b>서비스로 연결된 결과</b><p>반려 이유를 보고 사진을 수정해 다시 등록.<br>운영자는 어려운 항목을 이어서 확인합니다.</p></div></figure></div><p class=\"case-sources\"><a href=\"https://techblog.woowahan.com/20408/\" target=\"_blank\" rel=\"noopener\">우아한형제들 / 프롬프트 엔지니어링으로 메뉴 이미지 품질 검수하기 / 2024.12.19 ↗</a><span>기업이 공개한 도입 사례. 이미지 원본: 위 기술블로그.</span></p>"
  ],
  "테크블로그를 내 과제로": [
    "research",
    "CASE / TRANSFER THE DESIGN",
    "기업 사례에서 가져올 것은 AI를 업무에 넣는 설계입니다",
    "<div class=\"transfer-design\"><header><b>배민의 이미지 검수</b><b>내 리뷰 기반 콘텐츠 과제 / 설계 제안</b></header><section><div><span>판단 기준</span><p>메뉴 이미지의 반려 정책</p></div><i>→</i><div><span>내가 정할 기준</span><p>사용 안내 / 배송 안내 / 보류의 정의</p></div></section><section><div><span>결과의 쓰임</span><p>사유를 보고 수정할 사진의 문제를 확인</p></div><i>→</i><div><span>내 결과의 쓰임</span><p>원문 근거를 보고 안내 주제를 채택 또는 보류</p></div></section><section><div><span>예외 처리</span><p>AI가 처리하기 어려운 정책은 운영자 검수</p></div><i>→</i><div><span>내 예외 처리</span><p>빈 원문과 근거 부족은 보류하고 자료 요청</p></div></section></div><div class=\"strategy-takeaway\">내 과제의 입력, 출력, 예외를 먼저 적습니다.<br><b>기업의 실제 구현과 성과는 출처로, 내 설계와 미확인 효과는 제안으로 구분합니다.</b></div>"
  ],
  "자동화 후보 평가 프레임": [
    "research",
    "STRATEGY / CHOOSE AN APPROACH",
    "해결책을 비교하면 선택 이유가 분명해집니다",
    "<p class=\"strategy-purpose\">같은 목표: 콘텐츠 담당자가 리뷰 근거로 다음 안내 주제를 결정하도록 돕기.</p><div class=\"strategy-ledger\"><header><b>해결 방식</b><b>목표에 필요한 기능</b><b>이번 선택과 이유</b></header><section><p>키워드 집계표</p><p>많이 나온 단어와 건수</p><p>보조 기능으로 사용<br>표현이 다른 불편의 의미 해석 필요</p></section><section><p>AI 분류 + 근거 검토표</p><p>불편의 의미, 원문 근거,<br>담당자의 선택 기록</p><p>첫 버전으로 선택<br>자료를 구하고 원문으로 검수 가능</p></section><section><p>콘텐츠 자동 생성과 게시</p><p>제품 설명서, 브랜드 기준,<br>게시 권한과 운영 점검</p><p>후속 범위로 보류<br>주제 판단을 먼저 확인</p></section></div><div class=\"strategy-takeaway\">선택 기준: <b>업무 효과 / 자료와 검수 가능성 / 실제 사용자의 필요</b><br>과제에 사용할 자료와 기준이 없으면 범위를 더 줄입니다.</div><p class=\"case-sources\"><a href=\"https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/business-strategy-plan\" target=\"_blank\" rel=\"noopener\">Microsoft 사용 사례 평가 ↗</a><a href=\"https://docs.uipath.com/automation-hub/automation-suite/2023.10/user-guide/information-about-the-detailed-assessment-algorithm\" target=\"_blank\" rel=\"noopener\">UiPath 자동화 평가 ↗</a><span>두 자료의 관점을 수업용 해결 방식 비교에 적용했습니다.</span></p>"
  ],
  "문제와 해결책의 차이": [
    "research",
    "STRATEGY / SERVICE PURPOSE",
    "사용자와 목표를 정하면 해결할 문제가 선명해집니다",
    "<div class=\"service-purpose\"><section><span>01 / 서비스 목표</span><h4>초보 구매자가 관리 방법을<br>쉽게 찾도록 돕는다</h4><p>최종 수혜자: 소형가전 구매자<br>우리 서비스의 사용자: 콘텐츠 담당자</p></section><i>↓</i><section><span>02 / 사용 장면과 문제</span><h4>다음 안내 주제를 정할 때,<br>리뷰의 불편을 다시 읽고 비교한다</h4><p>확인할 가설: 반복해서 읽는 시간과<br>불편을 놓치는 원인이 무엇인가?</p></section><i>↓</i><section><span>03 / 바꿀 결정</span><h4>근거를 보고 안내 주제를<br>채택하거나 보류하게 한다</h4><p>AI는 분류와 인용을 제안.<br>담당자는 주제와 추가 확인 자료를 결정.</p></section></div><p class=\"service-value\">한 문장 가치 제안<br><b>“콘텐츠 담당자가 리뷰 근거를 보고 다음 안내 주제를 결정하도록 돕는다.”</b></p><p class=\"case-sources\"><a href=\"https://www.gov.uk/service-manual/measuring-success/how-to-set-performance-metrics-for-your-service\" target=\"_blank\" rel=\"noopener\">GOV.UK / 서비스 목적 → 사용자 이점 → 가설과 측정 ↗</a><span>소형가전 예시는 수업용 서비스 설계 가설입니다.</span></p>"
  ],
  "문제 범위 줄이기": [
    "research",
    "STRATEGY / FIRST VERSION",
    "첫 버전은 사용자의 결정에 필요한 기능부터 만듭니다",
    "<p class=\"strategy-purpose\">사용 완료: 담당자가 안내 후보 하나의 채택 또는 보류 이유와 다음 확인 자료를 기록한다.</p><div class=\"feature-scope\"><header><b>먼저 필요한 기능</b><b>사용자가 얻는 것</b><b>이 기능을 남긴 이유</b></header><section><b>원문과 근거를 함께 보기</b><p>ID와 원문 인용을 대조</p><p>추정한 불편과 오분류를 발견할 수 있음</p></section><section><b>분류를 고치고 이유 남기기</b><p>수정한 기준을 다음 실행에 재사용</p><p>AI 초안과 나의 판단을 구분할 수 있음</p></section><section><b>후보 채택 또는 보류 기록</b><p>주제, 이유, 필요한 자료를 정리</p><p>표의 결과가 다음 업무로 이어짐</p></section></div><div class=\"scope-later\"><span>후속 확장</span><p>실제 사용법 작성은 제품 설명서를 확보한 뒤 검토합니다.<br>콘텐츠 게시와 성과 추적은 첫 주제 판단을 확인한 뒤 연결합니다.</p></div><p class=\"case-sources\"><span>1주차는 이 기능과 처리 기준을 MD로 설계합니다. 2주차에 작은 실행으로 확인합니다.</span></p>"
  ],
  "프로젝트 처리 흐름": [
    "research",
    "SERVICE DESIGN / USER AND AI",
    "자료를 넣고, 근거를 확인하고, 다음 행동을 결정합니다",
    "<p class=\"service-design-caption\">리뷰 기반 안내 주제 검토 도구 / 3주차 MVP 구현을 위한 설계 예시</p><div class=\"service-screen-flow\"><section><div class=\"service-step\"><span>01</span><h4>자료 넣기</h4></div><div class=\"service-wire\"><small>입력 확인</small><strong>reviews.csv / 3건</strong><p>ID와 원문을 확인합니다.</p><div class=\"wire-line\">빈칸 또는 중복 → 보류</div></div><p class=\"service-owner\"><b>규칙</b>필수 값, 중복과 누락 검사</p></section><i class=\"service-flow-arrow\">→</i><section><div class=\"service-step\"><span>02</span><h4>근거 검수</h4></div><div class=\"service-wire\"><small>AI 초안과 원문 대조</small><strong>R01 / 사용 안내</strong><p>“세척 순서를 몰라”</p><div class=\"wire-line\">분류 확인 또는 수정 이유 기록</div></div><p class=\"service-owner\"><b>AI + 사람</b>분류 제안 → 원문 대조</p></section><i class=\"service-flow-arrow\">→</i><section><div class=\"service-step\"><span>03</span><h4>주제 결정</h4></div><div class=\"service-wire\"><small>담당자의 판단 기록</small><strong>첫 사용자 관리 안내</strong><p>근거 R01, R02 / 설명서 확인 필요</p><div class=\"wire-line\">채택 또는 보류 / 이유 저장</div></div><p class=\"service-owner\"><b>사람</b>선택 이유와 후속 자료 확정</p></section></div><div class=\"service-exception\"><span>예외 경로</span><p>빈 원문이나 근거 부족 <i>→</i> 보류 목록과 이유 <i>→</i> 자료를 보완한 뒤 다시 검토</p></div><p class=\"case-sources\"><span>화면은 기능을 설명하는 도식입니다. 1주차 제출 HTML은 같은 설계를 보여주는 문서입니다.</span></p>"
  ],
  "검증 지표 고르는 법": [
    "research",
    "STRATEGY / SUCCESS METRICS",
    "품질, 작업 시간, 실제 사용을 따로 확인합니다",
    "<div class=\"service-metrics\"><section><span>01 / 품질</span><h4>근거를 믿고<br>결정할 수 있는가</h4><p>인용 일치, 오분류와 누락을<br>확인한 건수와 함께 기록합니다.</p><div><b>첫 통과 조건</b><p>검수 대상의 인용은 원문과 일치.<br>빈 원문은 보류하고 이유 표시.</p></div></section><section><span>02 / 작업 시간</span><h4>검수까지 포함해<br>일이 빨라졌는가</h4><p>자료 준비 + 생성 + 검수 + 수정<br>전체 시간을 수작업과 비교합니다.</p><div><b>비교 조건</b><p>비슷한 난이도와 수량의 자료.<br>기존 시간부터 기록하고 목표 설정.</p></div></section><section><span>03 / 실제 사용</span><h4>결과가 다음<br>업무로 이어졌는가</h4><p>대상 담당자가 주제 채택 또는<br>보류의 이유를 남기는지 봅니다.</p><div><b>사용 완료 조건</b><p>후보 하나, 판단 이유,<br>추가 확인 자료가 기록됨.</p></div></section></div><div class=\"strategy-takeaway\">기록에 따라 <b>유지할 기능, 고칠 기준, 다음 범위</b>를 결정합니다.<br>샘플 2건의 통과 범위를 밝히고, 고객 문의 감소는 실제 콘텐츠 적용 후 따로 측정합니다.</div><p class=\"case-sources\"><a href=\"https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/business-strategy-plan\" target=\"_blank\" rel=\"noopener\">Microsoft / 기준선과 성공 지표 ↗</a><a href=\"https://www.gov.uk/service-manual/measuring-success/how-to-set-performance-metrics-for-your-service\" target=\"_blank\" rel=\"noopener\">GOV.UK / 가설에 맞는 서비스 측정 ↗</a><span>지표와 통과 조건은 수업용 설계 제안이며 측정된 성과가 아닙니다.</span></p>"
  ],
  "최종 산출물 묶음": [
    "research",
    "STRATEGY / ONE INSTRUCTION DOCUMENT",
    "설계한 서비스의 목적과 기준을 지침서에 남깁니다",
    "<div class=\"strategy-chain\"><section><span>01 / 왜 만드는가</span><h4>목표와 사용자</h4><p>누가 언제 쓰는가<br>어떤 결정이 나아져야 하는가<br>문제의 근거는 무엇인가</p></section><i aria-hidden=\"true\">→</i><section><span>02 / 어떻게 작동하나</span><h4>기능과 역할</h4><p>첫 기능과 보류할 기능<br>자료 → AI 처리 → 사람 검수<br>결과를 보고 할 다음 행동</p></section><i aria-hidden=\"true\">→</i><section><span>03 / 무엇으로 확인하나</span><h4>검증과 다음 선택</h4><p>정상과 예외의 기대 결과<br>품질, 시간과 실제 사용<br>유지하거나 바꿀 조건</p></section></div><div class=\"strategy-takeaway\">1주차의 <b>AI 작업 지침서.md</b>에 이 세 결정을 적고 같은 내용의 HTML을 제출합니다.<br>이후 실행 결과와 수정 이유를 붙이면 포트폴리오의 설계 근거가 됩니다.</div>"
  ],
  "과제 코치로 시작": [
    "research",
    "PRACTICE / MY SERVICE STRATEGY",
    "코치와 대화하며 내 서비스의 세 결정을 확정합니다",
    "<div class=\"strategy-chain\"><section><span>처음 5분 / 문제 선정</span><h4>누구의 어떤 결정인가</h4><p>희망 산업과 직무<br>사용 장면과 문제 근거<br>바뀌어야 할 결정 한 가지</p></section><i aria-hidden=\"true\">→</i><section><span>다음 5분 / 전략 설계</span><h4>왜 이 기능인가</h4><p>비교한 해결 방식과 선택 이유<br>첫 기능과 보류할 기능<br>AI와 사람이 맡을 단계</p></section><i aria-hidden=\"true\">→</i><section><span>마지막 5분 / 성과 검증</span><h4>무엇이면 충분한가</h4><p>정상 1건과 보류 1건<br>결과의 품질과 실제 쓰임<br>지침서 MD 초안 받기</p></section></div><div class=\"strategy-takeaway\">첫 요청: “내 희망 직무는 __이고, __의 결정을 돕는 과제를 설계하고 싶어.”<br><a href=\"assets/demo/과제 코치.md\" download>과제 코치.md</a> / <a href=\"workbook.html\" target=\"_blank\" rel=\"noopener\">작성 워크북</a> / 모르는 근거와 수치는 확인 필요로 남깁니다.</div>"
  ]
});
const base=window.prepareMarketSlides;
window.prepareMarketSlides=()=>{
 base();Object.assign(window.THEORY_SCENES,scenes);
 for(const [key,value] of Object.entries(purposes))window.THEORY_SCENES[key][3]='<p class="strategy-purpose">'+value+'</p>'+window.THEORY_SCENES[key][3];
 const stage=document.querySelector('.stage');
 const workplace=[...stage.children].find(s=>s.dataset.title==='기업의 채용 변화');
 if(workplace)workplace.dataset.title='현업의 AI 활용상황';
 const techcase=[...stage.children].find(s=>s.dataset.title==='테크블로그에서 업무 찾기');
 if(techcase){techcase.dataset.title='AI로 해결한 현업 사례';window.THEORY_SCENES['AI로 해결한 현업 사례']=scenes['테크블로그에서 업무 찾기'];}
 const omit=[...stage.children].find(s=>s.dataset.title==='산업 조사에서 볼 자료');if(omit)omit.remove();
 const insert=(title,after)=>{const s=document.createElement('article');s.className='slide';s.dataset.title=title;[...stage.children].find(s=>s.dataset.title===after).after(s);};
 // The course opening and Week 1 goals share the first slide.
 insert('새 자료에 기준 적용','시연 수정 결과');
 insert('AI를 잘 쓰는 사람들','기업이 AI 인재를 찾는 이유');
 // Distinguish the data-handling detour from the review case that spans the lesson.
 window.THEORY_SCENES['실제 데이터 가져오기'][1]='TRANSFER / PUBLIC DATA / 5 MINUTES';
 window.THEORY_SCENES['실제 데이터 가져오기'][3]=window.THEORY_SCENES['실제 데이터 가져오기'][3].replace('필요한 자료를 직접 고르는 시연입니다. 이 통계만으로 특정 기업의 문제나 전력 수요 변화의 원인을 단정하지 않습니다.','자료 확보 방법의 별도 시연입니다. 출처, 필요한 행과 열, 단위를 확인한 뒤 리뷰 사례로 돌아갑니다. 이 통계로 기업 문제나 변화 원인을 단정하지 않습니다.');
};
})();
