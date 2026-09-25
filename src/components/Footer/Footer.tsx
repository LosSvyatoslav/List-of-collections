import logoWhite from "../../logos and images/Yeahub_white.svg";
import figmaLogo from "../../logos and images/Figma-footer.svg";
import telegramLogo from "../../logos and images/Telegram_white.svg";
import youtubeLogo from "../../logos and images/youtube_white.svg";
import tikTokLogo from "../../logos and images/tiktok.svg";
import gitHubLogo from "../../logos and images/Github_white.svg";





import "./Footer.css";

function Footer () {
    return (
        <footer className="footer">
            <div className="container">
              <div className="footer__topside">
                <img src={logoWhite} alt="Yeahub logo"  className="footer__logo"/>
                <div className="footer__text">
                    <p className="footer__title">Выбери, каким будет IT завтра, вместе с нами</p>
                    <p className="footer__description">YeaHub — это полностью открытый проект, призванный объединить и улучшить IT-сферу. Наш исходный код доступен для просмотра на GitHub. Дизайн проекта также открыт для ознакомления в Figma.</p>
                </div>
            </div>
            <div className="footer__botside">
                <ul className="footer__info">
                    <li className="footer__copyright">© 2024 YeaHub</li>
                    <li><a href="#" className="footer__docs">Документы</a></li>
                </ul>
                <ul className="footer__links">
                    <li className="footer__links-text">Ищите нас и в других соцсетях @yeahub_it</li>
                    <li className="footer__link"><img src={figmaLogo} alt="Figma logo" /></li>
                    <li className="footer__link"><img src={telegramLogo} alt="Telegram logo" /></li>
                    <li className="footer__link"><img src={youtubeLogo} alt="Youtube logo" /></li>
                    <li className="footer__link"><img src={tikTokLogo} alt="Tiktok logo" /></li>
                    <li className="footer__link"><img src={gitHubLogo} alt="Github logo" /></li>
                </ul>
            </div>  
            </div>
            
        </footer>
    )
}

export default Footer