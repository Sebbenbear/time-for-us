import React, { Component } from 'react';
import { TimeZoneText } from './TimeZoneText';

export class BackgroundImage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: null,
      image: "",
      keyword: this.props.keyword
    };
  };

  componentDidUpdate() {
    if (this.state.keyword !== this.props.keyword) {
      this.setState({
        keyword: this.props.keyword
      });
      this.getImage();
    }
  }

  componentDidMount() {
    this.getImage();
  };

  /* Gets a random image from a page of images fetched from Unsplash.*/
  getImage() {
    const sendRequest = true;
    const query = this.props.keyword.replace(" ", "+");

    const key = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
    const url = `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${key}`;

    if (sendRequest) {
      fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Couldn't load the image.`);
        }
      })
      .then(data => {
        if (!data.total) {
          this.setState({
            image: 'media/unknownLocation.jpg',
            isLoading: false
          })
        } else {
          const numImages = data.results.length;
          const randomIndex = Math.floor(Math.random() * numImages);
          this.setState({
          image: data.results[randomIndex].urls.regular, //small, full, raw, thumb available
            isLoading: false
          });
        };
      });
    } else {
      this.setState({
        image: 'media/unknownLocation.jpg',
        isLoading: false
      });
    };
  };

  render() {
    let { image, isLoading, error } = this.state;

    if (isLoading || error) {
      image = 'media/unknownLocation.jpg';
    }

    const divStyle = {
      background: `linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.65) 100%), url(${image}) no-repeat`,
      backgroundPosition: 'center',
      color: 'white',
      height: '300px',
      backgroundSize: 'cover',
    };

    return (
      <div style={divStyle}>
        <TimeZoneText timeZone={this.props.timeZone} city={this.props.keyword} />
      </div>
    );
  };
}

export default BackgroundImage;
