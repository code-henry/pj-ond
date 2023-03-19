
import './styles.css';

function UnauthenticatedApp(props) {
    const permissionClear = () =>{
        props.setUserAgreed(true)
    }

    return (
        <>
            <h2>説明</h2>
            <li>今は会話データはブラウザごとにfirebaseに保存されます</li>
            <li>ダミーのAPIを使っていてテキストを打つと、謎のテキストが返されます</li>
            <li>右上の電話のアイコンを押しても今は何も起こりません</li>
            {/* <li>なぜかadblockの拡張機能をonにしてると、ChatGPT APIからうまく情報を得られない（pendingが返ってくる）</li> */}
            <li>PCだとデザインが大きく崩れてしまいそうです</li>
            <div>
                <button onClick={permissionClear} className="login">
                    チャットに入る
                </button>
            </div> 
        </>
    );
}

export { UnauthenticatedApp };
