// Style Imports
import './BackpackCard.css';

// Renders Backpack card with title, name and picture
const BackpackCard = ({ title, content, imageUrl }: {title: string, content: string, imageUrl: string}) => {
  return (
    <div className='card'>
      <h3 className='backpack-heading'>{title}</h3>
      <h5 className='backpack-subheading'>{content}</h5>
      <div className='centered-container'>
        <img
          src={imageUrl}
          alt={`${title} ${content}`}
          className='backpack-image'
        />
      </div>
      <div className='shop-now-btn'>
        <h5>SHOP NOW</h5>
      </div>
    </div>
  );
}

export default BackpackCard;
