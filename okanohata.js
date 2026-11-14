/* おかのはた 試作 B「店先」全体：yasai.js に足す小さな動き
   2026-11-09 mashuさん「左の早割の帯・右下の卸の札は残したい」
   ・左の帯（早割）はトップの画面でもずっと出す（前は値札と同じ言葉なので隠していた）
   ・右下の卸の札は最初から出す。卸の帯・最後の帯・フッターが見えているあいだだけ隠す（同じボタンが並ぶため）
   ・フッターの色の見比べ：URL に ?footer=b（焦げ茶）／?footer=c（生成り）を付けると切り替わる。何も付けなければ A（赤土） */
(function () {
  // フッターの色の案
  // 2026-11-14 C 生成りに決定（mashuさん）。?footer=a（赤土）／?footer=b（焦げ茶）で前の案も見られる
  var m = location.search.match(/[?&]footer=([abc])/);
  var f = m ? m[1] : 'c';
  if (f !== 'a') document.body.classList.add('footer-' + f);

  // 卸の帯・最後の帯・フッターが画面に入っているかを見て、body に at-end を付け外しする
  // スマホはトップのボタン（飲食店・お店の方へ）と札が重なるので、トップのボタンが見えているあいだも隠す
  var sel = '.cta,.site-footer,.ws' + (window.matchMedia('(max-width:760px)').matches ? ',.hero--shop .hero-btns' : '');
  var ends = [].slice.call(document.querySelectorAll(sel));
  if (!ends.length || !('IntersectionObserver' in window)) return;
  var seen = new Set();
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) seen.add(e.target); else seen.delete(e.target); });
    document.body.classList.toggle('at-end', seen.size > 0);
  });
  ends.forEach(function (el) { io.observe(el); });
})();
