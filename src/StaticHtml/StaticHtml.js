import React from 'react';
import Tooltip from '../HoverModal/HoverModal';

const staticHtml = (props) => {
    return (
        <li>
            <div className="explore-cover-item cover-item">
                <a className="cover-image" href={props.url}>
                    <img src={props.coverImage} alt={props.title} />
                </a>
                <div className="cover-info">
                    <span className="title"><a href={props.url}>{props.title}</a></span>
                    <br />
                    <span className="author"> by <Tooltip username={props.user}><a href={"https://www.instructables.com/member/" + props.user}>{props.user}</a></Tooltip></span>
                    <span className="channel"> in <a href={props.channelUrl}>{props.channel}</a></span>
                </div>
            </div>
        </li>
    )
}

export default staticHtml;
