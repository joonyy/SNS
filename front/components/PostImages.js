import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';

import ImagesZoom from './ImagesZoom';

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);
  const [src, setSrc] = useState(images.map((v) => v.src));
  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);
  const onError = (index) => () => {
    setSrc((prev) => {
      const ret = [...prev];
      ret[index] = ret[index].replace('thumb', 'original');
      return ret;
    });
  };

  if (images.length === 1) {
    return (
      <>
        <img role="presentation" src={`http://localhost:3065/${src[0]}`} alt={images[0].src} onClick={onZoom} onError={onError(0)} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <img role="presentation" style={{ width: '50%', display: 'inline-block' }} src={`http://localhost:3065/${src[0]}`} alt={images[0].src} onClick={onZoom} onError={onError(0)} />
        <img role="presentation" style={{ width: '50%', display: 'inline-block' }} src={`http://localhost:3065/${src[1]}`} alt={images[1].src} onClick={onZoom} onError={onError(1)} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <div>
        <img role="presentation" style={{ width: '50%', display: 'inline-block' }} src={`http://localhost:3065/${src[0]}`} alt={images[0].src} onClick={onZoom} onError={onError(0)} />
        <div
          role="presentation"
          style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1}
          개의 사진 더보기
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

PostImages.propTypes = {
  // eslint-disable-next-line react/require-default-props
  images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImages;
