
import './styles.css';

function UnauthenticatedApp(props) {
    const permissionClear = () =>{
        props.setUserAgreed(true)
    }

    return (
        <>
            <h2>Log in to join a chat room!</h2>
            <div>
                <button onClick={permissionClear} className="login">
                    村に入る
                </button>
            </div>
        </>
    );
}

export { UnauthenticatedApp };
