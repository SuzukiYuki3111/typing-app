// wrap,startの取得
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');

// 複数のテキストを格納する配列
const textLists = [
    'taisuke','issei','shigekix','ashitaka','ryo-spin','katsu1',
    'yosh is stoic','AT-4','hong10','junior','abere','wing zero',
    'neguin','pocket','menno','tsukki','physicx',
    'noodle','kaku','ryoma','victor','zeku',
    'sunni','nori','isopp','assassin'
];

// ランダムなテキストを画面に表示する
const createText = () => {
    // pタグを取得
    const p = document.getElementById('text');
    // textListからランダムに出力し、テキストごとに分割する
    const rnd = Math.floor(Math.random() * textLists.length);
    // p要素を空にする
    p.textContent = '';
    textLists[rnd].split('').map(value => {
        // span要素を作成
        const span = document.createElement('span');
        // span要素に一文字ずつ当てはめる
        span.textContent = value;
        // span要素をpに追加
        p.appendChild(span);
    });
};

const keyDown = e => {}; // キーイベント＆入力判定処理

const rankCheck = rank => {}; // ランク判定とメッセージ生成処理

const gameOver = id => {}; // ゲームの終了処理

const timer = () => {}; // タイマー処理

// startをクリックしたらcreateTextを実行する
start.addEventListener('click', () => {
    createText();
});