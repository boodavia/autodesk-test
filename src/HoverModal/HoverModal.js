import React, { Component } from 'react';
import axios from 'axios';
import logo from '../css/loader.gif';

class Tooltip extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userInfo: {},
            opacity: 0,
            loading: true,
            displayTooltip: false,
            following: false
        }
        this.hideTooltip = this.hideTooltip.bind(this);
        this.showTooltip = this.showTooltip.bind(this);
        this.addFollower = this.addFollower.bind(this);
    }

    addFollower(userId){
        axios.post('https://www.instructables.com/json-api/setFollowing', {
            memberId: userId,
            following: !this.state.following
        })
        .then(response => { 
            console.log(response);
            //doesn't work due to CORS
            this.setState({
                following: !this.state.following,
                userInfo: {
                    ...this.state.userInfo,
                    followersCount: this.state.userInfo.followersCount+1,
                },
            });
        })
        .catch(error => { 
            console.log(error);
        });
    }

    hideTooltip () {
        setTimeout(() => {
            this.setState({displayTooltip: false});
        }, 250);
        this.setState({opacity: 0});
    }
    showTooltip () {
        setTimeout(() => {
            this.setState({opacity: 1});
        }, 250);
        this.setState({displayTooltip: 1});
        axios.get('https://cors.io/?https://www.instructables.com/json-api/showAuthorModel?screenName='+this.props.username).then(res => {
            const userInfo = res.data;
            let converted =  userInfo.signup.substr(0, userInfo.signup.indexOf('-'));
            let DOB = new Date(userInfo.signup.substr(0, userInfo.signup.indexOf(' ')));
            let elapsed = new Date( new Date().getTime() - DOB.getTime());
            let year = elapsed.getYear()-70;
            let month = elapsed.getMonth();
            let badge = null;
            if ((userInfo.views + (userInfo.instructablesCount * 100000 )) > 1000000){ badge = 'Active'}
            else if ((userInfo.views + (userInfo.featuredCount * 250000 )) > 5000000) { badge = 'Super'}
            else if (year < 1 && month <= 4) { badge = 'New'};
            userInfo.badge = badge;
            userInfo.signup = converted;
            this.setState({ userInfo, loading: false });
        });
    }  
    render() {
        const ListItem = (props) => {
            return (
                <li><i className={props.icon}></i> 
                    {props.children}
                </li>
            )
        }
        return (
            <span className='hover-popover' onMouseLeave={this.hideTooltip}>
                {this.state.displayTooltip &&
                    <div className={'hover-popover-bubble'}style={{opacity: this.state.opacity, transition: 'opacity 0.25s'}}>
                        <div className='hover-popover-message'>
                        {this.state.loading ? (
                            <div className='loader-img'><img src={logo} alt='' /></div>
                        ):(
                            <div>
                                <div className='top-info'>
                                    <div className='image-holder'><img src={this.state.userInfo.square3Url} alt={this.state.userInfo.screenName} /></div>
                                    <div className='user-info'>
                                        <div className='user-title'>
                                            <h3>{this.state.userInfo.screenName}</h3>
                                            {this.state.userInfo.badge ? <span className='label label-default'>{this.state.userInfo.badge}</span> : null}
                                        </div>
                                        <div className='follow-cta'>
                                            <button className='btn btn-lg btn-yellow follow-btn member-follow-btn' onClick={() => {this.addFollower(this.state.userInfo.id)}}>{this.state.following !== true ? 'Follow' : 'Following'}</button>
                                            <div className='callout'>{this.state.userInfo.followersCount}</div>
                                        </div>
                                    </div>
                                    
                                </div>
                                <ul >
                                    {this.state.userInfo.instructablesCount > 0 ? <ListItem icon='icon icon-instructable' children={<span> <span>{this.state.userInfo.instructablesCount}</span> Instructables</span>} /> : null}
                                    {this.state.userInfo.lessonCount > 0 ? <ListItem icon='icon icon-lessons' children={<span> <span>{this.state.userInfo.lessonCount}</span> Lessons</span>} /> : null}
                                    {this.state.userInfo.views > 0 ? <ListItem icon='icon icon-views' children={<span> <span>{this.state.userInfo.views}</span> Views</span>} /> : null}
                                    {this.state.userInfo.commentCount > 0 ? <ListItem icon='icon icon-comments' children={<span> <span>{this.state.userInfo.commentCount}</span> Comments</span>} /> : null}
                                    {this.state.userInfo.signup > 0 ? <ListItem icon='icon icon-followers' children={<span> Joined {this.state.userInfo.signup}</span>} /> : null}
                                </ul>
                            </div>
                        )}
                        </div>
                    </div>
                }
                <span className='hover-popover-trigger' onMouseOver={this.showTooltip}>
                    {this.props.children}
                </span>
            </span>
        )
    }
}

export default Tooltip;