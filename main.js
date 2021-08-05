// wrap,startの取得
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const concept = document.getElementById('concept');

// 複数のテキストを格納する配列
const textLists = [
    'taisuke','issei','shigekix','ashitaka','ryo-spin','katsu1',
    'yosh is stoic','AT-4','hong10','junior','abere','wing zero',
    'neguin','pocket','menno','tsukki','physicx',
    'noodle','kaku','ryoma','victor','zeku',
    'sunni','nori','isopp','assassin'
];
// textListsを判別するようの配列
let checkTexts = [];

// ランダムなテキストを画面に表示する
const createText = () => {
    // pタグを取得
    const p = document.getElementById('text');
    // textListからランダムに出力し、テキストごとに分割する
    const rnd = Math.floor(Math.random() * textLists.length);
    // p要素を空にする
    p.textContent = '';
    // 表示されたテキストをcheckTextsに格納する
    checkTexts = textLists[rnd].split('').map(value => {
        // span要素を作成
        const span = document.createElement('span');
        // span要素に一文字ずつ当てはめる
        span.textContent = value;
        // span要素をpに追加
        p.appendChild(span);
        // 一文字ずつcheckListsに格納していく
        return span;
    });
};

let score = 0;

 // キーイベント＆入力判定処理
const keyDown = e => {
    if(e.key === checkTexts[0].textContent) {
        // 0番目にadd-colorを付与する
        checkTexts[0].className = 'add-color';
        // shiftメソッドで常に先頭を0番目にする
        checkTexts.shift();
        score++;
        // chekcTextsがなかったら、ランダムにテキストを出す
        if(!checkTexts.length) createText();
    };
};

// ランク判定とメッセージ生成処理
const rankCheck = score => {
    // 空のテキスト
    let text = '';
    // スコアごとにランクとテキストを変える
    if(score < 100) {
        text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
    } else if(score < 200) {
        text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
    } else if(score < 300) {
        text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
    } else if(score >= 300) {
        text = `あなたのランクはSです。\nおめでとうございます！`;
    }
    // 文字数と次の動作を誘導
    return `${score}文字打てました！\n${text}\n【OK】リトライ／【キャンセル】終了`;
}; 

 // ゲームの終了処理
const gameOver = id => {
    clearInterval(id);
    const result = confirm(rankCheck(score));
    // trueだったらリロードする
    if(result) window.location.reload();
};

 // タイマー処理
const timer = () => {
    let time = 60;
    const count = document.getElementById('count');
    const id = setInterval(() => {
        // カウントが0になったらtimer idをgameOverに渡す
        if(time <= 0) gameOver(id);
        // countを一秒ずつ減らす
        count.textContent = time--;
    }, 1000);
};

// startをクリックしたらcreateTextを実行する
start.addEventListener('click', () => {
    timer();
    createText();
    // startを押すと非表示にする
    start.style.display = 'none';
    concept.style.display = 'none';
    // キーの判別をする
    document.addEventListener('keydown', keyDown);
});