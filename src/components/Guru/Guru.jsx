import styles from "./Guru.module.scss";
import ruslanPhoto from "../../logos and images/Ruslan photo.jpg";
import telegramLogo from "../../logos and images/Telegram purple.svg";
import youTubeLogo from "../../logos and images/Youtube purple.svg";
import profileLogo from "../../logos and images/Profile purple.svg";
import checked from "../../logos and images/checkedIcon.svg";
const linksLogos = [
  {
    logo: telegramLogo,
    alt: "telegram logo",
    href: "https://web.telegram.org/a/",
  },
  { logo: youTubeLogo, alt: "youtube logo", href: "https://www.youtube.com/" },
  { logo: profileLogo, alt: "profile logo", href: "#" },
];

const Guru = () => {
  return (
    <div className={styles.guru}>
      <div className={styles.info}>
        <div className={styles.wrapper}>
          <div className={styles.avatar}>
            <img src={ruslanPhoto} alt="photo of guru" />
          </div>
          <img src={checked} alt="checked" className={styles.checked}/>
        </div>
        <div className={styles.text}>
          <span className={styles.name}>Руслан Куянец</span>
          <span className={styles.role}>Python Guru</span>
        </div>
      </div>
      <span className={styles.description}>
        Guru – это эксперты YeaHub, которые помогают развивать комьюнити.
      </span>
      <ul className={styles.list}>
        {linksLogos.map(({ logo, alt, href }) => (
          <li key={alt}>
            <a href={href} target="_blank" rel="noopener noreferrer">
              <img src={logo} alt={alt} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Guru;
