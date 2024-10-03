import { Facebook, Twitter, Instagram } from 'react-bootstrap-icons';

const Socialmedia = () => {
  return (
  <>
            <a href="https://www.facebook.com/PanoramaAddis" target="_blank" rel="noopener noreferrer">
              <Facebook size={30} className="social-media-background" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter size={30} className="social-media-background"/>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram size={30} className="social-media-background"/>
            </a>
</>
  )
}
export default Socialmedia;