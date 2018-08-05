import React, { Component } from 'react';
import './css/bootstrap.min.css';
import './css/desktop_theme.css';
import './css/explore.css';
import './css/popover.css';

import postsData from './StaticHtml/posts';
import StaticHtml from './StaticHtml/StaticHtml';

class App extends Component {
  render() {
    return (
      <div id="explore-wrapper" className="full-wrapper">
        <div id="explore-main" className="container">
          <div className="explore-content">
            <ul className="explore-covers-list clearfix">     
            {postsData.posts.map(function(post){  
              return <StaticHtml url={post.url} user={post.user} coverImage={post.coverImage} title={post.title} channel={post.channel} channelUrl={post.channelUrl} />
            })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default App;