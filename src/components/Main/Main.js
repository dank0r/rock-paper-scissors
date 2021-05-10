import style from './index.module.css';
import rock from '../../img/rock.png';

function Main() {
    return (
        <div className={style.wrapper}>
            <img src={rock} className={style.icon} alt={''}></img>
            <div className={style.label}>Проекта нет но вы держитесь.</div>
        </div>
    );
}

export default Main;