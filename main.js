// wrap,start,conceptの取得
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const accordion = document.getElementById('accordion');
const tutorial = document.getElementById('tutorial');

const loading = document.querySelector( '.loading' );

// ローディング処理
window.addEventListener( 'load', () => {
  loading.classList.add( 'hide' );
}, false );

// フェードイン表示、ボタンはCSSでアニメーションを遅延
wrap.animate([{opacity: '0'}, {opacity: '1'}], 1000);

// 複数のテキストを格納する配列
const textLists = [
    'taisuke','issei','shigekix','ashitaka','ryo-spin','katsu1',
    'yosh is stoic','AT-4','hong10','junior','abere','wing zero',
    'neguin','pocket','menno','tsukki','physicx',
    'noodle','kaku','ryoma','victor','zeku',
    'sunni','nori','isopp','assassin','wing',
    'pivet','machine','juju','jun','shosei',
    'gen roc','hiro10','mackey1',
];
// textListsを判別するようの配列
let checkTexts = [];

// ランダムなテキストを画面に表示する
const createText = () => {
    const p = document.getElementById('text');
    // textListからランダムに出力し、テキストごとに分割する
    const rnd = Math.floor(Math.random() * textLists.length);
    // p要素を空にする
    p.textContent = '';
    // 表示されたテキストをcheckTextsに格納する
    checkTexts = textLists[rnd].split('').map(value => {
        // span要素を作成し、span要素に一文字ずつ当てはめる
        const span = document.createElement('span');
        span.textContent = value;
        p.appendChild(span);
        // 一文字ずつcheckTextsに格納していく
        return span;
    });
};

let score = 0;

 // キーイベント＆入力判定処理
const keyDown = e => {
    wrap.style.backgroundColor = '#666';
    if(e.key === checkTexts[0].textContent) {
        // 0番目にadd-colorを付与する
        checkTexts[0].className = 'add-color';
        // shiftメソッドで常に先頭を0番目にする
        checkTexts.shift();
        score++;
        // chekcTextsがなかったら、ランダムにテキストを出す
        if(!checkTexts.length) createText();
    } else if(e.key === 'Shift') {
        // shiftを押したときは色は変わらない
        wrap.style.backgroundColor = '#666';
    } else {
        // keyが違うときは背景がredになる
        wrap.style.backgroundColor = 'red';
    }
};

// ランク判定とメッセージ生成処理
const rankCheck = score => {
    // 空のテキスト
    let text = '';
    // スコアごとにランクとテキストを変える
    if(score < 50) {
        text = `あなたのランクはDです。\nCランクまであと${50 - score}文字です。`;
    } else if(score < 100) {
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
// タイマーにフェードイン付与
count.animate([{opacity: '0'}, {opacity: '1'}], 1000);

// startをクリックしたらcreateTextを実行する
start.addEventListener('click', () => {
    timer();
    createText();
    // startを押すと非表示にする
    start.style.display = 'none';
    tutorial.style.display = 'none';
    accordion.style.display = 'none';
    // キーの判別をする
    document.addEventListener('keydown', keyDown);
});

// tutorialをクリックしたら遊び方の説明が表示される
    tutorial.addEventListener('click' , () => {
        if(accordion.style.display == 'block'){
            accordion.style.display = 'none'
        } else {
            accordion.style.display = 'block'
        };
    });

