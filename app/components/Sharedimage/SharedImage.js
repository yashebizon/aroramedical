import PropTypes from 'prop-types';
import Image from 'next/image';

const ImageComponent = ({ src, className, alt }) => {

  return (
    <div className={` ${className} `} >
      <img
        src={src}
        alt={alt || "image"}
        layout="fill" // or layout="responsive" depending on your needs
        objectFit="contain" // Adjust as needed (cover, contain, etc.)
      />
     </div>
  );
};

ImageComponent.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  alt: PropTypes.string.isRequired,
};

ImageComponent.defaultProps = {
  className: '',
  height: 'auto',
  width: 'auto',
};

export default ImageComponent;
