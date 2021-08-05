import React, { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';

import { request } from 'graphql-request';

const api =
  'https://api-ap-northeast-1.graphcms.com/v2/ckrymcje31v6d01xt90f659kp/master';

const query = `
query Authors {
  authors {
    name
    picture {
      url(transformation: {image: {resize: {height: 300}}})
    }
    title
  }
}
`;

export default function App() {
  const [girls, setGirls] = useState([]);
  useEffect(() => {
    const fetchAuthors = async () => {
      const { authors } = await request(api, query);

      setGirls(authors);
    };
    fetchAuthors();
  }, []);
  return (
    <>
      <div className="container">
        {girls.map(item => (
          <Card item={item} key={item.name} />
        ))}
      </div>
    </>
  );
}

const Card = props => {
  return (
    <div className="window" style={{ margin: '0.5em' }}>
      <div className="title-bar">
        <div className="title-bar-text">{props.item.title}</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" />
        </div>
      </div>
      <div className="window-body">
        <img
          src={props.item.picture.url}
          alt={props.item.name}
          style={{ height: '300px' }}
        />
        <h5 style={{ margin: '8px 0 8px 0' }}>{props.item.name}</h5>
      </div>
    </div>
  );
};
