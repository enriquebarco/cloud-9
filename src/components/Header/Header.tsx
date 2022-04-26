import clouds from "../../assets/icons/clouds.png";
import "./Header.scss";

interface HeaderInterface {
  handleZipChange: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function Header( { handleZipChange }: HeaderInterface ) {


  return (
    <div className="header">
      <img className="header__logo" src={clouds} alt="clouds icon" />
      <h1 className="header__title">Cloud 9</h1>
      <p className="header__text">Enter a zip code to find the weather</p>
      <input
        className="header__input"
        placeholder="ZIP Code"
        onKeyDown={(e) => handleZipChange(e)}
      />
    </div>
  );
}
